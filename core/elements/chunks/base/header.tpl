{* {set $categories = '!pdoMenu' | snippet : [
    'parents' => '103',
    'level' => 1,
    'includeTVs' => 'img',
    'tvPrefix' => '',
    'tpl' => '@FILE chunks/ryshop/category/menu/item.tpl',
    'tplOuter' => '@FILE chunks/ryshop/category/menu/wrapper.tpl'
]} *}

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
</style>

<!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page.-->
<header class="site-header navbar-sticky">
    
    <!-- Topbar-->
    <div class="topbar">
        <div class="container d-flex">

            <nav class="site-menu">
                <ul>
                    <li><a href="{634 | url}">Строительные центры</a></li>
                    <li><a href="{6 | url}">Доставка и Самовывоз</a></li>
                    <li><a href="contacts.html">Возврат</a></li>
                    <li><a href="contacts.html">Услуги</a></li>
                    <li><a href="main/news-articles/">Журнал&nbsp;<i class="icon-slack text-success"></i></a></li>
                </ul>
            </nav>

            <div class="toolbar align-items-stretch">
                
                <div class="toolbar-item pt-2">
                    <a href="#">
                        <i class="icon-shopping-cart"></i> 
                        Корзина
                    </a>
                </div>

                <div class="toolbar-item pt-2">
                    {if !$_modx->isAuthenticated('web')}
                        <a href="javascript:">
                            <i class="icon-user"></i> 
                            Профиль
                        </a>
                        <ul class="toolbar-dropdown lang-dropdown w-180">
                            <li><a href="#"><i class="icon-box"></i> Мои заказы</a></li>
                            <li><a href="#"><i class="icon-settings"></i> Настройки</a></li>
                        </ul>
                    {else}
                        <a href="javascript:">
                            <i class="icon-user"></i> 
                            Войти
                        </a>
                    {/if}
                </div>

            </div>

        </div>

                {* <!-- Mobile Menu-->
                <div class="mobile-menu">
                <!-- Search Box-->
                <div class="mobile-search">
                    {$search}
                </div>
              
                <!-- Toolbar-->
                <div class="toolbar">
                    <div class="toolbar-item  bg-success">
                        <a class="text-white" href="{18|url}">
                            <div><i class="icon-plus-circle"></i><span class="text-label">Задать вопрос</span></div>
                        </a>
                    </div>
                    {if $_modx->user.id > 0 && $_modx->hasSessionContext('web') > 0}
                        <div class="toolbar-item">
                            <a href="{9|url}">
                                <div><i class="icon-user"></i><span class="text-label">Профиль</span></div>
                            </a>
                        </div>
                        <div class="toolbar-item">
                            <a href="#" class="ulgn-btn" data-modal="logout">
                                <div><i class="icon-arrow-left-circle"></i><span class="text-label">Выйти</span></div>
                            </a>
                        </div>
                    {else}   
                        <div class="toolbar-item">
                            <a href="{125|url}">
                                <div><i class="icon-user"></i><span class="text-label">Войти</span></div>
                            </a>
                        </div>
                        <div class="toolbar-item">
                            <a href="{109|url}">
                                <div><i class="icon-unlock"></i><span class="text-label">Регистрация</span></div>
                            </a>
                        </div>
                    {/if}   
                </div>
                <!-- Slideable (Mobile) Menu-->
                {$MobileMenu}
                
            </div> *}

    </div>

    <!-- If Not Mobile -->
    {if !$.client.is_mobile}

        <div class="navbar shadow-sm">
            <div class="container">

                <div class="dropdown d-flex">

                    <div class="site-branding d-flex">
                        <a class="site-logo align-self-center" href="{$_modx->config.site_url}">
                            <img src="{$_modx->config.site_logo}" alt="{$_modx->config.site_name}">
                        </a>
                    </div>

                    <div class="site-category">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Категории</button>
                        <div class="dropdown-menu dropdown-menu-end w-100">
                            {* {$categories} *}
                        </div>
                    </div>

                </div>

                <script>

                document.querySelectorAll('[data-hover="dropdown"]').forEach(el => {
                    for (let evType of ['mouseover', 'mouseout']) {
                        el.addEventListener(evType, function () {
                            let dropdown = new bootstrap.Dropdown(this);
                            if (evType == 'mouseover') {
                                dropdown.show();
                            } else {
                                dropdown.hide();
                            }
                        }, false);
                    }

                });

                </script>

                <div class="site-search d-flex flex-fill dropdown dropstart_">
                    <form class="w-100">
                        <div class="custom-input-group my-2">
                            <span class="custom-input-group-text icon-search text-muted"></span>
                            <input class="form-control" type="search" name="query" placeholder="Искать на cайте">
                        </div>
                    </form>
                </div>

                <div class="site-phone align-items-center">
                    <a href="tel:+74956681069" class="navi-link h4 m-0 fw-5">+7&nbsp;(495)&nbsp;668&#8209;1069</a>
                    <div class="d-flex justify-content-between">
                        <span class="text-xs">с 8:00 до 20:00</span>
                        <span class="text-xs">
                            <a href="tel:+74956681069" class="call usupp-btn" data-cfg="{ 
                                'target': 'modal', 
                                'modal': {
                                    'loading': true
                                },
                                'params': {
                                    'action': 'chunk/get',
                                    'name': 'orderCallModalTpl'
                                }
                            }">Заказать звонок</a>
                        </span>
                    </div>
                </div>

                <div class="site-order d-none align-self-center ml-3">
                    <a class="btn btn-outline-primary pl-3 pr-3 mr-0" href="{608 | url}"><i class="icon-check-square pr-1" style="font-size: 18px;"></i> Сделать заказ</a>
                </div>  

            </div>
        </div>

            {* <!-- Navbar-->
            <div class="navbar p-0 shadow-sm d-none">
                <div class="container">
                    <div class="col-12">
                        <div class="row">
                            
                            <div class="search-box-wrap d-flex">
                                <div class="search-box-inner align-self-center">
                                    <div class="search-box d-flex">
                                        <div class="site-branding d-flex">
                                            <a class="site-logo align-self-center" href="{$_modx->config.site_url}">
                                                <img src="{$_modx->config.site_logo}" alt="{$_modx->config.site_name}">
                                            </a>
                                        </div>
                                        <div class="btn-group categories-btn">
                                            <button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu text-lg"></i>&nbsp;Товары & Услуги</button>
                                            <div class="dropdown-menu mega-dropdown">
                                                <div class="row">
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{9 | url}"><img src="assets/tpl/web/img/shop/categories/blocks-140.jpg" title="{9 | resource: 'pagetitle'}" alt="{9 | resource: 'pagetitle'}"><span class="text-gray-dark">{9 | resource: 'pagetitle'}</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{16 | url}"><img src="assets/tpl/web/img/shop/categories/tile-140.jpg" title="{16 | resource: 'pagetitle'}" alt="{16 | resource: 'pagetitle'}"><span class="text-gray-dark">{16 | resource: 'pagetitle'}</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{18 | url}"><img src="assets/tpl/web/img/shop/categories/border-140.jpg" title="{18 | resource: 'pagetitle'}" alt="{18 | resource: 'pagetitle'}"><span class="text-gray-dark">{18 | resource: 'pagetitle'}</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{294 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/brick-140.jpg" title="{294 | resource: 'pagetitle'}" alt="{294 | resource: 'pagetitle'}"><span class="text-gray-dark">{294 | resource: 'pagetitle'}</span></a></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{250 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/cement-140.jpg" title="{250 | resource: 'pagetitle'}" alt="{250 | resource: 'pagetitle'}"><span class="text-gray-dark">{250 | resource: 'pagetitle'} по 50 кг</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{251 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/materials-140.jpg" title="{251 | resource: 'pagetitle'}" alt="{251 | resource: 'pagetitle'}"><span class="text-gray-dark">{251 | resource: 'pagetitle'}</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{257 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/laying-tiles-140.jpg" title="{257 | resource: 'pagetitle'}" alt="{257 | resource: 'pagetitle'}"><span class="text-gray-dark">{257 | resource: 'pagetitle'}</span></a></div>
                                                    <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{137 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/manipulator-140.jpg" title="{137 | resource: 'pagetitle'}" alt="{137 | resource: 'pagetitle'}"><span class="text-gray-dark">{137 | resource: 'pagetitle'}</span></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        {$search}
                                    </div>
                                </div>
                                
                                <div class="site-phone align-items-center">
                                    <a href="tel:+74956681069" class="navi-link h4 m-0 fw-5">+7&nbsp;(495)&nbsp;668&#8209;1069</a>
                                    <div class="d-flex justify-content-between">
                                        <span class="text-xs">с 8:00 до 20:00</span>
                                        <span class="text-xs">
                                            <a href="tel:+74956681069" class="call usupp-btn" data-cfg="{ 
                                                'target': 'modal', 
                                                'modal': {
                                                    'loading': true
                                                },
                                                'params': {
                                                    'action': 'chunk/get',
                                                    'name': 'orderCallModalTpl'
                                                }
                                            }">Заказать звонок</a>
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="toolbar">
                                    <div class="toolbar-inner d-none">
                                
                                        <div class="toolbar-item hidden-on-mobile">
                                            <a href="#">
                                                <div><i class="icon-message-circle"></i>
                                                <span class="text-label">Сообщения</span></div>
                                            </a>
                                            <ul class="toolbar-dropdown lang-dropdown w-180">
                                                <li><a href="https://wa.me/79031513344?text=LATERES.ru"><i class="flag-icon"><img src="assets/tpl/web/img/flags/WA.png" alt="WhatsApp"></i>&nbsp;WhatsApp</a></li>
                                                <li><a href="https://teleg.run/lateres_sale"><i class="flag-icon"><img src="assets/tpl/web/img/flags/TM.png" alt="Telegram"></i>&nbsp;Telegram</a></li>
                                                <li><a href="#"><i class="icon-message-square"></i>&nbsp;Задать вопрос</a></li>
                                                <div class="dropdown-divider"></div>
                                                <li><a href="#">Сообщить об ошибке</a></li>
                                                <li><a href="#">Оставить отзыв</a></li>
                                                <li><a href="#">Служба поддержки</a></li>
                                            </ul>
                                        </div>
                              
                                        <div class="toolbar-item hidden-on-mobile">
                                            <a href="{201 | url}">
                                                <div><span class="compare-icon"><i class="icon-heart"></i><span class="count-label msp-cart-favorite-count d-none">0</span></span><span class="text-label">Избранное</span></div>
                                            </a>
                                        </div>
                              
                                        {$miniCart}
                                
                                    </div>
                                </div>
            
                                <div class="d-flex align-self-center ml-3">
                                    <a class="btn btn-outline-primary pl-3 pr-3 mr-0" href="{608|url}"><i class="icon-check-square pr-1" style="font-size: 18px;"></i> Сделать заказ</a>
                                </div>  
                            </div>
              
                        </div>
                    </div>
                </div>
            </div> *}
        {/if}

    {* <div class="topbar d-none">
        <div class="container">
            <div class="topbar d-flex justify-content-between border-0">
                
                {if $.client.is_mobile}
                    <!-- Logo-->
                    <div class="site-branding d-flex" style="padding: 12px 0;">
                      <a class="site-logo align-self-center" href="{$_modx->config.site_url}">
                        <img src="assets/imgs/logo/lateres-2-01.png" alt="{$_modx->config.site_name}">
                      </a>
                    </div>
                {else}
                    <nav class="site-menu">
                        <ul>
                            <li><a href="{634|url}">Строительные центры</a></li>
                            <li><a href="{6|url}">Доставка и Самовывоз</a></li>
                            <li><a href="contacts.html">Возврат</a></li>
                            <li><a href="contacts.html">Услуги</a></li>
                            <li><a href="main/news-articles/">Журнал&nbsp;<i class="icon-slack text-success"></i></a></li>
                        </ul>
                    </nav>
                    {$MainMenu_}
                {/if}
      
                <!-- Toolbar-->
                <div class="toolbar d-none">
                    <!--<div class="toolbar-item hidden-on-mobile location-region-view">
                        <a href="#">
                            <div><span class="cart-icon"><i class="icon-map-pin"></i></span><span class="text-label location-region-text" style="-ms-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;-ms-line-clamp: 1;-webkit-line-clamp: 1;line-clamp: 1;display: -webkit-box;word-wrap: break-word;-webkit-box-orient: vertical;">Московская область</span></div>
                        </a>
                        <div class="toolbar-dropdown text-center px-3">
                            <p class="text-xs mb-3 pt-2">Ваш регион:<br><span class="location-region-text text-gray-dark fw-5">Московская область</span></p>
                            <a class="btn btn-primary btn-sm btn-block location-change-btn" href="#">Изменить</a>
                        </div>
                    </div>-->
                    <div class="toolbar-item hidden-on-mobile">
                        <a href="#">
                            <div><i class="icon-message-circle"></i>
                            <span class="text-label">Сообщения</span></div>
                        </a>
                        <ul class="toolbar-dropdown lang-dropdown w-180">
                            <li><a href="https://wa.me/79031513344?text=LATERES.ru"><i class="flag-icon"><img src="assets/tpl/web/img/flags/WA.png" alt="WhatsApp"></i>&nbsp;WhatsApp</a></li>
                            <li><a href="https://teleg.run/lateres_sale"><i class="flag-icon"><img src="assets/tpl/web/img/flags/TM.png" alt="Telegram"></i>&nbsp;Telegram</a></li>
                            <li><a href="#"><i class="icon-message-square"></i>&nbsp;Задать вопрос</a></li>
                            <div class="dropdown-divider"></div>
                            <li><a href="#">Сообщить об ошибке</a></li>
                            <li><a href="#">Оставить отзыв</a></li>
                            <li><a href="#">Служба поддержки</a></li>
                        </ul>
                    </div>
        
                    <div class="toolbar-item hidden-on-mobile">
                        <a href="{201 | url}">
                          <div><span class="compare-icon"><i class="icon-heart"></i><span class="count-label msp-cart-favorite-count d-none">0</span></span><span class="text-label">Избранное</span></div>
                        </a>
                    </div>
        
                    {$miniCart}
    
                    <div class="toolbar-item visible-on-mobile mobile-menu-toggle"><a href="#">
                        <div><i class="icon-menu"></i><span class="text-label">Меню</span></div></a>
                    </div>
          
                    {if $_modx->user.id > 0 && $_modx->hasSessionContext('web') > 0}
                        <div class="toolbar-item hidden-on-mobile">
                            {if $_modx->isMember('Users')}
                                <a href="{123 | url}">
                                    <div>
                                        <i class="icon-user"></i><span class="text-label">Профиль</span>
                                        {if $.session.twoauth}
                                            <span class="icon-alert-circle text-warning" title="Вход"></span>
                                        {/if}
                                    </div>
                                </a>
                                <div class="toolbar-dropdown text-center px-3">
                                    <p class="text-xs mb-3 pt-2">Привет, <strong>{$_modx->user.fullname}</strong> !</p>
                                    {$UserMenu}
                                    {if $.session.twoauth}
                                        <a href="#" class="btn btn-warning btn-sm btn-block ulgn-user-auth" data-user="{$.session.twoauthbyuser}">Вернуться в профиль</a>
                                    {/if}
                                    <a class="btn btn-primary btn-sm btn-block" href="/?service=logout">Выйти</a>
                                </div>
                            {elseif $_modx->isMember('Staff')}  
                                <a href="{351 | url}">
                                    <div>
                                        <i class="icon-user"></i><span class="text-label">Сотрудник</span>
                                        {if $.session.twoauth}
                                            <span class="icon-alert-circle text-warning" title="Вход"></span>
                                        {/if}
                                    </div>
                                </a>
                                <div class="toolbar-dropdown text-center px-3">
                                    <p class="text-xs mb-3 pt-2">Привет, <strong>{$_modx->user.fullname}</strong> !</p>
                                    <nav class="list-group">
                                        <a class="list-group-item list-group-item-action" href="{266 | url}">Заказы</a>
                                        <a class="list-group-item list-group-item-action" href="{317 | url}">Товары</a>
                                        <a class="list-group-item list-group-item-action" href="{318 | url}">Добавить</a>
                                    </nav>          
                                    <a class="btn btn-primary btn-sm btn-block" href="/?service=logout">Выйти</a>
                                </div>
                            {else}
                                <a href="{123 | url}">
                                    <div><i class="icon-user"></i><span class="text-label">Профиль</span></div>
                                </a>
                                <div class="toolbar-dropdown text-center px-3">
                                    <p class="text-xs mb-3 pt-2">Привет, <strong>{$_modx->user.fullname}</strong> !</p>
                                    {$UserMenu}
                                    <a class="btn btn-primary btn-sm btn-block" href="/?service=logout">Выйти</a>
                                </div>
                            {/if}
                            
                        </div>
                    {else}     
                        <div class="toolbar-item hidden-on-mobile">
                            <a href="{125|url}">
                                <div><i class="icon-user"></i><span class="text-label">Вход / Рег.</span></div>
                            </a>
                            <div class="toolbar-dropdown text-center px-3">
                                <p class="text-xs mb-3 pt-2">Здравствуйте!<br/>Для совершения покупок авторизуйтесь в системе</p>
                                <a class="btn btn-primary btn-sm btn-block" href="{125|url}">{125 | resource : 'pagetitle'}</a>
                                <p class="text-xs text-muted mb-2">Новый клиент?&nbsp;<a href="{109 | url}">{109 | resource : 'pagetitle'}</a></p>
                            </div>
                        </div>
                    {/if}
          
                </div>
            </div>
        </div> 
    </div> *}
    
</header>

<!-- If Not Mobile -->
{if !$.client.is_mobile}
    <section class="py-2 d-none" style="border-bottom: 1px solid #dddfe2;">
        <div class="container">
            <div class="d-flex justify-content-between">
                <div class="btn-group categories-btn">
                    <button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"><i class="icon-menu text-lg"></i>&nbsp;Товары & Услуги</button>
                    <div class="dropdown-menu mega-dropdown">
                        {* <div class="row">
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{9 | url}"><img src="assets/tpl/web/img/shop/categories/blocks-140.jpg" title="{9 | resource: 'pagetitle'}" alt="{9 | resource: 'pagetitle'}"><span class="text-gray-dark">{9 | resource: 'pagetitle'}</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{16 | url}"><img src="assets/tpl/web/img/shop/categories/tile-140.jpg" title="{16 | resource: 'pagetitle'}" alt="{16 | resource: 'pagetitle'}"><span class="text-gray-dark">{16 | resource: 'pagetitle'}</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{18 | url}"><img src="assets/tpl/web/img/shop/categories/border-140.jpg" title="{18 | resource: 'pagetitle'}" alt="{18 | resource: 'pagetitle'}"><span class="text-gray-dark">{18 | resource: 'pagetitle'}</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{294 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/brick-140.jpg" title="{294 | resource: 'pagetitle'}" alt="{294 | resource: 'pagetitle'}"><span class="text-gray-dark">{294 | resource: 'pagetitle'}</span></a></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{250 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/cement-140.jpg" title="{250 | resource: 'pagetitle'}" alt="{250 | resource: 'pagetitle'}"><span class="text-gray-dark">{250 | resource: 'pagetitle'} по 50 кг</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{251 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/materials-140.jpg" title="{251 | resource: 'pagetitle'}" alt="{251 | resource: 'pagetitle'}"><span class="text-gray-dark">{251 | resource: 'pagetitle'}</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{257 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/laying-tiles-140.jpg" title="{257 | resource: 'pagetitle'}" alt="{257 | resource: 'pagetitle'}"><span class="text-gray-dark">{257 | resource: 'pagetitle'}</span></a></div>
                            <div class="col-sm-3"><a class="d-block navi-link text-center mb-30" href="{137 | url}"><img class="d-block" src="assets/tpl/web/img/shop/categories/manipulator-140.jpg" title="{137 | resource: 'pagetitle'}" alt="{137 | resource: 'pagetitle'}"><span class="text-gray-dark">{137 | resource: 'pagetitle'}</span></a></div>
                        </div> *}
                    </div>
          
                </div>
                
                {* {$categories} *}
            </div>
        </div>
    </section>
{/if}