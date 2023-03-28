const Plugins = {

  plugins: {
    bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
    inputMask: 'assets/vendor/inputmask-5.x/dist/inputmask.min.js',
    tinymce: 'assets/vendor/tinymce_6.2.0/tinymce.min.js'
  },

  config: {

    inputmask: {

      number: { 
        alias: 'numeric',
        inputmode: 'number',
        digits: 0,
        greedy: false,
        numericInput: true, 
        showMaskOnHover: true,
        showMaskOnFocus: true,
      },

      integer: { },
      percentage: { },

      decimal: {
        alias: 'numeric',
        digits: 2, 
        radixPoint: ',', 
        placeholder: '0,00',
        greedy: false,
        numericInput: true, 
        showMaskOnHover: true,
        showMaskOnFocus: true,
      },

      weight: { 
        alias: 'numeric',
        digits: 3, 
        radixPoint: ',', 
        placeholder: '0,000',
        greedy: false,
        numericInput: true, 
        showMaskOnHover: true,
        showMaskOnFocus: true,
      },

      currency: {
        digits: 2, 
        max: 10000000000, 
        radixPoint: '.', 
        groupSeparator: ',', 
        placeholder: '0.00',
        greedy: false,
        autoGroup: true, 
        numericInput: true, 
        showMaskOnHover: true,
        showMaskOnFocus: true,
      },

      phone: {
        mask: '+1 (999) 999 9999',
        placeholder: '+1 (___) ___ ____',
        greedy: false,
        onBeforePaste(value, opts) {
                    
          var newValue = value.replace(/(\+\d|\(|\)|\_|\-|\:|\_|\s)+/g, '');
          var length = newValue.length;
                      
          if (length < 13) {
                        
            var nums = [];
                        
            switch (length) {
              case 12:
                nums = [[newValue[0], newValue[1], newValue[2], newValue[3], newValue[4]], [newValue[5], newValue[6], newValue[7]], [newValue[8], newValue[9], newValue[10], newValue[11]]];
                break;
              case 11:
                nums = [[newValue[0], newValue[1], newValue[2], newValue[3]], [newValue[4], newValue[5], newValue[6]], [newValue[7], newValue[8], newValue[9], newValue[10]]];
                break;
              default:
                nums = [[newValue[0], newValue[1], newValue[2]], [newValue[3], newValue[4], newValue[5]], [newValue[6], newValue[7], newValue[8], newValue[9]]];
            }
              
            this.$el.val(nums.join(' '));
                        
          }
        }

      }

    },

    tinymce: {
      // height: 300
      language: 'ru'
      , suffix: '.min'
      , base_url: `${document.location.origin}/assets/vendor/tinymce_6.2.0`
      , document_base_url: document.location.origin
      , relative_urls: true
      , statusbar: true
      // , inline: true
      , branding: false
      , plugins: ['link', 'autolink', 'image', 'lists', 'preview', 'fullscreen', 'charactercount', 'help']
      // , theme: 'modern'
      // , plugins: [
      //     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      //     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      //     'insertdatetime', 'media', 'table', 'help', 'wordcount'
      // ]
      , toolbar: `undo redo | blocks | 
          'bold italic backcolor | alignleft aligncenter 
          'alignright alignjustify | bullist numlist outdent indent | 
          'removeformat | help`
      , content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    }

  },

  loadPlugins() {
    let promises = [];

    for (let plugin in this.plugins) {
      let url = new URL(this.plugins[plugin], document.location.origin);
      let promise = axios({ url, method: 'get' })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          eval(response.data);
          return response;
      });

      promises.push(promise);
    }

    return Promise.all(promises);
  },

  async initialize(config = {}) {
    const timeLabel = '[plugins.js]';
    console.time(timeLabel);

    Object.assign(this.config, config);

    const results = await this.loadPlugins();

    this.tinymce.setup();
    this.inputmask.setup();

    console.timeEnd(timeLabel);
  },

  tinymce: {

    setup() {
      tinymce.PluginManager.add('charactercount', function (editor) {
          var self = this;
          
          function update() {
              editor.theme.panel.find('#charactercount').text(['Characters: {0}', self.getCount()]);
          }
  
          function decodeHtml(html) {
              var txt = document.createElement("textarea");
              txt.innerHTML = html;
              return txt.value;
          }
        
          editor.on('init', function () {
              var statusbar = editor.theme.panel && editor.theme.panel.getElementById('statusbar');
              // console.log('init', editor.theme)
              if (statusbar) {
                  window.setTimeout(function () {
                      statusbar.insert({
                          type: 'label',
                          name: 'charactercount',
                          text: ['Characters: {0}', self.getCount()],
                          classes: 'charactercount',
                          disabled: editor.settings.readonly
                      }, 0);
          
                      editor.on('setcontent beforeaddundo', update);
          
                      editor.on('keyup', function (e) {
                          update();
                      });
                  }, 0);
              }
          });
        
          self.getCount = function () {
              var tx = editor.getContent({ format: 'raw' });
              var decoded = decodeHtml(tx);
              // here we strip all HTML tags
              var decodedStripped = decoded.replace(/(<([^>]+)>)/ig, "").trim();
              var tc = decodedStripped.length;
              return tc;
          };
      });
    },

    ready(el, data) {
      const offsetHeight = el.offsetHeight;
      // console.log('tinymce.ready', tinymce.EditorManager);
      // tinymce.remove();
      tinymce.init({
        selector: `#${el.id}`,
        init_instance_callback(editor) {
          const element = editor.getElement();
          const container = editor.getContainer();
          const header = container.querySelector('.tox-editor-header');

          if (offsetHeight > 0) {
            let height = offsetHeight + header.offsetHeight;
            container.style.height = `${height}px`;
          }

          editor.on('input change', (evt) => {
            wf.Events.trigger(evt.type, element);
          });

          // $('.mce-tinymce').show('fast');
          // $(editor.getContainer()).find(".mce-path").css("display", "none");
        },
        ...Plugins.config.tinymce
      });
    }

  },

  inputmask: {

    setup() {
      Inputmask.extendAliases(Plugins.config.inputmask);
    },

    ready(el, data) {     

      let alias, options;

      if (/^\{.+\}$/.test(data)) {
        alias = 'custom';
        options = data;
      } else {
        let pos = data.indexOf(',');
        if (pos > 0) {
          alias = data.substr(0, pos);
          options = data.substr(pos+1, data.length).trim();
        }
      }

      if (!alias) alias = data;
      if (!options) options = '{}';

      options = JSON.parse(options);

      let config = Plugins.config.inputmask[alias];
      if (!el.hasAttribute('placeholder')) {
        if (config && config.placeholder) {
          el.setAttribute('placeholder', config.placeholder); 
        }
      }

      el.removeAttribute('data-inputmask');
      Inputmask(alias, options).mask(el);
    }

  },

  charCount: {

    ready(el, data) {

    }

  }

};
