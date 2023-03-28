(async function () {

    const timeLabel = '[main.js]';
    console.time(timeLabel);

    await Plugins.initialize();

    wf.ready('[data-tinymce], [data-inputmask]', function () {
        for (let k in this.dataset) {
            let plugin = Plugins[k];
            if (plugin && typeof plugin.ready === 'function') {
                plugin.ready(this, this.dataset[k]);
            }
        }
    });

    wf.ready('[data-char-counter]', function () {
        var charCounter = new wf.CharCounter(this, JSON.parse(this.dataset.charCounter || '{}'));
    });

    wf.ready('[data-inputtags]', function () {
        var inputtags = new wf.InputTags(this, JSON.parse(this.dataset.inputtags || '{}'));
    });

    let setInputCounter = (input, counter) => {
        let number = parseInt(input.value || '0');
        let min = parseInt(input.min);
        let max = parseInt(input.max);
       
        switch (counter) {
            case 'negative':
                if (isNaN(min) || min < number) {
                    number--;
                }

                break;
            case 'positive':
                if (isNaN(max) || max > number) {
                    number++;
                }

                break;

            default:
                if (!isNaN(min) && number < min) {
                    // number = min - number;
                } else if (!isNaN(max) && number > max) {
                    // max = 11 number = 15; number - max = 4; 4
                    // number = number.toString().substring(0, number.toString().length);
                    // console.log("max", max, number)
                }

        }

        let changed = input.value != number;
        input.value = number;

        if (changed) {
            input.dispatchEvent(new Event('change', {bubbles: true}));
        }
    };

    wf.Events.add('click', 'a.prevent[href]', function (evt) {
        if (this.hash || /\/\#$/.test(this.href)) {
            evt.preventDefault();
        }

        if (this.hash) {
            const target = document.querySelector(this.hash);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

    wf.Events.add('click', '.input-counter button', function () {
        setInputCounter(
            this.parentNode.querySelector('input'), 
            this.dataset.counter
        );
    });

    wf.Events.add('input', '.input-counter input', function () {
        setInputCounter(this, '');
    });

    
    wf.Events.add('click', '.wf-btn[data-action]', function (evt) {
        evt.preventDefault();

        wf.runAction(
            `${this.dataset.action}`
            , [this, evt]
        );
    });

    let timeoutId;
    wf.Events.add('input', '.check-resource', function (evt) {
        let query = this.value;
        let parent = document.querySelector(this.dataset.parent);
        if (!parent) return;

        parent = parent.value;

        let formField = new wf.FormField(this);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (!query) {
                formField.resetStatusAll();
                return;
            }
            wf.sendRequest('resource/check', { parent, query }, {
                url: 'assets/components/wf_shop/connector.php'
            }).then(response => {
                formField.setStatus(response.success ? 'valid' : 'invalid', response.message);
            });
        }, 500);

    });

    wf.Events.add('submit', '.ex-form', function (evt) {
        evt.preventDefault();
        let options = JSON.parse(this.dataset.options || '{}');
        wf.submitForm(this, options);
    });

    wf.Events.add('change', '[data-toggle="collapse"]', function (evt) {
        const method = this.tagName.toLowerCase();
        if (method in wf.CollapseToggle && typeof wf.CollapseToggle[method] === 'function') {
            wf.CollapseToggle[method](this);
        }
    });
    
    wf.Events.add('change input focusin', 'form.validate', function (evt) {
        const element = evt.target;
        const form = new wf.Form(this);
        const formField = new wf.FormField(element);
        const submitBtn = this.querySelectorAll('[type=submit]');
 
        if (evt.type !== 'focusin') {
            // if (!element.checkValidity()) {
            //     formField.setError(element.validationMessage);
            // }
            form.submitBtnDisabled(!form.checkValidity());
        } else {
            // formField.resetError();
        }

    });

    wf.Events.add('keypress', 'form.no-submit input', function (evt) {
        if (evt.keyCode === 13) {
            evt.preventDefault();
        }
    });

    let RnyGalleryModal = function (id, options = {}) {

        this.options = {
            images: [],
            shownClass: 'rny-gallery-modal-shown',
            class: 'rny-gallery-modal',
            thumbnailTpl: `<div class="col-2"><img class="mb-2" src="" alt="" /></div>`,
            template: `<div class="rny-gallery-modal">
                <button class="btn btn-close"></button>
                <div class="row">
                    <div class="col-12">
                        <img class="rny-gallery-preview" src="" />
                    </div>
                </div>
                <div class="row rny-gallery-thumbnails">
                </div>
            </div>`,
            ...options
        };

        this.init = () => {

            this.container = document.querySelector(`.${this.options.class}#${id}`);

            if (!this.container) {
                this.container = wf.DOM.createElement(this.options.template, { id });
                document.body.append(this.container);
            }

            let images = this.options.images;

            for (let image of images) {
                console.log('image', image)
                let imgEl = wf.DOM.createElement(this.options.thumbnailTpl);
                wf.DOM.setAttrs(imgEl.querySelector('img'), {
                    src: image.src, 
                    data: { original: image.original } 
                });
                this.container.querySelector('.rny-gallery-thumbnails').append(imgEl);
                if (image.active) {
                    this.container.querySelector('.rny-gallery-preview').src = image.original;
                }
            }

            this.container.querySelector('.btn-close')?.addEventListener('click', () => {
                this.hide();
            });

            return this;
        };

        this.show = () => {
            document.body.classList.add(this.options.shownClass);
        };

        this.hide = () => {
            document.body.classList.remove(this.options.shownClass);
        };

        this.isShown = () => {
            return document.body.classList.contains(this.options.shownClass);
        };

        return this.init();
    };

    let RgGallery = function (container, options = {}) {

        this.options = {
            imgClass: 'rny-gallery-img',
            previewClass: 'rny-gallery-preview',
            modalId: 'gallery-modal',
            images: [],
            circle: false,
            thumbnailTpl: `<div class="rny-gallery-thumbnail"><img src="" alt="" /></div>`,
            template: `<div class="rny-gallery">
                <div class="row">
            
                    <div class="col-2 pr-1">
                        <div class="rny-gallery-thumbnails" style="height: 400px; overflow: auto"></div>
                    </div>
            
                    <div class="col-10">
                        <div class="rny-gallery-preview">
                            <div class="rny-gallery-action rny-gallery-prev d-flex align-items-center" data-action="prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </div>
                            <div class="rny-gallery-action rny-gallery-next d-flex align-items-center" data-action="next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                                </svg>
                            </div>
                            <img class="rny-gallery-img" />
                        </div>
                    </div>
            
                </div>
            </div>`,
            ...options
        };

        this.container = null;
        this.gallery = null;
        this.thumbnailsContainer = null;
        this.previewContainer = null;

        this.thumbnails = [];
        this.images = [];
        this.startIdx = 0;
        this.currIdx = 0;

        this.init = () => {

            var that = this;

            this.container = wf.DOM.getElement(container);
            this.gallery = wf.DOM.createElement(this.options.template);
            this.container.append(this.gallery);

            this.thumbnailsContainer = this.gallery.querySelector('.rny-gallery-thumbnails');
            this.previewContainer = this.gallery.querySelector('.rny-gallery-preview');
        
            this.images = this.options.images;

            for (let i in this.images) {
                let data = this.images[i];
                let thumbnail = wf.DOM.createElement(this.options.thumbnailTpl, {
                    data: { idx: i }
                });
                let image = thumbnail.querySelector('img');
                wf.DOM.setAttrs(image, {
                    src: data.thumbnail,
                    orig: data.src
                });

                thumbnail.addEventListener('click', function () {
                    that.go(parseInt(this.dataset.idx));
                }, false);

                this.thumbnailsContainer.append(thumbnail);
                if (data.current) {
                    this.startIdx = parseInt(i);
                }
                this.thumbnails.push(thumbnail);
            }

            this.go(this.startIdx);

            this.gallery.querySelectorAll('.rny-gallery-action')
            .forEach(el => {

                el.addEventListener('click', function (event) {

                    let action = this.dataset.action;
                    
                    switch (action) {
    
                        case 'prev':
                            that.prev();
                            break;
    
                        case 'next':
                            that.next();
                            break;
    
                    }
    
                }, false);

            });



            return;
            this.modal = new RnyGalleryModal(this.options.modalId, {
                images: this.images,
                // class: this.options.modalClass,
                // shownClass: this.options.modalShownClass,
                // template: this.options.modalTemplate,
            });

            return this;
        };

        this.go = (idx) => {
            let im = this.images[idx];
            let thumbnail = this.thumbnails[idx];

            for (let th of this.thumbnails) {
                th.classList.remove('current');
            }
            thumbnail.classList.add('current');

            wf.DOM.setAttrs(this.previewContainer.querySelector('img'), {
                src: im.src
            });

            this.currIdx = idx;

            if (!this.options.circle) {
                const prevBtn = this.gallery.querySelector('.rny-gallery-action[data-action="prev"]');
                const nextBtn = this.gallery.querySelector('.rny-gallery-action[data-action="next"]');

                if (this.currIdx > 0) {
                    prevBtn.classList.remove('d-none');
                } else {
                    prevBtn.classList.add('d-none');
                }

                if (this.currIdx < this.images.length - 1) {
                    nextBtn.classList.remove('d-none');
                } else {
                    nextBtn.classList.add('d-none');
                }
            }

        };

        this.prev = () => {
            let prevIdx = this.currIdx - 1;
            if (prevIdx < 0) {
                if (this.options.circle) {
                    prevIdx = this.images.length - 1;
                } else {
                    return;
                }
            }
            this.go(prevIdx);
        };

        this.next = () => {
            let nextIdx = this.currIdx + 1;
            if (nextIdx > this.images.length - 1) {
                if (this.options.circle) {
                    nextIdx = 0;
                } else {
                    return;
                }
            }
            this.go(nextIdx);
        };

        this.addImageEvents = (img) => {
            img.addEventListener('click', (event) => {   
                if (!this.modal.isShown()) {
                    this.modal.show();
                }
            }, false);
        };

        return this.init();
    };

    wf.ready('#product-gallery', function () {
        let gallery = new RgGallery(this, JSON.parse(this.dataset.gallery || {}));
    });
    
    console.timeEnd(timeLabel);
}) ();