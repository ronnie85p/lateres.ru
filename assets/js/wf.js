var wf = {
    
    observer(context, callback, options={}) {
        const config = {
            childList: true,
            subtree: true,
            attributes: true,
            ...options
        };
        const observer = new MutationObserver(callback);
        return {
            observer,
            start() {
                observer.observe(context, config); 
                return this;
            },
            stop() {
                observer.disconnect();
                return this;
            }
        };
    },

    ready(selector, callback, context=document) {
        let options = {  
            childList: true, 
            subtree: true, 
            attributes: false 
        }

        , findNodes = function (parent) {
            parent.querySelectorAll(selector).forEach(elm => {
                if (!elm.has) {
                    console.log('ready', [elm])
                    elm.has = true;
                    callback && callback.apply(elm, []);
                }
            });
        }

        , observerCallback = (records) => {
            for (let record of records) {
                if (!record.addedNodes.length) break;
                findNodes(record.target.parentNode || context);
            }
        };

        return this.observer(context, observerCallback, options).start();
    },

    setPlaceholders(text, pls=[]) {
        if (typeof text === 'string') {
            for (let key in pls) {
                text = text.replace(new RegExp('(\\{\\$'+ key +'\\}|\\$\\{'+ key +'\\})', 'g'), pls[key]);
            }
        }
        return text;
    },

    Events: {
    
        add(event, selector, callback, context=document) {
            let handlers = {};
          
            if (typeof event === 'string') {
                let events = event.split(' ');
                for (let ev of events) {
                    handlers[ev] = callback;
                }
            }

            if (typeof event === 'object') {
                handlers = event;
                context = callback || context;
                callback = null;
            }
    
            for (let ev in handlers) {
                if (typeof selector === 'string') {
                    context.addEventListener(ev, (e) => {
                        context.querySelectorAll(selector).forEach(el => {
                            if (e.path.includes(el)) {
                                if (typeof handlers[ev] === 'function') {
                                    handlers[ev].apply(el, [e]);
                                }
                            }
                        });
                    }, false);
                } else if (selector instanceof HTMLElement) {
                    selector.addEventListener(ev, handlers[ev], false);
                } 
            }
        },

        remove(event, selector, handler) {
            let events = event.split(' ');
            for (let ev of events) {    
                let elements;
                if (typeof selector === 'string') {
                    elements = document.querySelectorAll(selector);
                } else if (selector instanceof HTMLElement) {
                    elements = [selector];
                }

                elements.forEach(el => {
                    el.removeEventListener(ev, handler);
                });
            }
        },
        
        trigger(event, element, details={}, bubbles=true) {
            element.dispatchEvent(new Event(event, { bubbles, details }));
        }
        
    },
    
    DOM: {
    
        getElement(selector, parent=document) {
            return selector instanceof HTMLElement 
                ? selector 
                : parent?.querySelector(selector)
            ;
        },

        createElement(html, attrs = {}) {
            return this.createElements(html, attrs)[0];
        },
        
        createElements(html, attrs = {}) {
            if (html) {
                const template = document.createElement('template');
                template.insertAdjacentHTML('afterbegin', html.trim());
       
                const nodes = template.childNodes;
                for (const node of nodes) {
                    if (node) {
                        this.setAttrs(node, attrs);
                    }
                }

                return nodes;
            }

            return [];
        },

        setAttrs(element, attrs = {}) {
            if (typeof attrs === 'object') {
                FOR:
                for (let key in attrs) {
                    let value = attrs[key];
                    switch (key) {
                        case 'text': 
                            key = 'innerText';
                            break;
                        case 'html':
                            key = 'innerHTML';
                            break;
                        case 'data':
                            if (!element.dataset) {
                                element.dataset = {}
                            }
                            for (let _key in value) {
                                element['dataset'][_key] = value[_key];
                            }
                            continue FOR;
                    }
                    if (typeof value === 'object') {  
                        this.setAttrs(element[key], value);
                    } else {
                        if (!['innerHTML', 'innerText'].includes(key)) {
                            element.setAttribute(key, value);
                        } else {
                            element[key] = value;
                        }
                    }
                }
            }
        },

        setDisabled(element, disabled = 1) {
            if (disabled) {
                element?.classList.add('custom-disabled');
            } else {
                element?.classList.remove('custom-disabled');
            }
        },
        
        getHTML(selector, parent=document) {
            return this.getElement(selector, parent)?.innerHTML||'';
        },
        
        setHTML(selector, html, parent=document) {
            const element = this.getElement(selector, parent); 
            if (element) {
                element.innerHTML = html;
            }
        },
        
        addClasses(selector, classes) {
            const element = this.getElement(selector);
            if (element) {
                element.classList.add.apply(element.classList, classes);
            }
        }
        
    },

    CollapseToggle: {

        input(elem) {

            let target = document.querySelector(elem.dataset.target);
            if (!target) return;

            switch (elem.type) {

                case 'checkbox':

                    let checked = elem.checked;

                    if (elem.dataset.reverse) {
                        checked = !checked;
                    }

                    target.classList[checked ? 'add' : 'remove']('show');

                    break;

            }

        },

        select(elem) {

            let groups = document.querySelectorAll(elem.dataset.toggleGroup);
            groups.forEach(g => {
                g.classList.remove('show');
            });

            let option = elem.options[elem.selectedIndex];
            if (option) {
                
                let target = document.querySelector(option.dataset.target);
                if (target) {
                    target.classList.add('show');
                }

            }

        }

    },

    Navigate: {

        pushHistoryState(options = {}) {
            const defaultOptions = {
                url: document.location.href
                , origin: document.location.origin
                , title: ''
                , params: {}
                , state: {}
                , ...options
            };

            const url = new URL(defaultOptions.url, defaultOptions.origin);
            for (let key in defaultOptions.params) {
                url.searchParams.set(key, defaultOptions.params[key]);
            }
            console.log('pushHistoryState', defaultOptions);
            window.history.pushState(defaultOptions.state, null, url);
        }

    },

    Request: {

        handlers: {
            success(response) { },
            failure(response) { },
            always(response) { }
        },

        event(evtName, handler){
            this.handlers[evtName] = handler;
        },

        events(handlers) {
            for (let evtName in handlers) {
                this.event(evtName, handlers[evtName]);
            }
        },

    },
    
    FormField: function (el, options = {}) {
       
        this.options = {
           ...options
        };
        
        this.element = el;
       
        this.setStatus = (status, msg="") => {
            this.element.classList.add(`is-${status}`);
            let feedback = document.querySelector(this.element.dataset[status.toLowerCase()]);
            if (feedback) {
                feedback.innerText = msg;
                feedback.classList.add('show');
            }
            this.element.dispatchEvent(new CustomEvent(status, {bubbles: true}));
            this.resetStatus(status == 'invalid' ? 'valid' : 'invalid');
        };
        
        this.resetStatus = (status) => {
            this.element.classList.remove(`is-${status}`);
            let feedback = document.querySelector(this.element.dataset[status.toLowerCase()]);
            if (feedback) {
                feedback.classList.remove('show');
            }
        };

        this.resetStatusAll = () => {
            for (let status of ['valid', 'invalid']) {
                this.resetStatus(status);
            }
        };
        
        this.setError = (msg="") => {
            this.setStatus('invalid', msg);
        };
        
        this.resetError = () => {
            this.resetStatus('invalid');
        };
        
        this.setSuccess = (msg="") => {
            this.setStatus('valid', msg);
        };
        
        this.resetSuccess = () => {
            this.resetStatus('valid');
        };
        
        return this;
    },
    
    Form: function (form, options={}) {
        
        var that = this;
        
        this.options = {
            action: form.action?.value,
            method: form.getAttribute('method') || 'post',
            url: form.getAttribute('action') || '',
            messageTo: '',
            messageSuccessClass: 'alert-success',
            messageFailureClass: 'alert-danger',
            messageSuccessIcon: 'icon-check-circle',
            messageFailureIcon: 'icon-alert-triangle',
            ...options
        };
        
        this.form = form;
        this.formData = new FormData(form);
        this.messageTo = this.options.messageTo 
            ? document.querySelector(this.options.messageTo)
            : null;
        
        if (!this.form.errors) {
            this.form.errors = {};
        }

        if (options.data) {
            for (let k in options.data) {
                this.formData.append(k, options.data[k]);
            }
        }
        
        this.submitBtnDisabled = (disabled=true) => {
            this.form.querySelectorAll('[type=submit]').forEach(btn => {
                if (disabled) {
                    btn.classList.add('custom-disabled');
                } else {
                    btn.classList.remove('custom-disabled');
                }
            });
        };
        
        this.hideResponseMessage = () => {
            if (this.messageTo) {
                this.messageTo.classList.remove('show');
                this.messageTo.innerHTML = '';
            }
        };
        
        this.setResponseMessage = ({ success, message }) => {
            if (this.messageTo && message) {
                var responseType = success ? 'Success' : 'Failure'
                    , messageClass = this.options[`message${responseType}Class`]
                    , messageIcon = this.options[`message${responseType}Icon`]
                ;
            
                this.messageTo.classList.remove(this.options.messageSuccessClass, this.options.messageFailureClass);
                this.messageTo.classList.add(messageClass, 'show');
                
                if (messageIcon) {
                    message = `<i class="${messageIcon} message-icon"></i>&nbsp;<span class="message">${message}</span>`;
                }
            
                this.messageTo.innerHTML = message;
            }
        };
        
        this.setResponseError = ({ id, msg }) => {
            if (this.form.elements[id]) {
                let element = new wf.FormField(this.form.elements[id]);
                let resetError = () => {
                    element.resetError(); 
                };

                wf.Events.remove('input change', element.element, resetError);
                wf.Events.add('input change', element.element, resetError);

                if (!this.form.errors.length) {
                    wf.Events.trigger('focus', element.element);
                }

                this.form.errors[id] = msg;
                element.setError(msg);
            }
        };
        
        this.setResponseErrors = (errors) => {
            for (let error of errors) {
                this.setResponseError(error);
            }
        };
        
        this.resetErrors = () => {
            for (let name in this.form.errors) {
                if (this.form.elements[name]) {
                    var element = new wf.FormField(this.form.elements[name]);
                    element.resetError();
                }
            }
        };
        
        this.getFormData = (data) => {
            return this.formData;
        };
        
        this.checkValidity = () => {
            if (!this.form.checkValidity()) {
                return false;
            }
            
            return true;
        };
        
        this.prepareSend = () => {
            this.hideResponseMessage();
            this.resetErrors();
            if (!this.checkValidity()) {
                return false;
            }
            return true;
        };
        
        this.submit = () => {
            
            if (!this.prepareSend()) {
                return false;
            }

            const promise = wf.sendRequest(
                this.options.action, 
                this.formData, 
                this.options
            )
            .then(response => {
                if (response instanceof Object) {
                    if (!response.success) {
                        if (response.errors && response.errors.length > 0) {
                            that.setResponseErrors(response.errors);
                        }
                    }
                    that.setResponseMessage(response);
                }
                return response;
            });
            
            return promise;
        };
        
    },

    CharCounter: function (el, options = {}) {

        var that = this;

        this.options = {
            maxLength: 0,
            position: 'right',
            offsetTop: 5,
            remain: true,
            format: '${count} симв.',
            template: `<div style="
                font-size: .85em;
                color: #9d9d9d;
            "></div>`,
            ...options
        };

        this.element = el;
        this.parent = this.element.parentNode;
        this.maxLength = this.options.maxLength || this.element.maxLength;

        this.init = () => {

            if (!this.checkResolve()) {
                return this;
            }

            // let offsetLeft = this.element.offsetLeft;+ this.element.offsetWidth;
            
            let offsetTop = ((this.element.offsetTop - this.parent.offsetTop) + this.element.offsetHeight) + this.options.offsetTop; 
            // let offsetTop = this.element.offsetTop + this.element.offsetHeight;
 
            this.counterElement = wf.DOM.createElement(this.options.template);
            this.counterElement.style.position = 'absolute';
            this.counterElement.style.top = `${offsetTop}px`;


            this.setCount();
            
            // this.counterElement.style.left = `${offsetLeft}px`;

            this.parent.style.position = 'relative';
            this.element.after(this.counterElement);

            wf.Events.add('input', this.element, function () {
                that.setCount();
            });

            return this;
        };

        this.checkResolve = () => {
            const style = window.getComputedStyle(this.element);
            return this.maxLength > 0 && style.display != 'none' && style.visibility != 'hidden';
        };

        this.setCount = () => {

            let count = 0;
            if (this.options.remain) {
                count = this.maxLength - this.element.value.length;
            } else {
                count = this.element.value.length;
            }

            this.counterElement.innerHTML = wf.setPlaceholders(this.options.format, {
                count,
                maxLength: this.maxLength 
            });

            this.setPosition();

        };

        this.setPosition = () => {
            switch (this.options.position) {

                case 'right':

                    let style = window.getComputedStyle(this.counterElement);
                    let offsetLeft = ((this.element.offsetLeft - this.parent.offsetLeft) + this.element.offsetWidth) - 100;
                    // this.counterElement.style.left = `${offsetLeft}px`;
                    this.counterElement.style.right = 0;

                    break;

                case 'left':

                    this.counterElement.style.left = 0;

                    break;

            }
        };

        return this.init();
    },

    InputTags: function (el, options = {}) {

        var that = this;

        this.options = {
            maxCount: 0,
            maxCharsCount: 0,
            // maxWordsCount: 2,
            tplTag: `<span class="input-tag d-flex align-items-center" style="">
                <span class="input-tag-text"></span>
                <span class="icon-x ml-2 input-tag-remove"></span>
            </span>`,
            tplInput: `<input style="" />`,
            template: `<div class="input-tags form-control" style=""></div>`,
            ...options
        };

        this.element = el;
        this.maxCount = parseInt(this.options.maxCount || this.element.dataset.maxcount || '0');
        this.maxCharsCount = parseInt(this.options.maxCharsCount || this.element.getAttribute('maxlength') || '0');
        this.tags = [];

        this.init = () => {

            this.inputElement = wf.DOM.createElement(this.options.tplInput);
            this.containerElement = wf.DOM.createElement(this.options.template);

            if (this.maxCharsCount > 0) {
                this.inputElement.maxLength = this.maxCharsCount;
            }

            this.containerElement.append(this.inputElement);

            let value = this.element.value;
            let tags = [];

            if (value) {
                tags = value.split(',').map(el => el.trim());
            }
            
            for (let tag of tags) {
                this.appendTag(tag);
            }

            this.element.type = 'hidden';
            this.element.after(this.containerElement);

            wf.Events.add('invalid', this.element, function (evt) {
                that.containerElement.classList.add('is-invalid');
            });

            wf.Events.add('change', this.element, function () {
                that.containerElement.classList.remove('is-invalid');
            });

            wf.Events.add('focusin', this.inputElement, function (evt) {
                that.containerElement.classList.add('has-focus');
            });

            wf.Events.add('focusout', this.inputElement, function (evt) {
                that.containerElement.classList.remove('has-focus');
            });

            wf.Events.add('input', this.inputElement, function (evt) {

                // if (that.options.maxWordsCount > 0) {
                //     let words = value.split(' ');
                //     if (words.length >= that.options.maxWordsCount) {
                //         this.value = words.slice(0, that.options.maxCharsCount).join(' ');
                //         return;
                //     }
                // }

            }, false);

            wf.Events.add('keydown', this.inputElement, function(evt) {
                let enterCode = evt.keyCode == 13;
                let delimCode = evt.keyCode == 188;
                
                if (enterCode) {
                    evt.preventDefault();
                }

                setTimeout(() => {
                    let value = this.value.replace(/\s{2,}/, ' ').trim();
  
                    if (enterCode || delimCode) {
                        let txt = value.replace(',', '');

                        if (that.checkMaxCount()) {
                            that.appendTag(txt);
                            this.value = '';
                        }

                        that.toggleInputElement();
                    }
                }, 0);

            }, false);

            return this;
        };

        this.hasTag = (txt) => {
            return this.tags.some(tag => tag == txt.trim());
        };

        this.checkMaxCount = () => {
            return this.maxCount > 0 && this.tags.length < this.maxCount;
        };

        this.toggleInputElement = () => {
            this.inputElement.type = this.checkMaxCount()
                ? 'text' 
                : 'hidden'
            ;
        };

        this.removeTag = (elem) => {
            const idx = elem.dataset.idx;
            elem.remove();
            this.tags.splice(idx, 1);
            this.updateValue();
            this.toggleInputElement();
        };

        this.appendTag = (txt) => {
            if (!txt) return false;
            if (this.hasTag(txt)) {
                let idx = this.tags.findIndex(tag => tag == txt);
                if (idx != -1) {
                    let tagElement = this.containerElement.querySelector(`.input-tag[data-idx="${idx}"]`);
                    if (tagElement) {
                        tagElement.classList.add('focus');
                        setTimeout(() => {
                            tagElement.classList.remove('focus');
                        }, 500);
                    }
                }
                return false;
            }

            if (!txt || this.hasTag(txt)) return false;

            let tagElement = wf.DOM.createElement(this.options.tplTag);
            tagElement.dataset.idx = this.tags.length;
            tagElement.querySelector('.input-tag-text').innerText = txt;

            wf.Events.add('click', tagElement.querySelector('.input-tag-remove'), function () {
                that.removeTag(tagElement);
                wf.Events.trigger('focusin', that.inputElement);
            }, false);
     
            this.inputElement.before(tagElement);
            this.tags.push(txt);

            this.updateValue();

            return true;
        };

        this.updateValue = () => {
            this.element.value = this.tags.join(',');
            wf.Events.trigger('change', this.element);
        };

        return this.init();
    },

    Modal: function (options = {}) {
        
        this.options = {
              id: ''
            
            , attributes: {
                'tabindex': -1,
                'aria-labelledby': '',
                'aria-modal': true,
                'role': 'dialog'
            }

            , buttons: [
                {
                    text: 'Close',
                    class: 'btn btn-secondary',
                    dismiss: true,
                    attrs: {
                        ariaLabel: 'Close'
                    }
                }
            ]
              
            , title: ''
            , header: `
                <h4 class="modal-title"></h4>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" title="Close"></button>
            `
            , body: ''
            , footer: ''
            , content: `
                <div class="modal-header"></div>
                <div class="modal-body" style="min-height: 150px"></div>
                <div class="modal-footer"></div>
            `

            , template: `
                <div class="modal">
                    <div class="modal-dialog">
                        <div class="modal-content"></div>
                    </div>
                </div>
            `
            
            , ...options
        };

        this.elements = [];

        this.init = () => {

            this.getElement();

            if (this.setContent(this.options.content)) {
                if (this.setHeader(this.options.header)) {
                    this.setTitle(this.options.title);
                }

                this.setBody(this.options.body);
                this.setFooter(this.options.footer);
                this.addButtons(this.options.buttons);
            }

            this.modal = new bootstrap.Modal(this.element, this.options);

            return this;
        };

        this.getElement = () => {
            if (this.options.id) {
                this.element = document.getElementById(this.options.id);
            } else {

                var attributes = this.options.attributes;
      
                if (!attributes['id']) {
                    attributes['id'] = 'modal';
                }

                this.element = wf.DOM.createElement(this.options.template, attributes);
                document.body.append(this.element);
            }

            return this.element;
        };

        this.handleRequest = async (request, target) => {
            let response;

            if (request instanceof Promise) {
                response = await request;
            } else {
                let options = {
                    preloader: { context: this.get(request.context) }
                    , ...request.options
                };

                response = await wf.sendRequest(
                    request.action
                    , request.data
                    , options
                );
            }

            let output = '';
            if (response.success) {
                if (response.object) {
                    if (response.object.html) {
                        output = response.object.html;
                    }
                } else {
                    output = response;
                }

                this.setHTML(target, output);
            }
        };

        this.addButtons = (buttons) => {
            for (let btn of buttons) {
                let attrs = {
                    type: 'button',
                    html: btn.html,
                    class: btn.class,
                    data: { bsDismiss: btn.dismiss ? 'modal' : '' },
                    ...btn.attrs || {}
                };

                let elem = document.createElement('button'); wf.DOM.createElement(`<button></button>`, attrs);
                wf.DOM.setAttrs(elem, attrs);

                if (btn.onClick) {
                    wf.Events.add('click', elem, btn.onClick);
                }

                this.get('footer').append(elem);
            }
        };

        this.setHTML = (_class, html) => {
            if (this.get(_class)) {
                if (html === false) {
                    this.get(_class).classList.add('d-none');
                    return false;
                }

                if (html != '') {
                    this.get(_class).innerHTML = html;
                }
            }

            return true;
        };

        this.setContent = (html) => {
            return this.setHTML('content', html);
        };

        this.setHeader = (html) => {
            return this.setHTML('header', html);
        };

        this.setTitle = (html) => {
            return this.setHTML('title', html);
        };

        this.setBody = (html) => {
            return this.setHTML('body', html);
        };

        this.setFooter = (html) => {
            return this.setHTML('footer', html);
        };

        this.get = (_class) => {
            if (!this.elements[_class]) {
                this.elements[_class]  = this.element.querySelector(`.modal-${_class}`);
            }
            return this.elements[_class];
        };

        this.show = () => {
            this.modal.show();

            if (this.options.request) {
                this.handleRequest(this.options.request, this.options.request.context);
            }
        };

        this.hide = () => {
            this.modal.hide();
        };

        return this.init();
    },
    
    Preloader: function (context, options={}) {
        
        this.options = {
            mode: 'full',
            spinner: true,
            spinnerSize: 'md',
            position: 'absolute',
            spinnerTemplate: `<div class="spinner-border text-primary m-auto preloader-spinner" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`,
            dialogTemplate: `<div class="preloader-dialog">
                <div class="preloader-content"></div>
            </div>`,
            template: `<div class="preloader"></div>`,
            ...options
        };
        
        this.context = context;
        
        this.init = () => {

            this.destroyAll();

            this.preloader = wf.DOM.createElement(this.options.template);
            wf.DOM.setHTML(this.preloader, this.options.dialogTemplate);
                
            if (this.context.tagName === 'BODY') {
                this.options.position = 'fixed';
            }
          
            this.preloader.classList.add(`position-${this.options.position}`);
            
            if (this.options.spinner === true) {
            
                wf.DOM.setHTML(this.preloader.querySelector('.preloader-dialog'), this.options.spinnerTemplate);
            
                if (this.options.spinnerSize) {
                    const spinner = this.preloader.querySelector('.spinner-border');
                    if (spinner) {
                        switch (typeof this.options.spinnerSize) {
                            case 'string':
                                spinner.classList.add(`spinner-border-${this.options.spinnerSize}`);
                            break;
                            case 'number':
                                spinner.style.width = this.options.spinnerSize + 'px';
                                spinner.style.height = this.options.spinnerSize + 'px';  
                            break;
                        }
                    }
                  
                }
            
            }
                    
            this.context.append(this.preloader);
            
            return this;
        };
        
        this.getContext = (callback) => {
            if (this.context instanceof NodeList) {
                this.context.forEach(callback)
            } else {
                callback(this.context);
            }
        }
        
        this.destroyAll = () => {
            this.context.querySelectorAll('.preloader').forEach(elem => {
                elem.remove();
            });
        };
        
        this.show = () => {
            this.context.classList.add('preloader-shown');
            this.preloader.classList.add('show');
        };
        
        this.hide = () => {
            this.context.classList.remove('preloader-shown');
            this.preloader.classList.remove('show');
        };
        
        return this.init();
    },
    
    BtnLoading: function(context, options) {
        
        this.options = {
            size: 'sm',
            thick: '',
            design: '',
            spinner: 'border',
            position: 'center',
            text: '',
            widthFixed: false,
            lockContext: null,
            template: `
                <div class="btn-loading-content">
                    <span class="btn-loading-text"></span>
                    <span class="btn-loading-spinner" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </span>
                </div>
            `,
          ...options
        };
        
        this.context = context;
        this.lockContext = this.options.lockContext;
        this.spinnerClass = `spinner-${this.options.spinner}`;
        this.originalContent = this.context.innerHTML;
        
        this.init = () => {
            
            this.preloader = wf.DOM.createElement(this.options.template);

            var preloaderText = this.preloader.querySelector('.btn-loading-text');
            var preloaderSpinner = this.preloader.querySelector('.btn-loading-spinner'); 
        
            preloaderSpinner.classList.add(this.spinnerClass);
      
            if (this.options.size) {
                switch (typeof this.options.size) {
                    case 'string':
                        preloaderSpinner.classList.add(`${this.spinnerClass}-${this.options.size}`);
                    break;
                    case 'number':
                        preloaderSpinner.style.width = this.options.size + 'px';
                        preloaderSpinner.style.height = this.options.size + 'px';  
                    break;
                }
            }
      
            if (this.options.thick) {
                preloaderSpinner.style.borderWidth = this.options.thick + 'px';  
            }
      
            if (this.options.design) {
                preloaderSpinner.classList.add(`text-${this.options.design}`);
            }
            
            if (this.options.text) {
                preloaderText.innerText = this.options.text;
            }
    
            if (this.options.position) {
                this.context.classList.add(`justify-content-${this.options.position}`);
            }
    
            this.context.innerHTML = this.preloader.outerHTML;
            
            return this;
        };
        
        this.show = () => {
            if (this.lockContext) {
                this.lockContext.classList.add('btn-loading-locked');
            }
            this.context.classList.add('btn-loading', 'active');
            this.context.blur();
        };
        
        this.hide = () => {
            if (this.lockContext) {
                this.lockContext.classList.remove('btn-loading-locked');
            }
            this.context.classList.remove('btn-loading', 'active');
            wf.DOM.setHTML(this.context, this.originalContent);
        };
        
        return this.init();
    },

    runAction(action, args) {
        if (!action) return false;

        let paths = action.split('/')
            , lastIdx = paths.length-1
            , obj = this
            , func
        ;

        for (let i in paths) {
            let path = paths[i];
            if (i < lastIdx) {
                let oPath = path.charAt(0).toUpperCase() + path.substr(1, path.length);
                if (typeof obj[oPath] === 'object') {
                    obj = obj[oPath];
                } else {
                    break;
                }
            } else {
                if (typeof obj[path] === 'function') {
                    func = obj[path];
                }
            }
        }

        if (func) {
            return func.apply(obj, args);
        }

        return false;
    },
  
    sendRequest: function (action, data = {}, options = {}) {
    
        var defaultOptions = {
            method: 'post',
            responseType: 'json',
            preloader: false,
            mode: 'no-cors',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            ...options
        };
        
        var preloader = {
            
            instances: [],
            
            options: {
                // contexts: [document.body],
                instance: 'Preloader',
                ...(typeof defaultOptions.preloader === 'object' 
                    ? defaultOptions.preloader 
                    : {  }
                )
            },
            
            show() {
                for (let inst of this.instances) {
                    inst.show();
                }
            },
            
            hide() {
                for (let inst of this.instances) {
                    inst.hide();
                }
            }
            
        };
        
        if (!(data instanceof FormData)) {
            var fdata = new FormData;
            for (let key in data) {
                let value = data[key];
                if (typeof value == 'object' && !(value instanceof Blob)) {
                    value = JSON.stringify(value);
                }
                fdata.append(key, value);
            }
            data = fdata;
        }
        
        data.set('action', action);
        if (defaultOptions.hash) {
            data.set('hash', defaultOptions.hash);
        }
    
        if (defaultOptions.preloader !== false) {
            let contexts = Array.from(preloader.options.contexts || []);
  
            if (preloader.options.context) {
                contexts.push(preloader.options.context);
            }
            
            if (contexts.length > 0) {
                for (let context of contexts) {
                    let instance = new wf[preloader.options.instance](context, preloader.options);
                    preloader.instances.push(instance);
                }
            }
        }
        
        preloader.show();

        return axios({...defaultOptions, data})
          .then(response => {
            preloader.hide();

            if (response) {
                if (typeof response.data === 'object') {
                    let { object } = response.data;
                    if (object) {
                        let url = object.redirect_url || object.url; 
                        if (url) {
                            window.location.href = url;
                        }
                    }
                }
            }

            wf.Request.handlers[response.statusText == 'OK' ? 'success' : 'failure'](response);
            wf.Request.handlers.always(response);
            return response.data;
          })
          .catch(e => {
            preloader.hide();
        });   
    },

    submitForm(form, options = {}) {
        const Form = new this.Form(form, options);
        return Form.submit();
    },

    async loadHTML(action, target, options = {}) {
        const nodes = document.querySelectorAll(target);
        if (!nodes.length) return;
        
        if (options.targetClear === true) {
            nodes.forEach(node => node.innerHTML == '');
        }

        const params = options.params || {};
        const response = await this.sendRequest(action, params, {
            preloader: { contexts: nodes }
            , ...options
        });

        let html = response;
        if (typeof response === 'object') {
            if ('success' in response && response.success === true) {
                html = response.object.html;
            } else if (typeof response.message === 'string') {
                html = response.message;
            }
        } else if (typeof response === 'string') {
            html = response;
        }

        nodes.forEach(node => node.innerHTML = html);
    }
};