{* <link rel="stylesheet" href="assets/vendor/own-carousel/css/own-carousel.min.css" />
<script src="assets/vendor/own-carousel/js/own-carousel.min.js"></script> *}

{set $categories = [
  [
    'class' => 'active',
    'id' => 16,
    'min_price' => 390,
    'unit' => 'кв.м',
    'image' => 'assets/tpl/web/img/shop/categories/tile-216.jpg'
  ],
  [
    'id' => 9,
    'min_price' => 35,
    'unit' => 'шт.',
    'image' => 'assets/tpl/web/img/shop/categories/blocks-216.jpg'
  ],
  [
    'id' => 250,
    'min_price' => 340,
    'unit' => 'меш.',
    'image' => 'assets/tpl/web/img/shop/categories/cement-216.jpg'
  ],
  [
    'id' => 257,
    'min_price' => 700,
    'unit' => 'кв.м.',
    'image' => 'assets/tpl/web/img/shop/categories/laying-tiles-216.jpg'
  ],
  [
    'id' => 137,
    'min_price' => 1500,
    'unit' => 'час',
    'image' => 'assets/tpl/web/img/shop/categories/manipulator-216.jpg'
  ]
]}

<div data-slick='{ 
  "dots": true,
  "draggable": false,
  "infinite": false,
  "speed": 300,
  "slidesToShow": 1,
  "centerMode": false,
  "variableWidth": true
}'>

  {foreach $categories as $category}
    <div class="card mr-2">
      <div class="card-body">
        <a class="flex-wrap flex-lg-nowrap" href="{$category.id | url}">
          <div class="align-self-center">
            <h2 class="category-card-title fw-6">{$category.id | resource: 'pagetitle'}</h2>
            <h3 class="text-gray-dark mb-1">от {$category.min_price} руб./{$category.unit}</h3>
            <p class="d-inline-block bg-danger text-white mt-3">&nbsp;Купить сейчас&nbsp;<i class="icon-chevron-right d-inline-block align-middle"></i>&nbsp;</p>
          </div>
          <div class="category-card-thumb"><img src="{$category.image}" alt="{$category.id | resource: 'pagetitle'}"></div>
        </a>
      </div>
    </div> 
  {/foreach}
</div>

<div class="slider" id="popular-categories" style="height: 250px; overflow: hidden; position: relative">
  {* <div class="carousel-inner"> *}

  {* <div class="slider-inner d-flex align-items-start" style="width: 200%;">

      {foreach $categories as $category}
        <div class="mr-2 card slider-item" style="width: 300px; height: 250px; display: inline-block">
          <a class="flex-wrap flex-lg-nowrap" href="{$category.id | url}">
            <div class="category-card-info align-self-center">
              <h2 class="category-card-title fw-6">{$category.id | resource: 'pagetitle'}</h2>
              <h3 class="text-gray-dark mb-1">от {$category.min_price} руб./{$category.unit}</h3>
              <p class="d-inline-block bg-danger text-white mt-3">&nbsp;Купить сейчас&nbsp;<i class="icon-chevron-right d-inline-block align-middle"></i>&nbsp;</p>
            </div>
            <div class="category-card-thumb"><img src="{$category.image}" alt="{$category.id | resource: 'pagetitle'}"></div>
          </a>
        </div> 
      {/foreach}

  </div> *}

    {* <button class="slider-prev" type="button" style="
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: #f6f6f6;
      border: none;
      box-shadow: 5px 0px 9px #4f4f4f4f;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
      </svg>
      <span class="visually-hidden">Previous</span>
    </button>

    <button class="slider-next" type="button" style="
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background: #f6f6f6;
      border: none;
      box-shadow: -5px 0px 9px #4f4f4f4f;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
      </svg>
      <span class="visually-hidden">Next</span>
    </button> *}

  {* </div> *}
</div>
