<!-- Site Footer-->
<footer class="site-footer" style="background-image_: url(assets/tpl/web/img/footer-bg.png);">
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-6">
      <!-- Categories-->
      <section class="widget widget-links widget-light-skin">
        <h3 class="widget-title">Каталог Товаров и Услуг</h3>
        <div class="row">
          <div class="col-md-6">
            {'pdoMenu' | snippet : [
              'parents' => '0',
              'resources' => '122, 121, 107, 123, 114, 115, 110',
              'tpl' => '@INLINE <li {$classes}><a href="{$link}" {$attributes}>{$menutitle | ucwords}</a></li>',
              'tplOuter' => '@INLINE <ul {$classes}>{$wrapper}</ul>'
            ]}
          </div>
          <div class="col-md-6">
            {'pdoMenu' | snippet : [
              'parents' => '0',
              'resources' => '118, 20, 105, 112, 113, 120, 119',
              'tpl' => '@INLINE <li {$classes}><a href="{$link}" {$attributes}>{$menutitle | ucwords}</a></li>',
              'tplOuter' => '@INLINE <ul {$classes}>{$wrapper}</ul>'
            ]} 
          </div>
        </div>
      </section>
    </div>
    <div class="col-lg-3 col-md-6">
      <!-- About Us-->
      <section class="widget widget-links widget-light-skin">
        <h3 class="widget-title">О Компании</h3>
        {'pdoMenu' | snippet : [
          'parents' => '0',
          'level' => '0',
          'resources' => '2, 4, 5, 9, 30, 10',
          'tpl' => '@INLINE <li {$classes}><a href="{$link}" {$attributes}>{$menutitle | ucwords}</a></li>',
          'tplOuter' => '@INLINE <ul {$classes}>{$wrapper}</ul>'
        ]} 
      </section>
    </div>
    <div class="col-lg-3 col-md-6">
      <!-- Account / Shipping Info-->
      <section class="widget widget-links widget-light-skin">
        <h3 class="widget-title">Профиль &amp; Условия Доставки</h3>
        <ul>
          {if $_modx->user.id > 0 && $_modx->hasSessionContext('web') > 0}
          <li><a href="{123 | url}">{123 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="{125 | url}">{125 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="{194 | url}">{194 | resource : 'pagetitle' | ucwords}</a></li>
          {else}
          <li><a href="#" data-toggle="modal" data-target="#modalLogin">{123 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="#" data-toggle="modal" data-target="#modalLogin">{125 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="{109 | url}">{109 | resource : 'pagetitle' | ucwords}</a></li>
          {/if}
          <li><a href="{118 | url}">{118 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="{203 | url}">{203 | resource : 'pagetitle' | ucwords}</a></li>
          <li><a href="{6 | url}">{6 | resource : 'pagetitle' | ucwords}</a></li>
        </ul>
      </section>
    </div>
  </div>
  <hr class="hr-light mt-2 margin-bottom-2x hidden-md-down">
  <div class="row">
    <div class="col-lg-3 col-md-6">
      <!-- Contact Info-->
      <section class="widget widget-light-skin">
        <h3 class="widget-title">Контактная информация</h3>
        <p class="text-white">Телефон: +7 (903) 151-3344</p>
        <p class="text-white">Телефон: +7 (495) 668-1069</p>
        <ul class="list-unstyled text-sm text-white">
          <li><span class="opacity-50">Пон.-Суб.:&nbsp;</span>9.00 - 20.00</li>
          <li><span class="opacity-50">Воскр.:&nbsp;</span>По предварит. записи</li>
        </ul>
        <p><a class="navi-link-light" href="mailto:sale@lateres.ru">sale@lateres.ru</a></p>
        <a class="social-button shape-circle sb-facebook sb-light-skin" href="https://www.facebook.com/lateres.ru/" target="_blank"><i class="socicon-facebook"></i></a>
        <a class="social-button shape-circle sb-twitter sb-light-skin" href="https://twitter.com/Lateres_Sale" target="_blank"><i class="socicon-twitter"></i></a>
        <a class="social-button shape-circle sb-instagram sb-light-skin" href="https://www.instagram.com/lateres.ru/" target="_blank"><i class="socicon-instagram"></i></a>
        <a class="social-button shape-circle sb-vk sb-light-skin" href="https://vk.com/lateres" target="_blank"><i class="socicon-vkontakte"></i></a>
      </section>
    </div>
    <div class="col-lg-3 col-md-6">
      <!-- Mobile App Buttons-->
      <section class="widget widget-light-skin">
        <h3 class="widget-title">Мобильное Приложение</h3>
        <a class="market-button apple-button mb-light-skin" href="#" data-toggle="modal" data-target="#modalSmall"><span class="mb-subtitle">Download on the</span><span class="mb-title">App Store</span></a>
        <a class="market-button google-button mb-light-skin" href="#" data-toggle="modal" data-target="#modalSmall"><span class="mb-subtitle">Download on the</span><span class="mb-title">Google Play</span></a>
        <a class="market-button windows-button mb-light-skin" href="#" data-toggle="modal" data-target="#modalSmall"><span class="mb-subtitle">Download on the</span><span class="mb-title">Windows Store</span></a>
      </section>
    </div>
    <div class="col-lg-6">
      <!-- Subscription-->
      <section class="widget widget-light-skin">
        <h3 class="widget-title">Будь Всегда В Курсе</h3>
        <form class="row" action="" method="post" target="_blank" novalidate>
          <div class="col-sm-9">
            <div class="input-group input-light">
              <input class="form-control" type="email" name="EMAIL" placeholder="Your e-mail"><span class="input-group-addon"><i class="icon-mail"></i></span>
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="" tabindex="-1">
            </div>
            <p class="form-text text-sm text-white opacity-50 pt-2">Подпишитесь на нашу рассылку, чтобы получать первым информацию о скидках, актуальных новостях, распродажах и о промо-акциях на продукцию.</p>
          </div>
          <div class="col-sm-3">
            <button class="btn btn-primary btn-block mt-0" type="submit">Подписаться</button>
          </div>
        </form>
        {* <div class="pt-3"><img class="d-block" style="width: 324px;" alt="Cerdit Cards" src="assets/tpl/web/img/credit-cards-footer.png"></div> *}
      </section>
    </div>
  </div>
  <!-- Copyright-->
  <p class="footer-copyright">Copyright &COPY; {'' | date : 'Y'} «LATERES.RU» WealFull, Inc or its affiliates - CA, USA. All rights reserved. &nbsp;<i class="icon-heart text-danger"></i><a href="/" target="_blank"> &nbsp;by WealFull, Inc</a></p>
  <div itemscope itemtype="https://schema.org/Organization">
    <span itemprop="name" content="Завод Латерес - вибропрессованные изделия из бетона"></span>
      <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <span itemprop="streetAddress" content="посёлок Смирновка, владение 2, строение 1"></span>
      <span itemprop="postalCode" content="141542"></span>
      <span itemprop="addressLocality" content="городской округ Солнечногорск"></span>
      <span itemprop="addressRegion" content="Московская область"></span>
    </div>
    <span itemprop="telephone" content="+7 903 151-33-44"></span>
    <span itemprop="telephone" content="+7 495 668-10-69"></span>,
    <span itemprop="email" content="sale@lateres.ru"></span>
  </div>
</div>
</footer>

