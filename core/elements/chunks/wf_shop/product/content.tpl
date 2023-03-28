{set $rating = 4.5}
{set $views_count = 2}
{set $views_for_day_count = 1}
{set $reviews_count = 7}
{set $questions_count = 12}

<style>
.form-control:focus {
    border: none!important;
    outline: 2px solid #ff4700
}
.form-control.is-invalid {
    border: none!important;
    outline: 2px solid #c33c08
}
.btn-icon {
    border-radius: 30px!important;
    padding: 0 10px!important;
    font-size: 1.2em;
    height: 35px!important;
    line-height: 32px!important;
}

body.rny-gallery-modal-shown {
    overflow: hidden;
}
body.rny-gallery-modal-shown .rny-gallery-modal {
    display: block
}

.rny-gallery {

}

.rny-gallery .rny-gallery-thumbnails .rny-gallery-thumbnail {
    margin-bottom: 10px!important;
    opacity: .5;
    overflow: hidden;
    border-left: 4px solid #fff;
    cursor: pointer
}

.rny-gallery .rny-gallery-thumbnails .rny-gallery-thumbnail.current {
    border-left: 4px solid #c33c08!important;
    opacity: 1!important
}

.rny-gallery .rny-gallery-thumbnails .rny-gallery-thumbnail:hover {
    border-left: 4px solid #c33c08!important;
    opacity: 1!important
}

.rny-gallery .rny-gallery-preview {
    position: relative;
    cursor: zoom-in
}

.rny-gallery .rny-gallery-prev, .rny-gallery .rny-gallery-next {
    padding: 1.5rem!important;
    top: 0;
    bottom: 0;
    position: absolute;
    cursor: pointer
}

.rny-gallery .rny-gallery-prev {
    left: 0;
}

.rny-gallery .rny-gallery-next {
    right: 0;
}

.rny-gallery-modal {
    position: fixed; 
    background: #fff; 
    top: 0; 
    bottom: 0; 
    right: 0; 
    left: 0;
    padding: 15px;
    z-index: 1234;
    display: none;
    overflow: auto!important
}
.rny-gallery-modal .btn-close {
    font-size: 3em;
    float: right;
    margin:  0!important
}

.rny-gallery-modal .btn-close:before {
    content: '\2715'
}
</style>

{set $features = '!getProductFeatures' | snippet : [
    'productId' => $_modx->resource.id,
    'tpl' => '@INLINE 
        <div class="col-6">
            <div class="row">
                <div class="col-6">{$caption}</div>
                <div class="col-6">{$value}</div>
            </div>
        </div>
    ',
    'tplWrapper' => '@INLINE <div class="row">{$output}</div>'
]}

{set $images = []}

{foreach 0..9 as $num}
    {set $key = 'img'}
    {set $current = true}
    {if $num > 0}
        {set $key = $key ~ '_' ~ $num}
        {set $current = false}
    {/if}
    {set $source = $_modx->resource[$key]}
    {set $thumbnail = $_modx->resource[$key]}
    {if $source}
        {set $images[] = [ 'current' => $current, 'src' => $source, 'thumbnail' => $thumbnail ]}
    {/if}
{/foreach}

{'!rgvResourceViewing' | snippet : [

]}

<div class="product" id="product-[[*id]]">

    <h1 style="font-size: 2em; font-weight: 400">[[*longtitle]]</h1>

    <div class="row mb-4">
        <div class="col-6">
            <span class="px-2 py-1">{$rating}</span>
            <a href="#review" class="scroll-to">{$reviews_count} отзывов</a>
            <a href="#question" class="scroll-to">{$questions_count} вопросов </a>
            <a href="#question" class="scroll-to">{$questions_count} заказов</a>
        </div>
        <div class="col-6 text-end">
            <span class="">Просмотры: {$views_count} (сегодня: +{$views_for_day_count})</span>
        </div>
    </div>

    <div class="card mb-2">

        <div class="card-body">

            <div class="row">
                <div class="col-8">

                    <div id="product-gallery" data-gallery='{
                        "images": {json_encode($images)}
                    }'></div>

                </div>

                <div class="col-4">
                    
                    <div class="h4 text-muted">Описание</div>
                    <p class="text-lg">[[*description]]</p>

                    <hr class="mt-2 margin-bottom-2x">

                    <div class="mt-4" style="">
                        <div class="text-muted"><strike>398.00 &#8381;</strike> <span class="text-danger">Скидка: -2%</span></div>
                        <div style="font-size: 2em; font-weight: 500">309.00 &#8381; за шт.</div>
                    </div>

                    <hr class="mt-2 margin-bottom-2x">

                    <div class="d-none">
                    <h5>Способы получения товара</h5>
                    <p class="text-muted">Минимальная сумма заказа 100 руб. 
                    Доставка транспортом компании (манипулятор, шаланда или малотоннажный транспорт) и Самовывоз 
                    по адресу производства. 
                    <span class="text-info">
                    Для расчёта доставки положите товар в корзину и перейдите по ссылке в корзину, затем укажите адрес доставки. </span> <a href="{195 | url }#delivery" class="navi-link">Рассчитать</a></p>
                    <h5>Сроки получения товара</h5>
                    <p class="text-muted">В день заказа - если заказ сделан до 14:00, на следующий рабочий день - если заказ сделан после 14:00. <span class="text-info">В связи с загруженностью производства могут увеличиваться сроки изготовления на отдельные виды изделий до 6-9 дней.</span></p>

                    </div>

                    <div class="">
                        <button class="btn btn-primary" type="button"><i class="icon-shopping-cart"></i> В корзину</button>
                        <button class="btn btn-primary" type="button"><i class="icon-shopping-"></i> Купить сейчас</button>
                        <button class="btn btn-outline-primary" type="button"><i class="icon-heart"></i></button>
                    </div>

                </div>
            </div>

        </div>

    </div>
    
<style>
.product-btns .btn {
    border-radius: 20px; 
    line-height: 20px; 
    height: 40px; 
    font-size: 1.3em;
    padding-top: 8px; padding-bottom: 8px
}
.product-btns .btn.active {
    outline: 1px solid black; 
}

</style>

    <div class="row margin-top-2x sticky-top" id="product-nav">
        <div class="col-12 product-btns">

            <a class="btn active" href="#content">Описание</a>
            <a class="btn nav-item" href="#features">Характеристики</a>
            <a class="btn nav-item" href="#previews">Отзывы</a>
            <a class="btn nav-item" href="#certs">Сертификаты и Документация</a>
            <button class="btn d-none">Преимущества</button>
            <button class="btn d-none">Возврат</button>
            <button class="btn d-none">Наши гарантии</button>

        </div>
    </div>

    <div class="row spy-container" data-spy-offset="20">

        <div class="col-8">

            <div class="card mb-2">

                <div class="card-body">

                    <h2 id="content" class="h4" style="font-weight: 500">Описание</h2>

                    [[*content]]

                </div>

            </div>

            <div class="card mb-2">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500">Преимущества</h2>

                    [[*benefits]]

                </div>

            </div>

            <div class="card mb-2 d-none">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500" id="certs">Сертификаты и Документация</h2>

                    {include ('file:' ~ $_modx->resource.certs_and_docs | replace : 'core/elements/': '')}

                </div>

            </div>

            <div class="card mb-2">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500">Возврат товара</h2>

                    <p class="mb-1">Если товар имеет брак, то вы можете вернуть или обменять товар в течение 14 дней с момента приобретения.</p>
                    <p class="text-muted text-xs mt-1">Внимание! Действительный цвет и текстура товаров могут незначительно отличаться от их изображений, представленных на сайте. Данные о ценах и наличии товаров находятся в режиме тестирования. Пожалуйста, уточняйте точную стоимость и наличие товаров на сладе. Они могут отличаться от опубликованных на сайте.</p>

                </div>

            </div>

            <div class="card mb-2">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500">Наши гарантии</h2>

                    <p class="mb-1">Мы гарантируем соответствие изделий требованиям ГОСТ при соблюдении условий транспортирования, монтажа, эксплуатации и хранения.</p>
                    <p class="text-muted text-xs mt-1">Согласно п.2 ст.34 Технического регламента о безопасности зданий и сооружений, Федеральный закон от 30.12.2009 N 384-ФЗ, "Строительные материалы и изделия должны соответствовать требованиям, установленным в соответствии с законодательством Российской Федерации о техническом регулировании".<br/>Согласно ст.470 ГК РФ продолжительность договорных гарантий качества определяется гарантийными сроками. Гарантийный срок представляет собой установленный изготовителем товара или соглашением сторон период времени, в течение которого товар должен быть пригодным для целей его обычного использования.</p>

                </div>

            </div>

            <div class="card mb-2">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500" id="features">Характеристики</h2>

                    <div class="row">
                        {$features}
                    </div>

                </div>

            </div>
            
            <div class="card mb-2">

                <div class="card-body">

                    <h2 class="h4" style="font-weight: 500" id="previews">Отзывы</h2>

                    <div class="d-flex">
                        <div class="" style="font-size: 3em">
                            4,6 / 5
                        </div>
                        <div class="text-end align-items-center flex-fill" style="font-size: 2em">
                            {foreach 1..5 as $value}
                                {* <span class="">	&#11088;</span> *}
                                {if $value < 5 }
                                    <span >&#9733;</span>
                                {else}
                                    <span>&#9734;</span>
                                {/if}
                            {/foreach}
                        </div>
                    </div>

                    <hr class="mt-2 margin-bottom-2x">

                    <div class="d-none">
                        <button class="btn btn-warning">Оставить отзыв</button>
                    </div>

                    <div class="d-none">

                        <h5 class="mb-4">Отзыв к [[*pagetitle]]</h5>

                        <form class="validate">
                            <div class="row">
                                <div class="col-6 form-group">
                                    <div class="form-floating">
                                        <input class="form-control" id="user_name" name="user_name" placeholder="Ваше имя" autocomplete="off" required>
                                        <label for="user_name">Ваше имя</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 form-group">
                                    <div class="form-floating">
                                        <input class="form-control" name="user_email" id="user_email" placeholder="Emэйл" autocomplete="off" required>
                                        <label for="user_email">E-mail</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 form-group">
                                    <div class="form-floating">
                                        <input class="form-control" name="user_phone" id="user_phone" placeholder="Телефон" autocomplete="off">
                                        <label for="user_phone">Телефон</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 text">
                                    <button class="btn btn-lg btn-primary" type="submit">Отправить</button>
                                </div>
                            </div>
                        </form>

                    </div>

                    {set $comments = [

                        [
                            'id' => 1,
                            'text' => 'This is my favorite product. Its very well for delivery, and its just delivery to my place.',
                            'likes' => 10,
                            'dislikes' => 1,
                            'messages' => 4,
                            'createdon' => time(),
                            'createdby' => $_modx->user.id,
                            'publishedon' => time(),
                            'published' => 1,
                            'publishedby' => $_modx->user.id,
                            'deletedon' => 0,
                            'deletedby' => 0,
                            'deleted' => 0,
                            'user' => $_modx->user,
                        ],

                        [
                            'id' => 1,
                            'text' => 'This is my favorite product. Its very well for delivery, and its just delivery to my place.',
                            'likes' => 0,
                            'dislikes' => 5,
                            'messages' => 0,
                            'createdon' => time(),
                            'createdby' => $_modx->user.id,
                            'publishedon' => time(),
                            'published' => 1,
                            'publishedby' => $_modx->user.id,
                            'deletedon' => 0,
                            'deletedby' => 0,
                            'deleted' => 0,
                            'user' => $_modx->user,
                        ],

                        [
                            'id' => 1,
                            'text' => 'This is my favorite product. Its very well for delivery, and its just delivery to my place.',
                            'likes' => 0,
                            'dislikes' => 5,
                            'messages' => 0,
                            'createdon' => time(),
                            'createdby' => $_modx->user.id,
                            'publishedon' => time(),
                            'published' => 1,
                            'publishedby' => $_modx->user.id,
                            'deletedon' => 0,
                            'deletedby' => 0,
                            'deleted' => 0,
                            'user' => $_modx->user,
                        ],

                    ]}

                    <div class="mb-2">

                        {foreach $comments as $comment}

                            <div class="row margin-bottom-2x" id="comment-{$comment.id}">
                                <div class="col-12">
                                    <div class="d-flex align-items-center mb-2">
                                        <img class="shadow-sm border" src="{$comment.user.photo}" style="width: 50px; border-radius: 50%">
                                        <div class="ml-2" style="font-weight: 400; font-size: 14pt">{$comment.user.fullname}</div>
                                        <div class="flex-fill text-end text-muted">
                                            {$comment.publishedon | date : 'd F Y H:i'}
                                        </div>
                                    </div>
                                    <div class="text-lg mb-2">
                                        {foreach 1..5 as $value}
                                            {* <span class="">	&#11088;</span> *}
                                            {if $value < 5 }
                                                <span >&#9733;</span>
                                            {else}
                                                <span>&#9734;</span>
                                            {/if}
                                        {/foreach}
                                    </div>
                                    <div class="text-lg mb-4">
                                        {$comment.text}
                                    </div>
                                    <div class="d-flex">
                                        <div class="">
                                            Отзыв полезен? 
                                            <button class="btn btn-light btn-icon m-0" type="button"><i class="icon-thumbs-up"></i> <span style="font-weight: 400">{$comment.likes}</span></button> 
                                            <button class="btn btn-light btn-icon m-0" type="button"><i class="icon-thumbs-down"></i> <span style="font-weight: 400">{$comment.dislikes}</span></button> 
                                        </div>
                                        <div class="d-flex flex-fill align-items-center justify-content-end">
                                            <a href="#">Ответить</a>
                                        </div>
                                    </div>
                                    {if $comment.messages > 0}
                                        <div class="">
                                            <a class="dropdown-toggle text-info" href="#">Комментарии ({$comment.messages})</a>
                                        </div>
                                    {/if}
                                </div>
                            </div>

                            <hr class="my-4 d-none">

                        {/foreach}

                    </div>

                    <div class="text-center">
                        <a class="text-info text-decoration-underline" href="#">Eще отзывы (8)</a>
                    </div>

                </div>

            </div>

        </div>

        <div class="col-4">

            <div class="card">

                <div class="card-body">

                    <h2 class="h5" style="font-weight: 500">Популярные товары</h2>

                </div>

            </div>


        </div>

    </div>

</div>