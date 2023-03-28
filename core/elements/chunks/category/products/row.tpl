{set $imUrl = strpos($img, "assets") === false ? "https://309921.selcdn.ru/l-s-ru/" : "https://www.lateres.ru/"}
<div class="col-6 col-md-3 mb-4" data-product-id="{$id}">
    <div class="card shadow-sm_ overflow-hidden position-relative">
        <div class="" style="position: absolute; top: 5px; left: 5px; right: 5px">
            {if $discount > 0}
                <span class="badge bg-danger" style="font-size: 1.1em">-{$discount}%</span>
            {/if}
        </div>

        <a href="{$uri}">
            <img src="{$img ? $imUrl ~ $img : 'assets/imgs/lateres_no.jpg'}" style="height: 153px" />
        </a>

        <div class="card-body">
            <div class="mb-2 row d-none">
                <div class="col-12 text-end text-success">
                    <i class="icon-check"></i> Наличие
                </div>
            </div>
            <div class="mb-4 overflow-hidden" style="height: 42px; font-size: 1.1em" title="{$pagetitle}">
                <a href="{$uri}" style="color: black; text-decoration: none">{$pagetitle | truncate: 40 : '...'}</a>
            </div>
            <hr class="my-4 d-none">
            <div class="row">
                <div class="col-8 fw-bolder" style="font-size: 1.5em">{$price} {'wf_shop.currency_html_code' | option}</div>
                <div class="col-4 text-end"><button class="btn icon-shopping-cart" type="button" style="font-size: 1.3em" title="В корзину"></button></div>
            </div>
        </div>
    </div>
</div>

        {* <div class="pt-0 p-2 ">
            <p style="font-size: 1.5em">{$price} руб.</p>
                    <div class="text-end">
                        <a class="wf-shop-btn" data-action="cart/add" data-product-id="{$id}" href="#" style="font-size: 1.4em"><i class="icon-shopping-cart"></i>&nbsp;В корзину</a>
                        <a class="wf-shop-btn" data-action="cart/change" data-cart-id="{($_modx->user.id ~ $id) | md5}" data-count="1" href="#" style="font-size: 1em"><i class="icon-refresh-cww"></i>&nbsp;Изменить на 1</a>
                        <a class="wf-shop-btn" data-action="cart/remove" data-cart-id="{($_modx->user.id ~ $id) | md5}" href="#" style="font-size: 1em"><i class="icon-trash-2"></i>&nbsp;Удалить</a>
                        <a class="wf-shop-btn" data-action="cart/clear" href="#" style="font-size: 1em"><i class="icon-x"></i>&nbsp;Очистить корзину</a>
                        <a class="wf-shop-btn" data-action="cart/get" data-cart-id="{($_modx->user.id ~ $id) | md5}" href="#" style="font-size: 1em"><i class="icon-menu"></i>&nbsp;Получить</a>
                        <a class="wf-shop-btn" data-action="cart/getTotal" href="#" style="font-size: 1em"><i class="icon-info"></i>&nbsp;Получить общее</a>
                    </div>
                </div>
            </div> *}