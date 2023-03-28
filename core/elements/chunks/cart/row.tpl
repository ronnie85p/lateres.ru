
{* <div class="card mb-2"> *}

{set $domain = strpos($image, 'assets/') === false ? 'https://309921.selcdn.ru/l-s-ru/' : 'https://www.lateres.ru/'}

    <div class="media cart-item mb-2x pb-2x" data-id="{$id}">

        <div class="custom-control custom-checkbox mr-4" style="margin-bottom: 0!important">
            <input class="custom-control-input cart-item-check" type="checkbox" id="ex-check-{$id}">
            <label class="custom-control-label" for="ex-check-{$id}"></label>
        </div>

        <div class="row">

            <div class="col-2">
                <img class="mr-3 rounded" src="{$domain}{$image}"  />
            </div>

            <div class="col-7">
                <div class="mb-3">
                    <a href="{$product_id | url}" target="blanc_" style="font-size: 1rem">{$pagetitle}</a>
                </div>
                <div class="text-muted">{$description}</div>
                <div class="mt-2" style="font-size: 1.2em">Цена {$price}.00 {'wf_shop.currency_html_code' | option}</div>
            </div>

            <div class="col-3">

                <div class="mb-3 text-end">
                    {if $has_fav}
                        <button class="btn btn-light icon-heart wf-shop-btn text-danger" data-action="favorite/remove" data-product-id="{$product_id}" title="Убрать в избранное"></button>
                    {else}
                        <button class="btn btn-light icon-heart wf-shop-btn" data-action="favorite/add" data-product-id="{$product_id}" title="Добавить в избранное"></button>
                    {/if}
                    <button class="btn btn-light icon-trash-2 wf-shop-btn" data-action="cart/remove" data-id="{$id}" title="Удалить из корзины"></button>
                </div>

                <form class="wf-shop-cart" name="cart/count">
                    <input type="hidden" name="id" value="{$id}" />
                    <div class="input-counter input-group">
                        <button class="btn btn-outline-secondary icon-minus" data-counter="negative" type="button"></button>
                        <input class="form-control text-center" name="count" value="{$count}" min="-1" max="121" data-inpumask="number">
                        <button class="btn btn-outline-secondary icon-plus" data-counter="positive" type="button"></button>
                    </div>
                </form>
            </div>

            <div class="col-2">
            </div>

            <div class="col-6">
                <span style="font-size: 0.9rem; font-weight: 400" class="text-danger">Cкидка -<span class="cart-{$id}-discount">{$discount}</span>.00 {'wf_shop.currency_html_code' | option}</span>
            </div>

            <div class="col-4 text-end">
                {* <span style="font-size: 1.3em; font-weight: 200" class="text-muted"><strike><span class="cart-{$id}-old-cost">{$old_cost}</span>.00 rub</strike></span> *}
                <span style="font-size: 1.5em; font-weight: 500"><span class="cart-{$id}-cost">{$cost}</span>.00 {'wf_shop.currency_html_code' | option}</span>
            </div>
        </div>

    </div>
{* </div> *}