{set $categories = '!pdoMenu' | snippet : [
    'parents' => '103',
    'level' => 1,
    'includeTVs' => 'img',
    'tvPrefix' => '',
    'tpl' => '@FILE chunks/ryshop/category/menu/item.tpl',
    'tplOuter' => '@FILE chunks/ryshop/category/menu/wrapper.tpl'
]}

{set $miniCart = '<div class="toolbar-item msp-mini-cart-dropdown">
              
    <a href="{195 | url}">
        <div>
            <span class="cart-icon"><i class="icon-shopping-cart"></i>
                <span class="count-label msp-cart-total-items d-none"></span>
            </span>
            <span class="text-label">Корзина</span>
          </div>
    </a>
              
    <div class="toolbar-dropdown cart-dropdown hidden-on-mobile">
        <div class="msp-mini-cart"></div>
    </div>
  </div>
'}
  
{*'!mspCart' | snippet : []*}


<!-- Header-->
{*set $search = $_modx->runSnippet('!mSearchForm', [
  'element'  => 'mSearch2',
  'resource' => 'msProduct',
  'fields'   => 'content:5,description:4,pagetitle:3,longtitle:2',
  'parents'  => 0,
  'minQuery' => 3,
  'pageId'   => 349,
  'limit'    => 6,
  'tplForm'  => '@FILE chunks/mSearch2/tpl-2021-mSearch2-form.html',
])*}

{*set $ConstructionMenu = $_modx->runSnippet('pdoMenu', [
  'parents'       => 337,
  'level'         => '2',
  'firstClass'    => '0',
  'innerClass'    => 'sub-menu',
  'lastClass'     => '0',
  'parentClass'   => 'has-children',
  'outerClass'    => ' ',
  'tplOuter'      => '@INLINE {$wrapper}',
  'tpl'           => '@INLINE <li {$classes}><a href="{$link}">{$menutitle}</a></li>{$wrapper}',
  'tplInner'      => '@INLINE <ul {$classes}>{$wrapper}</ul>',
  'tplParentRow'  => '@INLINE <li {$classes}><a href="{$link}">{$menutitle | ucwords}</a>{$wrapper}</li>',
])*}

{*set $MainMenu = $_modx->runSnippet('pdoMenu', [
  'parents'       => 0,
  'level'         => '2',
  'firstClass'    => '0',
  'lastClass'     => '0',
  'parentClass'   => 'has-submenu',
  'innerClass'    => 'sub-menu',
  'outerClass'    => 'site-menu',
  'tplOuter'      => '@INLINE <nav  {$classes}><ul>{$wrapper}
                      <li><a href="{42|url}">Журнал&nbsp;<i class="icon-slack text-success"></i></a></li></ul></nav>',
  'tpl'           => '@INLINE <li {$classes}><a href="{$link}">{$menutitle | ucwords}</a></li>{$wrapper}',
  'tplParentRow'  => '@INLINE
        {if $id == 5}
          <li class="has-megamenu"><a href="#">{$menutitle | ucwords}</a><ul class="mega-menu"><li><span class="mega-menu-title">{$pagetitle}</span><ul class="sub-menu">{$wrapper}</ul></li>
            <li><span class="mega-menu-title">Контактная информация</span>
              <div class="card mb-3">
                <div class="card-body">
                  <ul class="list-icon">
                    <li> <i class="icon-arrow-right-circle text-muted"></i>Адрес производства</li>
                    <li> <i class="icon-map-pin text-muted"></i>МО, Солнечногорский р-н, с/п Смирновское, пос. Смирновка, вл 2, стр 1</li>
                    <li> <i class="icon-phone text-muted"></i>+7 (495) 668-1069</li>
                    <li> <i class="icon-phone text-muted"></i>+7 (903) 151-3344</li>
                    <li class="mb-0"><i class="icon-mail text-muted"></i><a class="navi-link" href="mailto:sale@lateres.ru">sale@lateres.ru</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <li><a class="card border-0 bg-secondary rounded-0" href="{152 | url}"><img class="d-block mx-auto" alt="Фундаментный блок 200×200×400" src="assets/tpl/web/img/banners/baner-block-v2.jpg"></a></li>
            </ul></li>
        {elseif $id == 337}
          <li {$classes}><a href="{$link}">{$menutitle}</a><ul class="sub-menu">'~ $ConstructionMenu ~'</ul></li>
        {else}
          <li {$classes}><a href="{$link}">{$menutitle}</a><ul class="sub-menu">{$wrapper}</ul></li>
        {/if}',
  'tplInner' => '@INLINE {$wrapper}',
])*}

{*set $UserMenu = $_modx->runSnippet('pdoMenu', [
  'parents'       => '123',
  'level'         => '1',
  'firstClass'    => '0',
  'lastClass'     => '0',
  'rowClass'      => 'list-group-item list-group-item-action',
  'outerClass'    => 'list-group',
  'tplOuter'      => '@INLINE <nav {$classes}>{$wrapper}</nav>',
  'tpl'           => '@INLINE <a {$classes} href="{$link}">{$menutitle | ucwords}{if $id == 25}&nbsp;<span class="badge badge-danger badge-pill mails-count">' ~ $unread_count ~ '</span>{/if}</a>{$wrapper}',
])*}

{*set $MobileMenu = $_modx->runSnippet('pdoMenu', [
  'parents'       => 0,
  'level'         => '2',
  'firstClass'    => '0',
  'parentClass'   => 'has-children ',
  'innerClass'    => 'slideable-submenu',
  'lastClass'     => '0',
  'outerClass'    => 'menu',
  'tplOuter'      => '@INLINE <nav class="slideable-menu"><ul {$classes} data-initial-height="385">{$wrapper}
                      <li><a href="{203|url}">Журнал&nbsp;<i class="icon-slack text-success"></i></a></ul></nav>',
  'tpl'           => '@INLINE <li {$classes}><a href="{$link}">{$menutitle | ucwords}</a></li>{$wrapper}',
  'tplParentRow'  => '@INLINE <li {$classes}><span><a href="{$link}">{$menutitle | ucwords}</a><span class="sub-menu-toggle"></span></span>{$wrapper}</li>',
  'tplInner'      => '@INLINE <ul {$classes}>{$wrapper}</ul>',
])*} 

{*set $categories = $_modx->runSnippet('pdoMenu', [
  'parents'       => 5,
  'level'         => '2',
  'firstClass'    => '0',
  'lastClass'     => '0',
  'limit'         => '7',
  'resources'     => '246,247,357,263,250,273,290',
  'webLinkClass'   => 'nav-link',
  'outerClass'    => 'nav align-self-center',
  'tplOuter'      => '@INLINE <ul {$classes}>{$wrapper}</ul>',
  'tplInner'      => '@INLINE {$wrapper}',
  'tpl'           => '@INLINE <li class="nav-item" {$classes}><a class="nav-link navi-link" href="{$link}">{$menutitle}</a></li>{$wrapper}',

])*}

<style>
    .container {
        max-width: 1200px!important;
    }
    .site-header .topbar {
        /* background-color: #FFB300!important;
        border: none!important */
    }
    .site-header .toolbar {
        display: flex!important
    }
    .site-header .toolbar .toolbar-item {
        border: none
    }
    .site-header .toolbar .toolbar-item > a {
        display: block;
        position: relative!important;
        /* top: 0; */
        /* left: 0; */
        /* width: 100%; */
        /* height: 100%; */
        padding: 5px;
        color: #505050;
        text-align: center;
        text-decoration: none;
    }
    .site-header .toolbar .toolbar-item > a > i[class^=icon-] {
        display: block; 
        font-size: 1.4em
    }
    .site-header .toolbar .toolbar-item:hover {
        background: #efa800!important
    }
    .custom-input-group {
        position: relative;
        display: flex;
        /* flex-wrap: wrap; */
        align-items: stretch;
        width: 100%;
    }
    .custom-input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .custom-input-group .custom-input-group-text {
        display: flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: center;
        white-space: nowrap;
        left: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        border: none
    }
    .custom-input-group .form-control {
        padding-left: 37px;
    }

    .btn.btn-primary {
        background: #ff4700;
        color: #fff
    }

    .btn.btn-primary:hover {
        background: #b13100!important;
        border: 1px solid #b13100!important
    }
    .btn.btn-primary:active {
        background: #b13100!important;
        border: 1px solid #b13100!important
    }

    .site-category .dropdown-menu a {
        color: #212529
    }

    .site-category .list-group {
        border: none!important;
    }
    .site-category .list-group-item {
        border: none!important;
        border-radius: 0!important
    }

    .site-category .dropdown-menu .list-group-item:hover {
        background: #f5f5f5;
        /* color: black!important */
    }
    .topbar_ {
        /* background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 6%, rgba(105,6,18,1) 17%, rgba(0,78,115,1) 74%); */
        background: rgb(17,13,84);
        background: linear-gradient(90deg, rgba(17,13,84,1) 0%, rgba(64,8,15,1) 0%, rgba(0,70,115,1) 64%);
    }
</style>

<!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page.-->
<header class="site-header navbar-sticky sticky-top_" style="position: sticky">
    
    <!-- Topbar-->
    <div class="topbar">
        <div class="container d-flex py-2">

            <div class="site-branding d-flex">
                <a class="site-logo align-self-center" href="{$_modx->config.site_url}">
                    <img src="{$_modx->config.site_logo}" alt="{$_modx->config.site_name}" style="width: 120px!important">
                </a>
            </div>

            <div class="d-flex flex-fill justify-content-end">
                <span>Профиль</span>
                <a href="/?action=logout">Выход</a>
            </div>

        </div>
    </div>
    
</header>