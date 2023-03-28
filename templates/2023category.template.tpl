<!DOCTYPE html>
<html lang="{$_modx->config.cultureKey}">
  <head>
    {include 'file:chunks/base/head.tpl'}
  </head>
  <body>
      
    {include 'file:chunks/base/yandex_metrica.tpl'}
    {include 'file:chunks/base/header.tpl'}
    {*include 'file:chunks/base/breadcrumbs.tpl'*}
    
    <div class="container padding-bottom-2x mb-2" style="max-width: 1100px!important; margin: 50px auto">
        <div class="row">
            <div class="col-3 aside-menu">
                <div class="sidebar-toggle position-left"><i class="icon-menu"></i></div>
                <aside class="sidebar sidebar-offcanvas position-left">
                    <span class="sidebar-close"><i class="icon-x"></i></span>
                    <section class="widget widget-categories">
                        <h3 class="widget-title">{$_modx->resource.pagetitle}</h3>
                        {'!pdoMenu' | snippet : [
                            'parents' => $_modx->resource.id,
                            'level' => 1,
                            'tpl' => '@INLINE <li><a href="{$id | url}">{$menutitle}</a></li>',
                            'tplOuter' => '@INLINE <ul>{$wrapper}</ul>'
                        ]}
                    </section>
                </aside>
            </div>
            <div class="col-9 aside-content">
                {$_modx->resource.content}  
            </div>
        </div>
    </div>
    
    {include 'file:chunks/base/footer.tpl'}
    {include 'file:chunks/base/scripts.tpl'}
    
    <!-- Back To Top Button-->
    <a class="scroll-to-top-btn" href="#"><i class="icon-chevron-up"></i></a>
      
    <!-- Backdrop-->
    <div class="site-backdrop"></div>
    
  </body>
</html>