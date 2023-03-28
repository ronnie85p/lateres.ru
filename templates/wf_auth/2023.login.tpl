{set $breadCrumbs = 'pdoCrumbs' | snippet : [
    'showCurrent' => 0,
    'showHome' => 1,
    'outputSeparator' => '<li class="separator">&nbsp;</li>',
    'tpl'        => '@INLINE <li><a href="{$link}">{$menutitle}</a></li>',
    'tplCurrent' => '@INLINE <li class="active"></li>',
    'tplWrapper' => '@INLINE <ul class="breadcrumbs text-start">{$output}</ul>',
    'tplMax'     => '@INLINE <span>&nbsp;...&nbsp;</span>'
]}

<!DOCTYPE html>
<html lang="{$_modx->config.cultureKey}">
  <head>
    {include 'file:chunks/base/head.tpl'}
  </head>
  <body>
      
    {*include 'file:chunks/base/yandex_metrica.tpl'*}
    {include 'file:chunks/base/header.tpl'}
    
    <div class="container my-4">

        <div class="row mb-4">
            <div class="col-12">
                {$breadCrumbs}
            </div>
        </div>
        
        <div class="" style="min-height: 200px" id="cart" data-props='{
            "id": {$_modx->resource.id}
        }'>
        </div>

    </div>

    {include 'file:chunks/base/footer.tpl'}
    {include 'file:chunks/base/backdrop.tpl'}
    {include 'file:chunks/base/scripts.tpl'}

    {* <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> *}
    {* <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="app/webpack/components/product/src/js/default.js" type="text/babel"></script> *}

    <script src="app/webpack/components/cart/dist/runtime.js"></script>
    <script src="app/webpack/components/cart/dist/vendors.js"></script>
    <script src="app/webpack/components/cart/dist/bundle.js"></script>
    
  </body>
</html>