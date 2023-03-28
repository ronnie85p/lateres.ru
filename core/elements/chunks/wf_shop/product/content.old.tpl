{var $discount = (( $_modx->resource.old_price - $_modx->resource.price ) / $_modx->resource.old_price ) * 100}
{var $grpar = $_modx->resource.parent | resource : 'parent' | resource : 'parent'}
{var $par = $_modx->resource.parent | resource : 'parent'}
{set $ReviewCount = $_modx->runSnippet('!ecMessagesCount', [
])}
{set $QuestionCount = $_modx->runSnippet('!ecMessagesCount', [
  'thread' => 'question-' ~ $_modx->resource.id,
])}
{set $ecThreadRating = $_modx->runSnippet('!ecThreadRating', [
  'tpl'  => '2019.tpl.ecThreadRating',
])}

{set $hasfavorite = $modx->getObject('mspFavorite', ['user_id' => $_modx->user.id, 'resource' => $_modx->resource.id])}
            
{if $_modx->config.isUserTest}
  {set $item = '!mspCartItem' | snippet : [
    'product_id' => $_modx->resource.id
  ]}
{else}
  {set $item = '!getCartItems' | snippet : [
    'product_id' => $_modx->resource.id
  ]}
{/if}
            
<div id="msProduct" class="row" data-product-id="{$_modx->resource.id}">

  <!-- Poduct Gallery-->
  {* <div class="col-md-6">
    <div class="product-gallery">
      <div class="gallery-wrapper">
        {if $_modx->resource.youtube}
          <div class="gallery-item video-btn text-center">
            <a href="#" data-toggle="tooltip" data-type="video" data-video="&lt;div class=&quot;wrapper&quot;&gt;&lt;div class=&quot;video-wrapper&quot;&gt;&lt;iframe class=&quot;pswp__video&quot; width=&quot;960&quot; height=&quot;640&quot; src=&quot;https://www.youtube.com/embed/GfTBEZP09D8&quot; frameborder=&quot;0&quot; allowfullscreen&gt;&lt;/iframe&gt;&lt;/div&gt;&lt;/div&gt;" title="Видео Обзор"></a>
          </div>
        {/if}
      </div>
      <span class="product-badge bg-danger">Скидка {$discount | number : 0 : '.' : ' '} %</span>
      <div class="product-carousel owl-carousel gallery-wrapper">
        {if $_modx->resource.img}
          {if $_modx->resource.img | match:"*imgs.*"}
            <div class="gallery-item" data-hash="one">
              <a href="{$_modx->resource.img}" data-size="1000x666">
                <img itemprop="image" src="{$_modx->resource.img}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="one">
              <a href="{$_modx->resource.img | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img itemprop="image" src="{$_modx->resource.img | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
        {if $_modx->resource.img_1}
          {if $_modx->resource.img_1 | match:"*imgs.*"}
            <div class="gallery-item" data-hash="two">
              <a href="{$_modx->resource.img_1}" data-size="1000x666">
                <img src="{$_modx->resource.img_1}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="two">
              <a href="{$_modx->resource.img_1 | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img src="{$_modx->resource.img_1 | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
        {if $_modx->resource.img_2}
          {if $_modx->resource.img_2 | match:"*imgs.*"}
            <div class="gallery-item" data-hash="three">
              <a href="{$_modx->resource.img_2}" data-size="1000x666">
                <img src="{$_modx->resource.img_2}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="three">
              <a href="{$_modx->resource.img_2 | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img src="{$_modx->resource.img_2 | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
        {if $_modx->resource.img_3}
          {if $_modx->resource.img_3 | match:"*imgs.*"}
            <div class="gallery-item" data-hash="four">
              <a href="{$_modx->resource.img_3}" data-size="1000x666">
                <img src="{$_modx->resource.img_3}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="four">
              <a href="{$_modx->resource.img_3 | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img src="{$_modx->resource.img_3 | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
        {if $_modx->resource.img_4}
          {if $_modx->resource.img_4 | match:"*imgs.*"}
            <div class="gallery-item" data-hash="five">
              <a href="{$_modx->resource.img_4}" data-size="1000x666">
                <img src="{$_modx->resource.img_4}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="five">
              <a href="{$_modx->resource.img_4 | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img src="{$_modx->resource.img_4 | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
        {if $_modx->resource.img_5}
          {if $_modx->resource.img_5 | match:"*imgs.*"}
            <div class="gallery-item" data-hash="six">
              <a href="{$_modx->resource.img_5}" data-size="1000x666">
                <img src="{$_modx->resource.img_5}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {else}
            <div class="gallery-item" data-hash="six">
              <a href="{$_modx->resource.img_5 | phpthumbon : 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|'}" data-size="1000x667">
                <img src="{$_modx->resource.img_5 | phpthumbon : 'w=1000&h=666&q=90&bg=ffffff&iar=1&fltr[]=wmi|assets/tpl/web/water-sm.png|C|50|5|5|'}" alt="{$_modx->resource.pagetitle}">
              </a>
            </div>
          {/if}
        {/if}
      </div>
      <ul class="product-thumbnails">
        {if $_modx->resource.img}
          {if $_modx->resource.img | match:"*imgs.*"}
            <li class="active"><a href="{$_modx->makeUrl($_modx->resource.id)}#one"><img src="{$_modx->resource.thumb}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li class="active"><a href="{$_modx->makeUrl($_modx->resource.id)}#one"><img src="{$_modx->resource.img | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
        {if $_modx->resource.img_1}
          {if $_modx->resource.img_1 | match:"*imgs.*"}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#two"><img src="{$_modx->resource.thumb_1}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#two"><img src="{$_modx->resource.img_1 | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
        {if $_modx->resource.img_2}
          {if $_modx->resource.img_2 | match:"*imgs.*"}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#three"><img src="{$_modx->resource.thumb_2}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#three"><img src="{$_modx->resource.img_2 | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
        {if $_modx->resource.img_3}
          {if $_modx->resource.img_3 | match:"*imgs.*"}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#four"><img src="{$_modx->resource.thumb_3}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#four"><img src="{$_modx->resource.img_3 | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
        {if $_modx->resource.img_4}
          {if $_modx->resource.img_4 | match:"*imgs.*"}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#five"><img src="{$_modx->resource.thumb_4}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#five"><img src="{$_modx->resource.img_4 | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
        {if $_modx->resource.img_5}
          {if $_modx->resource.img_5 | match:"*imgs.*"}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#six"><img src="{$_modx->resource.thumb_5}" alt="{$_modx->resource.pagetitle}"></a></li>
          {else}
            <li><a href="{$_modx->makeUrl($_modx->resource.id)}#six"><img src="{$_modx->resource.img_5 | phpthumbon : 'w=188&h=134&q=90&zc=1'}" alt="{$_modx->resource.pagetitle}"></a></li>
          {/if}
        {/if}
      </ul>
    </div>
  </div> *}
  
  <!-- Product Info-->
  <div class="col-md-6">
    <div class="padding-top-2x mt-2 hidden-md-up"></div>
    <div class="sp-categories pb-3">
      <i class="icon-tag"></i>
      <a href="{$_modx->makeUrl($grpar)}">{$grpar | resource : 'pagetitle'}</a>, 
      <a href="{$_modx->makeUrl($par)}">{$par | resource : 'pagetitle'}</a>, 
      <a href="{$_modx->makeUrl($_modx->resource.parent)}">{$_modx->resource.parent | resource : 'pagetitle'}</a></div>
      <h1 itemprop="name" class="h3 mb-1">{$_modx->resource.longtitle}</h1>
      <hr class="mb-2">
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="px-2 py-1">{$ecThreadRating}</div>
        <div class="px-2 py-1"><a href="#review" class="scroll-to">{$ReviewCount} отзывов</a></div>
        <div class="px-2 py-1"><a href="#question" class="scroll-to">{$QuestionCount} вопросов </a></div>
        <div class="px-2 py-1"><span class="">Просмотры: [[+viewsForAll]] (сегодня: +[[+viewsForDay]])</span></div>
      </div>
      <hr class="mt-2 mb-2">
      <span class="h3 d-block" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <span itemprop="price" content="{$_modx->resource.price| number : 2 : '.' : ''}">{$price}</span> <span itemprop="priceCurrency" content="RUB">{'ms2_frontend_currency' | lexicon}</span> / {$_modx->resource.count_unit}
        <span class="text-muted h6">(Мин. заказ - {if $_modx->resource.parent == 257}10{else}1{/if} {$_modx->resource.count_unit})</span> 
        <br/><del class="text-muted h6">{$old_price} {'ms2_frontend_currency' | lexicon}</del> <span class="text-info h6">Экономия: {$discount | number : 0 : '.' : ' '} %</span>
        <link itemprop="availability" href="https://schema.org/InStock">
      </span>
      <meta itemprop="description" content="{$_modx->resource.description}">
      <div class="d-flex flex-wrap justify-content-between align-items-center pb-2">
        <div class="px-2 py-1"><span class="text-muted">Вес брутто:</span> <span class="text-gray-dark">{$weight} [[%ms2_frontend_weight_unit]]</span></div>
        <div class="px-2 py-1"><span class="text-muted">Цвет:</span> <span class="text-gray-dark">{$_modx->resource.color_product}</span></div>
        <div class="px-2 py-1"><span class="text-muted">Остаток:</span> <span class="text-gray-dark">___</span></div>
        <div class="px-2 py-1"><span class="text-muted">Поддон:</span> <span class="text-gray-dark">150 руб. (залог)</span></div>
      </div>
      <div class="row align-items-end pb-4">
        <div class="col-sm-6">
          <div class="pt-4 hidden-sm-up"></div>
          
          {if $_modx->config.isUserTest}
          
            <a href="#" class="btn btn-primary product-button msp-btn m-0 btn-block{$item.count > 0 ? ' d-none' : ''}" data-action="cart/add" data-product-id="{$_modx->resource.id}" data-from="page">
              <i class="icon-shopping-cart mr-1"></i><span>В Корзину</span>
            </a>
          
            <form class="msp-cart-count-form{!$item.count ? ' d-none' : ''}" data-from="page">
              <input type="hidden" name="key" value="{$_modx->resource.id | md5}" />
              <div class="text-warning mb-2 text-lg">В корзине</div>
              <p class="d-block mb-2 text-lg">
                <label class="pr-2" for="count">Кол-во:</label> 
                <input  type="number" name="count" value="{$item.count}" 
                style="width: 150px; border: none; border-bottom: 1px solid silver; padding: 5px" min="0">&nbsp;{$_modx->resource.id | resource : 'count_unit'}        
              </p>
            </form>
          
          {else}
            
            <a href="#" class="btn btn-primary product-button cart-btn m-0 btn-block{$item.count > 0 ? ' d-none' : ''}" data-action="add" data-prod-id="{$_modx->resource.id}">
              <i class="icon-shopping-cart mr-1"></i><span>В Корзину</span>
            </a>
          
            <form class="cart-form in-cart{!$item.count ? ' d-none' : ''}" name="cart_count" data-prod-id="{$_modx->resource.id}">
              <input type="hidden" name="action" value="cart/change">
              <input type="hidden" name="key" value="{$_modx->resource.id | md5}" />
              <input type="hidden" name="prod_id" value="{$_modx->resource.id}">
              <div class="text-warning mb-2 text-lg">В корзине</div>
              <p class="d-block mb-2 text-lg">
                <label class="pr-2" for="count">Кол-во:</label> 
                <input  type="number" name="count" value="{$item.count}" 
                style="width: 150px; border: none; border-bottom: 1px solid silver; padding: 5px" min="0">&nbsp;{$_modx->resource.id | resource : 'count_unit'}        
              </p>
            </form>
            
          {/if}
          
        </div>
        <div class="col-sm-6">
          <div class="pt-4 hidden-sm-up"></div>
          <a href="#" class="btn btn-success btn-block m-0" data-toggle="modal" data-target="#modalMessage"><i class="icon-mail mr-1"></i><span>Сообщение</span></a>
        </div>
      </div>
      <h5>Способы получения товара</h5>
      <p class="text-muted">Минимальная сумма заказа 100 руб. Доставка транспортом компании (манипулятор, шаланда или малотоннажный транспорт) и Самовывоз по адресу производства. <span class="text-info">Для расчёта доставки положите товар в корзину и перейдите по ссылке в корзину, затем укажите адрес доставки. </span> <a href="{195 | url }#delivery" class="navi-link">Рассчитать</a></p>
      <h5>Сроки получения товара</h5>
      <p class="text-muted">В день заказа - если заказ сделан до 14:00, на следующий рабочий день - если заказ сделан после 14:00. <span class="text-info">В связи с загруженностью производства могут увеличиваться сроки изготовления на отдельные виды изделий до 6-9 дней.</span></p>
    <div class="pt-1 mb-4"><span class="text-medium">товар ID:</span> #{$_modx->resource.id}</div>
    <hr class="mb-2">
    <div class="d-flex flex-wrap justify-content-between">
      <div class="mt-2 mb-2">
        
        {if $_modx->config.isUserTest}
          <a class="btn btn-outline-secondary btn-sm msp-btn{$hasfavorite ? ' d-none' : ''}" data-action="favorite/add" data-product-id="{$_modx->resource.id}">
            <i class="icon-heart"></i>&nbsp;В избранное
      		</a>
      		<a class="btn btn-primary btn-sm msp-btn{!$hasfavorite ? ' d-none' : ''}" data-action="favorite/remove" data-product-id="{$_modx->resource.id}">
            <i class="icon-heart"></i>&nbsp;Убрать из избранного
      		</a>
      	{else}
      	   <a class="msfavorites btn btn-outline-secondary btn-sm btn-wishlist active d-none" data-click data-data-id="{$_modx->resource.id}" data-data-list="default">
  			    <span class="msfavorites-text-load d-none"><i class="icon-heart text-info"></i>&nbsp;Избранное</span>
      			<span class="msfavorites-text-add d-none"><i class="icon-heart mr-1"></i>&nbsp;Избранное</span>
      			<span class="msfavorites-text-remove"><i class="icon-heart text-primary mr-1"></i>&nbsp;Избранное</span>
      		</a> 
        {/if}
        
      </div>
      <div class="mt-2 mb-2"><span class="text-muted">Поделиться:&nbsp;&nbsp;</span>
        <script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
        <script src="https://yastatic.net/share2/share.js"></script>
        <div class="d-inline-block ya-share2" data-services="vkontakte,facebook,twitter,viber,whatsapp,telegram"></div>
      </div>
    </div>
  </div>
</div>



{var $par = $_modx->resource.parent | resource : 'parent'}
<!-- Product This Category -->
{set $ProductsCategory = $_modx->runSnippet('!msProducts', [
  'parents'     => $_modx->resource.parent,
  'resources'   => -$_modx->resource.id,
  'tpl'         => '@FILE chunks/product/tpl-2019-product-grid-v0.html',
  'where'       => [
                    'template' => 25,
                    'AND:img:IS NOT' => null,
                    ],
  'limit'       => 12,
  'depth'       => 6,
  'includeContent' => 1,
  'includeTVs'     => 'img,count_unit,thumb_sm',
  'tvPrefix'       => '',
  'sortby'         => 'publishedon',
  'sortdir'        => 'DESC',
  'showLog'        => 0,
])}

<!-- Recommended item in this category -->
{set $RecommendedItem = $_modx->runSnippet('!msProducts', [
  'parents'     => $par,
  'resources'   => -$_modx->resource.id,
  'tpl'         => '@FILE chunks/product/tpl-2019-product-widget-v2.html',
  'where'       => [
                    'template' => 25,
                    'AND:img:IS NOT' => null,
                    'Data.favorite'   => 1,
                    ],
  'limit'       => 1,
  'depth'       => 1,
  'includeContent' => 1,
  'includeTVs'     => 'img,count_unit,thumb_sm',
  'tvPrefix'       => '',
  'sortby'         => 'RAND()',
  'showLog'        => 0,
])}
<!-- Popular products in this category -->
{set $Popular = $_modx->runSnippet('!msProducts', [
  'parents'     => $par,
  'resources'   => -$_modx->resource.id,
  'tpl'         => '@FILE chunks/product/tpl-2019-product-widget-v1.html',
  'where'       => [
                    'template' => 25,
                    'AND:img:IS NOT' => null,
                    'Data.popular'   => 1,
                    ],
  'limit'       => 6,
  'depth'       => 6,
  'includeContent' => 1,
  'includeTVs'     => 'img,count_unit,thumb_xs',
  'tvPrefix'       => '',
  'sortby'         => 'RAND()',
  'showLog'        => 0,
])}
{set $ProductsV1 = $_modx->runSnippet('!msProducts', [
  'parents'     => '5,-252',
  'resources'   => -$_modx->resource.id,
  'tpl'         => '@FILE chunks/product/tpl-2019-product-grid-v0.html',
  'where'       => '{"template":"25","img:IS NOT":null}',
  'limit'       => 36,
  'depth'       => 6,
  'includeContent' => 1,
  'includeTVs'     => 'img,count_unit,thumb_sm',
  'tvPrefix'       => '',
  'sortby'         => 'publishedon',
  'sortdir'        => 'DESC',
  'showLog'        => 0,
])}

<style>
  .preloader {
    display: none; 
    position: absolute; 
    z-index: 12345;
    top: 0; 
    bottom: 0; 
    right: 0; 
    left: 0; 
    background: rgba(255 255 255 / .5)
  }
  .preloader .preloader-dialog {
    width: 300px; 
    /* background: #fff; */ 
    padding: 35px; 
    margin: auto
  }
  .preloader .preloader-content {
    text-align: center;
  }
  .preloader.show {
    display: flex;
  }
</style>

<!-- Product Details-->
<div class="bg-secondary padding-top-3x padding-bottom-2x mb-3" id="details">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        
        {if $_modx->user.id == 5}
          
          <form class="msp-form">
            <input type="hidden" name="action" value="cart/add" />
            <input type="hidden" name="prod_id" value="{$_modx->resource.id}" />
            <button class="btn btn-primary" type="submit">Добавить в корзину</button>  
          </form>
          
        {/if}
        
        <h3 class="h4">Описание:</h3>
        {$_modx->resource.content}
        <h4 class="h6">Сертификаты и Документация:</h4>
        {set $a = ["290","289","22","294"]}
        {set $b = ["246","247","273","263"]}
        {if $_modx->resource.parent in list $a}
        <div class="media mb-4">
          <img class="d-flex rounded align-self-start mr-4" src="{$_modx->runSnippet('!phpthumbon', [
               'input'   => '/assets/tpl/web/img/docs/gost6133-99-do-26-12-2019.jpg',
               'options' => 'w=90&h=120&zc=1',
               ])}" width="64" alt="{$_modx->resource.pagetitle}">
               
          <div class="media-body">
            <h6 class="mt-0 mb-1">Соответствие ГОСТ 6133-99</h6>
            <span class="d-block text-sm text-muted">Материалы стеновые, маркировка LATERES, марка прочности: М50, М75, М100, М125, М150, М200</span>
            <a href="{$_modx->runSnippet('!phpthumbon', [
                 'input'   => '/assets/tpl/web/img/docs/gost6133-99-do-26-12-2019.jpg',
                 'options' => 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|',
                 ])}" class="navi-link" target="_blank">Скачать</a>

          </div>
        </div>
        {elseif $_modx->resource.parent in list $b}
        <div class="media mb-4">
          <img class="d-flex rounded align-self-start mr-4" src="{$_modx->runSnippet('!phpthumbon', [
               'input'   => '/assets/tpl/web/img/docs/gost6133-99-do-26-12-2019.jpg',
               'options' => 'w=90&h=120&zc=1',
               ])}" width="64" alt="{$_modx->resource.pagetitle}">
               
          <div class="media-body">
            <h6 class="mt-0 mb-1">Соответствие ГОСТ 17608-91</h6>
            <span class="d-block text-sm text-muted">Плиты бетонные тротуарные типа Ф, К, П, Ш и ЭДД (камни бордюрные дорожные, бортовые, садовые; тротуарная плитка) из бетона c прочностью на сжатие: В22,5; В25; В30; В35 и с прочностью на растяжение при изгибе Ввtв 3,2; Ввtв 3,6; Ввtв 4,0; Ввtв 4,4 и с маркой бетона по морозостойкости F200</span>
            <a href="{$_modx->runSnippet('!phpthumbon', [
                 'input'   => '/assets/tpl/web/img/docs/gost17608-91-do-17-07-2020.jpg',
                 'options' => 'fltr[]=wmi|assets/tpl/web/water-lg.png|C|50|5|5|',
                 ])}" class="navi-link" target="_blank">Скачать</a>

          </div>
        </div>
        {/if}
        <h3 class="h6">Предложения в этой категории:</h3>
        <hr class="mb-3">
        <!-- Carousel-->
        <div class="owl-carousel mb-2" data-owl-carousel="{ &quot;nav&quot;: false, &quot;dots&quot;: true, &quot;margin&quot;: 30, &quot;responsive&quot;: { &quot;0&quot;:{ &quot;items&quot;:2 },&quot;576&quot;:{ &quot;items&quot;:2},&quot;768&quot;:{ &quot;items&quot;:3 },&quot;991&quot;:{ &quot;items&quot;:4 },&quot;1200&quot;:{ &quot;items&quot;:5 }} }">
          {$ProductsCategory}
        </div>
        <h3 class="h4 padding-top-1x">Возврат товара</h3>
        <p class="mb-1">Если товар имеет брак, то вы можете вернуть или обменять товар в течение 14 дней с момента приобретения.</p>
        <p class="text-muted text-xs mt-1">Внимание! Действительный цвет и текстура товаров могут незначительно отличаться от их изображений, представленных на сайте. Данные о ценах и наличии товаров находятся в режиме тестирования. Пожалуйста, уточняйте точную стоимость и наличие товаров на сладе. Они могут отличаться от опубликованных на сайте.</p>
        <div class="row padding-top-1x">
          <div class="col-md-6">
            <h3 class="h4">Характеристики:</h3>
            <ul class="list-unstyled mb-4">
              {if $weight?}<li><strong>Вес (брутто) 1 {$_modx->resource.count_unit}:</strong> {$weight} кг</li>{/if}
              {if $_modx->resource.size_product?}<li><strong>Размер:</strong> 	{$_modx->resource.size_product} мм</li>{/if}
              {if $_modx->resource.color_product?}<li><strong>Цвет:</strong> {$_modx->resource.color_product}</li>{/if}
              {if $_modx->resource.brand_strength?}<li><strong>Марка прочности:</strong> {$_modx->resource.brand_strength}</li>{/if}
              {if $_modx->resource.quantity_pallet?}<li><strong>Кол-во в поддоне:</strong> {$_modx->resource.quantity_pallet}</li>{/if}
              {if $_modx->resource.extra_field_name?}<li><strong>{$_modx->resource.extra_field_name}:</strong> {$_modx->resource.extra_field_value}</li>{/if}
            </ul>
          </div>
          <div class="col-md-6">
            <h3 class="h4">Получения товара:</h3>
            <ul class="list-unstyled mb-4">
              <li><strong>Самовывоз:</strong> 1 - 2 дня</li>
              <li><strong>Манипулятор:</strong> 1 - 2 дня</li>
              <li><strong>Шаланда:</strong> 1 - 5 дней</li>
            </ul>
          </div>
        </div>
        <h3 class="h4">Наши гарантии:</h3>
        <p class="mb-1">Мы гарантируем соответствие изделий требованиям ГОСТ при соблюдении условий транспортирования, монтажа, эксплуатации и хранения.</p>
        <p class="text-muted text-xs mt-1">Согласно п.2 ст.34 Технического регламента о безопасности зданий и сооружений, Федеральный закон от 30.12.2009 N 384-ФЗ, "Строительные материалы и изделия должны соответствовать требованиям, установленным в соответствии с законодательством Российской Федерации о техническом регулировании".<br/>Согласно ст.470 ГК РФ продолжительность договорных гарантий качества определяется гарантийными сроками. Гарантийный срок представляет собой установленный изготовителем товара или соглашением сторон период времени, в течение которого товар должен быть пригодным для целей его обычного использования.</p>
        {if $_modx->resource.img_6 != null || $_modx->resource.img_7 != null || $_modx->resource.img_8 != null || $_modx->resource.img_9 != null}
          <h3 class="h4">Фотографии:</h3>
          <div class="gallery-wrapper">
            <div class="row">
              {if $_modx->resource.img_6 != null}
              <div class="col-6 col-sm-3">
                <div class="gallery-item"><a href="{$_modx->resource.img_6}" data-size="1000x666"><img src="{$_modx->resource.img_6}" alt="{$_modx->resource.pagetitle}"></a><span class="caption">{$_modx->resource.pagetitle}</span></div>
              </div>
              {/if}
              {if $_modx->resource.img_7 != null}
              <div class="col-6 col-sm-3">
                <div class="gallery-item"><a href="{$_modx->resource.img_7}" data-size="1000x666"><img src="{$_modx->resource.img_7}" alt="{$_modx->resource.pagetitle}"></a><span class="caption">{$_modx->resource.pagetitle}</span></div>
              </div>
              {/if}
              {if $_modx->resource.img_8 != null}
              <div class="col-6 col-sm-3">
                <div class="gallery-item"><a href="{$_modx->resource.img_8}" data-size="1000x666"><img src="{$_modx->resource.img_8}" alt="{$_modx->resource.pagetitle}"></a><span class="caption">{$_modx->resource.pagetitle}</span></div>
              </div>
              {/if}
              {if $_modx->resource.img_9 != null}
              <div class="col-6 col-sm-3">
                <div class="gallery-item"><a href="{$_modx->resource.img_9}" data-size="1000x666"><img src="{$_modx->resource.img_9}" alt="{$_modx->resource.pagetitle}"></a><span class="caption">{$_modx->resource.pagetitle}</span></div>
              </div>
              {/if}
            </div>
          </div>
          {/if}
      </div>
      
      <div class="col-md-4">
        <div class="row"> 
          {$RecommendedItem}
          <div class="col-md-12">
            <div class="widget widget-featured-products">
              <h3 class="widget-title">Популярные товары в разделе</h3>
              {$Popular}
              <a class="btn btn-outline-secondary btn-sm mb-0" href="{$par | url}">Ещё товары</a>
            </div>
          </div>
          
          
          {'!getCategories' | snippet : [
            'ids' => $_modx->resource.parent,
            'tpl.category' => 'assets/plugins/getcategories/tpls/tpl.category.product.html',
            'tpl.product' => 'assets/plugins/getcategories/tpls/tpl.product.html'
          ]}
        </div>
      </div>
    </div>
    <h3 class="h6">Наши Клиенты смотрят также:</h3>
    <hr class="mb-3">
    <!-- Carousel-->
    <div class="owl-carousel" data-owl-carousel="{ &quot;nav&quot;: false, &quot;dots&quot;: true, &quot;margin&quot;: 30, &quot;responsive&quot;: { &quot;0&quot;:{ &quot;items&quot;:2 },&quot;576&quot;:{ &quot;items&quot;:2},&quot;768&quot;:{ &quot;items&quot;:3 },&quot;991&quot;:{ &quot;items&quot;:5 },&quot;1200&quot;:{ &quot;items&quot;:6 }} }">
      {$ProductsV1}
    </div>
    <hr class="margin-top-2x">
    <div class="row margin-top-2x">
      <div class="col-md-7">
        <div class="display-3 mb-30">Остались вопросы?</div>
      </div>
      <div class="col-md-5">
        <ul class="list-icon">
          <li> <i class="icon-send text-success"></i><a href="#" class="navi-link" data-toggle="modal" data-target="#modalMessage">Задать вопрос</a></li>
          <li> <i class="icon-phone text-primary"></i><a href="tel:+79031513344" class="navi-link">+7 (903) 151-3344</a></li>
          <li> <i class="icon-mail text-info"></i><a class="navi-link" href="mailto:sale@lateres.ru">sale@lateres.ru</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>