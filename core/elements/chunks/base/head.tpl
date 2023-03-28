{set $title = $_modx->resource.longtitle ?: $_modx->resource.pagetitle}
{set $url = $_modx->resource.id | url : ['schema' => 'full']}
{set $fav_icon = $_modx->config['app.site_url'] ~ '/assets/tpl/web/favicon.png'}

<title>{$title}</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="description" content="{$_modx->resource.description}">
<meta name="robots" content="{$_modx->resource.searchable ? 'index, follow' : 'noindex, nofollow'}">
<meta name="author" content="{$_modx->config.site_name}">
<meta name="keywords" content="{$_modx->resource.introtext}">
<base href="{$_modx->config.site_url}" />

<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="canonical" href="{$url}">
	
<!-- Favicon and Apple Icons-->
<link rel="icon" type="image/x-icon" href="assets/tpl/web/favicon.ico">

<!-- @input $fav_icon @options &w=36&h=36&q=90&zc=1 -->
<link rel="icon" sizes="36x36" href="" type="image/png" />

<!-- @input $fav_icon @options &w=48&h=48&q=90&zc=1 -->
<link rel="icon" sizes="48x48" href="" type="image/png" />

<!-- @input $fav_icon @options &w=96&h=96&q=90&zc=1 -->
<link rel="icon" sizes="96x96" href="" type="image/png" />

<!-- @input $fav_icon @options &w=300&h=300&q=90&zc=1 -->
<link rel="apple-touch-icon" sizes="300x300" href="" />

<!-- @input $fav_icon @options &w=72&h=72&q=90&zc=1 -->
<link rel="apple-touch-icon" sizes="72x72" href="" />

<!-- @input $fav_icon @options &w=114&h=114&q=90&zc=1 -->
<link rel="apple-touch-icon" sizes="114x114" href="" />

<!-- @input $fav_icon @options &w=144&h=144&q=90&zc=1 -->
<link rel="apple-touch-icon" sizes="144x144" href="" />

<link rel="mask-icon" href="assets/tpl/web/favicons/safari-pinned-tab.svg" color="#5bbad5">

<meta name="msapplication-TileColor" content="#ffc40d">
<meta name="theme-color" content="#ffffff">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="{$_modx->config.site_name}">
<meta property="og:updated_time" content="{'' | date_format : "%Y-%m-%dT%T+03:00"}" />
<meta property="og:title" content="{$title}">
<meta property="og:description" content="{$_modx->resource.description}">
<meta property="og:url" content="{$url}">
<meta property="og:locale" content="ru_RU">

{if !$_modx->resource.img}
  <meta property="og:image" content="https://www.lateres.ru/assets/tpl/web/lateres-01.jpg">
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="520" />
{else}
  <meta property="og:image" content="https://www.lateres.ru{*$_modx->resource.img | phpthumbon : "w=1200&h=900&zc=C&bg=ffffff"*}">
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="900" /> 
{/if}

<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="address=no">

<link rel="stylesheet" href="{$_modx->config['app.site_url']}/assets/vendor/bootstrap-5.2.2-dist/css/bootstrap.min.css" />

<link rel="stylesheet" href="{$_modx->config['app.site_url']}/assets/css/icons.min.css" />
<link rel="stylesheet" href="{$_modx->config['app.site_url']}/assets/css/styles.css" />
{* <link rel="stylesheet" href="{$_modx->config['app.site_url']}/assets/css/theme.css" /> *}

{* <link rel="stylesheet" href="assets/css/styles.old.css" /> *}
{* <link rel="stylesheet" href="assets/css/styles2.css" /> *}
{* <link rel="stylesheet" href="assets/css/styles3.css" /> *}
{* <link rel="stylesheet" href="assets/css/page.css" />
<link rel="stylesheet" href="assets/css/theme3.css" /> *}

{* <script src="assets/vendor/axios/axios.min.js"></script> *}

<!-- Примечание: при деплое на продакшен замените «development.js» на «production.min.js». -->
{* <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> *}

{* <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script> *}
{* <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script> *}

{* <link rel="stylesheet" href="app/assets/js/dist/css/vendors.css" /> *}

<script>
  if (typeof App === 'undefined') {
    var App = {};
  }

  App.config = {
    context: "{$_modx->context.key}",
    resource: {$_modx->resource | json_encode},
  };
</script>

