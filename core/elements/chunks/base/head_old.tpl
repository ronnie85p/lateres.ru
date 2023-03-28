<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>{$_modx->resource.longtitle ?: $_modx->resource.pagetitle}</title>
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="description" content="{$_modx->resource.description}">
<meta name="robots" content="{$_modx->resource.searchable ? 'index, follow' : 'noindex, nofollow'}">
<meta name="author" content="{$_modx->config.site_name}">
<meta name="keywords" content="{$_modx->resource.introtext}">
<base href="{$_modx->config.site_url}" />

<link rel="canonical" href="{$_modx->config.site_url}{$_modx->makeUrl($_modx->resource.id) == '/' ? null : $_modx->makeUrl($_modx->resource.id)}">
	
<!-- Favicon and Apple Icons-->
<link rel="icon" type="image/x-icon" href="assets/tpl/web/favicon.ico">
<link rel="icon" sizes="36x36" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=36&h=36&q=90&zc=1'
]}" type="image/png" />
<link rel="icon" sizes="48x48" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=48&h=48&q=90&zc=1'
]}" type="image/png" />
<link rel="icon" sizes="96x96" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=96&h=96&q=90&zc=1'
]}" type="image/png" />
<link rel="apple-touch-icon" sizes="300x300" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=300&h=300&q=90&zc=1'
]}" />
<link rel="apple-touch-icon" sizes="72x72" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=72&h=72&q=90&zc=1'
]}" />
<link rel="apple-touch-icon" sizes="114x114" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=114&h=114&q=90&zc=1'
]}" />
<link rel="apple-touch-icon" sizes="144x144" href="{'phpthumbon' | snippet : [
'input' => 'assets/tpl/web/favicon.png',
'options' => '&w=144&h=144&q=90&zc=1'
]}" />

<!--<link rel="manifest" href="assets/tpl/web/favicons/site.webmanifest">-->
<link rel="mask-icon" href="assets/tpl/web/favicons/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#ffc40d">
<meta name="theme-color" content="#ffffff">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="{$_modx->config.site_name}">
<meta property="og:updated_time" content="{'' | date_format:"%Y-%m-%dT%T+03:00"}" />
<meta property="og:title" content="{$_modx->resource.longtitle == null ? $_modx->resource.pagetitle : $_modx->resource.longtitle}">
<meta property="og:description" content="{$_modx->resource.description}">
<meta property="og:url" content="{$_modx->config.site_url}{$_modx->makeUrl($_modx->resource.id) == '/' ? null : $_modx->makeUrl($_modx->resource.id)}">
<meta property="og:locale" content="ru_RU">
{if $_modx->resource.img == null}
  <meta property="og:image" content="https://www.lateres.ru/assets/tpl/web/lateres-01.jpg">
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="520" />
{else}
  <meta property="og:image" content="https://www.lateres.ru{$_modx->resource.img | phpthumbon : "w=1200&h=900&zc=C&bg=ffffff"}">
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="900" /> 
{/if}

<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="address=no">

<!-- Vendor Styles -->
<link rel="stylesheet" href="{'site_url' | option}assets/tpl/web/css/vendor2.min.css" />

<!-- Template Styles -->
<link rel="stylesheet" href="{'site_url' | option}assets/tpl/web/css/styles.min.css" />

<!-- Main Styles -->
<link rel="stylesheet" href="{'site_url' | option}assets/tpl/web/css/lateres.min.css" />

<script type="text/javascript" src="{'site_url' | option}assets/tpl/web/js/modernizr.min.js"></script>
<script type="text/javascript" src="{'site_url' | option}assets/tpl/web/js/vendor.min.js"></script>
<script src="dev/assets/vendor/Inputmask-5.x/dist/inputmask.min.js"></script>

<!-- JavaScript (jQuery) libraries, plugins and custom scripts-->
<script src="{'site_url' | option}assets/tpl/web/js/scripts.min.js"></script>

<link rel="stylesheet" href="/assets/tpl/web/js/fancybox/jquery.fancybox.min.css" />
<script src="/assets/tpl/web/js/fancybox/jquery.fancybox.min.js"></script>

<script type="text/javascript" src="{'site_url' | option}dev/config/mainjs.php"></script>
<script type="text/javascript" src="{'site_url' | option}dev/config/langjs.php"></script>

<script type="text/javascript" src="{'site_url' | option}dev/assets/js/ext.js"></script>
<script type="text/javascript" src="{'site_url' | option}dev/assets/js/est.js"></script>
<script type="text/javascript" src="{'site_url' | option}dev/assets/js/file.api.js"></script>
<script type="text/javascript" src="{'site_url' | option}dev/assets/js/sortable.api.js"></script>
<script type="text/javascript" src="{'site_url' | option}dev/assets/js/ymaps.js"></script>
<script type="text/javascript" src="{'site_url' | option}dev/assets/js/main.js"></script>


{if $_modx->config.isUserTest}
  <link rel="stylesheet" href="{'site_url' | option}assets/web/css/styles.css" />
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script type="text/javascript" src="{'site_url' | option}assets/web/js/ext.js"></script>
  <script type="text/javascript" src="{'site_url' | option}assets/web/js/ext.ymaps.js"></script>
{/if}

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<script>
  var ExtConfig = {
    timestamp: {time()},
    device: { },
    tinymce: {
      language: 'ru',
      plugins: 'link image code',
      document_base_url: ''
    },
    modal: {
      titles: [
        '<span class="text-success"><i class="icon-check-circle"></i>Успех!</span>',
        '<span class="text-danger"><i class="icon-x"></i>Ошибка!</span>',
        '<span class="text-warning"><i class="icon-alert-triangle"></i>Внимание!</span>',
        '<span class="text-dark"><i class="icon-clock"></i>Уведомление!</span>'
      ],
      content: "{addslashes('@FILE chunks/modal/modal.html'|chunk|strip:true)}"
    },
    login: {
      modal: {
        logout: "{addslashes('@FILE chunks/ulogin/modal/logout.html'|chunk|strip:true)}"
      },
      pswdlvl: {
        low: '<i class="icon-alert-triangle"></i>&nbsp;Слабый пароль (минимум 8 символов)',
        mid: '<i class="icon-alert-triangle"></i>&nbsp;Средний пароль (минимум 8 символов)',
        high: '<i class="icon-check text-success"></i>&nbsp;Надежный пароль (минимум 8 символов)'
      }
    },
    gallery: {
      closeOnScroll: false,
      shareButtons: [ 
        {ignore}{ id: 'download', label: 'Descargar' , url: '{ { raw_image_url } }', download:true }{/ignore}
      ]
    },
    cookie: {
      accept: {
        key: 'cookie_accept',
        timeout: 15000,
        options: { secure: true, 'max-age': 31536000 },
        html: '<div class="alert alert-light border-secondary p-1 bg-white" style="position: fixed; bottom: 2px; right: 25%; left: 25%; z-index: 1000000">' + 
          '<div class="row">' +
            '<div class="col-md-10 d-flex align-items-center">' +
              'Наш веб-сайт может использовать файлы cookie, IP-адреса и другие данные браузера, чтобы дать вам лучший опыт использования сайта.' +
            '</div>' +
            '<div class="col-md-2 text-center">' +
              '<button class="btn btn-info" data-dismiss="alert">Принять</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      }
    },
    card: {
      formSelectors: {
  	   numberInput: 'input[name="card_number"]',
  	   expiryInput: 'input[name="card_expiry"]',
  	   cvcInput: 'input[name="card_cvc"]',
  	   nameInput: 'input[name="card_name"]'
  	 },
  	 placeholders: {
  	   number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
  	   cvc: '&bull;&bull;&bull;',
  	   expiry: '&bull;&bull;/&bull;&bull;',
  	   name: 'HOLDER NAME'
  	 },
    },
    inputmask: {
      phone: {
        mask: '+7 (999) 999 9999',
        placeholder: '_',
        greedy: false,
      }
    },
    chat: {
      observer: {
        alarmAudio: 'atoms/components/mychat/web/audio/msg_alarm.mp3',
        timeout: 15,
        chatTimeout: 2,
      },
      contactTpl: "{addslashes('@FILE chunks/mychat/contacts/row.html'|chunk|strip:true)}",
      messageTpl: "{addslashes('@FILE chunks/mychat/messages/row.html'|chunk|strip:true)}",
      messageRepairTpl: '<div class="media w-75 ml-auto msg-repair" data-msgid="((msgid))">' +
        '<div class="media-body text-right">' +
          '<small class="text-muted">Mensaje eliminado.</small>' +
          '<button class="btn btn-sm mychat-btn m-0 p-0 d-none" type="button" data-id="message-repair" data-msgid="((+msgid))"><i class="icon-refresh-ccw"></i>&nbsp;Restaurar</button>'+
          '<a class="mychat-btn text-sm" href="#" data-id="message-repair" data-msgid="((+msgid))"><i class="icon-refresh-ccw"></i>&nbsp;Restaurar</button>'+
        '</div>'+
      '</div>',
      messageToast: {
        class: 'msg-toast',
        icon: 'icon-mail',
        timeout: 15000,
        message: '<div class="m-0">' + 
          '<a href="{25|url}">' +
            '<span class="msg-toast-count">((+count))</span>&nbsp;&nbsp;<span class="msg-toast-message">Nuevo mensaje</span>' + 
          '</a>'+
        '</div>'
      },
      windowTitleNewMessage: '*** New message',
      windowTitleTimeout: 700,
      attachFiles: {
        multiple: true,
        types: 'jpeg, jpg, png',
        maxCount: 10,
        maxSizeMb: 10,
        thumbTpl: '<div class="attach-item m-2 position-relative border bg-dark overflow-hidden d-flex align-items-middle rounded" style="height: 150px; width: 150px;" data-index="((+index))">' +
          '<div class="attach-delete p-1" style="position: absolute; top: 0; right: 0; z-index: 2; background: rgba(0,0,0, .2);" title="Eliminar">' +
            '<a href="#" class="fs-action" data-action="remove"><i class="icon-x close text-md text-light"></i></a>' +
          '</div>' +
          '<img class="d-block m-auto" src="((+source))" style="width: 100%;" />' +
        '</div>'
      }
    }
  };

</script>

{'!uLogin' | snippet : [
  'redirectAfterLogin'   => 9,
  'redirectAfterLogout'  => 12,
  'redirectLoginConfirm' => 20,
]}

{'!uSupport' | snippet : [
  'orderCallModalTpl' => '@FILE chunks/usupport/modal/ordercall.html',
  'orderCallMessageSuccessTpl' => '@INLINE Мы с Вами свяжемся {$datetime|date:"d.m в H:i"}!',
  'orderCallEmailSubjectTpl' => '@INLINE Был только что заказан звонок!',
  'orderCallEmailMessageTpl' => '@INLINE Посетитель <b>{$data.name}</b> только что заказал звонок на {$data.phone} <b>{$data.datetime|date:"d.m в H:i"}</b>!',
  'adviceModalTpl' => '@FILE chunks/usupport/modal/advice.html',
  'adviceMessageSuccessTpl' => '@INLINE Cпасибо за Ваше содействие!',
  'adviceEmailSubjectTpl' => '@INLINE Поступило предложение по улучшению страницы',
  'adviceEmailMessageTpl' => '@INLINE 
    <h2>Поступило предложение{if $_modx->user.id > 0}, <b>от {$_modx->user.fullname}</b>{/if}!</h2>
    <p>По улучшению <a href="{$data.resource_id|url:[\'scheme\' => \'full\']}">страницы</a>.</p>
    <p style="border: 1px solid #e8e8e8;padding: 10px;font-size: 12pt;color: #5d5d5d;">{$data.textarea}</p>
    <p style="border: 1px solid #c5c5c5;border-bottom:  0;"></p>
    <p style="color: #ababab;">IP: {$data.client_ip}</p>
  '
]}
