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
{'!wfAuthRegister' | snippet : [
    'userGroup' => 'Users',
    'userGroupRole' => 1,
    'processFields' => '
        firstname:normalizeText,
        midname:normalizeText,
        lastname:normalizeText,
        mobilephone:trimPhone,
        email:trim,
        password:trim,
        passwordAgain:trim
    ',
    'validation' => [
        'firstname' => ['required'],
        'midname' => ['required' => true],
        'lastname' => ['required' => true],
        'mobilephone' => ['required' => true, 'phone' => true],
        'email' => ['required' => true, 'email' => true]
    ],
    'tpl' => '@FILE chunks/auth/register.tpl'
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
          "page": "signup"
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