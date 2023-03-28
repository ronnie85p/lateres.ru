{set $breadCrumbs = 'pdoCrumbs' | snippet : [
    'showCurrent' => 0,
    'showHome' => 1,
    'outputSeparator' => '<li class="separator">&nbsp;</li>',
    'tpl'        => '@INLINE <li><a href="{$link}">{$menutitle}</a></li>',
    'tplCurrent' => '@INLINE <li class="active"></li>',
    'tplWrapper' => '@INLINE <ul class="breadcrumbs text-start">{$output}</ul>',
    'tplMax'     => '@INLINE <span>&nbsp;...&nbsp;</span>'
]}

{*

{'!wfAuthLoginConfirm' | snippet : [
    'tplMethod1' => '@FILE chunks/auth/login/2auth/method1.tpl',
    'tplMethod2' => '@FILE chunks/auth/login/2auth/method2.tpl',
    'tplWrapper' => '@FILE chunks/auth/login/2auth.tpl'
]}

 *}

<!DOCTYPE html>
<html lang="{$_modx->config.cultureKey}">
  <head>
    {include 'file:chunks/base/head.tpl'}
  </head>
  <body class="bg-light">
      
    {*include 'file:chunks/base/yandex_metrica.tpl'*}
    {include 'file:chunks/base/header.tpl'}
    
    <div class="container my-4">

        <div class="row mb-4">
            <div class="col-12">
                {$breadCrumbs}
            </div>
        </div>
        
        <div class="" style="min-height: 200px" id="auth" data-props='{
          "route": "signin/confirm"
        }'></div>

    </div>

    {include 'file:chunks/base/footer.tpl'}
    {include 'file:chunks/base/backdrop.tpl'}
    {include 'file:chunks/base/scripts.tpl'}

    <script src="app/webpack/components/auth/dist/runtime.js"></script>
    <script src="app/webpack/components/auth/dist/vendors.js"></script>
    <script src="app/webpack/components/auth/dist/bundle.js"></script>
  </body>
</html>