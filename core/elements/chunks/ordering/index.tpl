{*
1. Способ получения
    = Самовывоз
    = Транспортной компании 

1.1 Дата и время получения

2. Получатель
    Тип аккаунта = (физ или юр)
    ФИО, Тел.
    Паспортные данные

    if Тип аккаунта 
        = юр лицо

        Реквизиты предпр.
        Адрес предпр.        

3. Нужен договор на поставку товара (checkbox)
4. Комментарий (textarea)
5. Метод оплаты ()

*}

{set $recipientNotFully = false}

<div class="h2 mt-2x">{$_modx->resource.pagetitle}</div>

<form class="wf-shop">
    <input type="hidden" name="action" value="order/create" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="row mb-2x" id="ordering">
        
        <div class="col-12 col-md-8">
        
            <div class="mb-4 sticky-top bg-white px-3 py-2 shadow-sm">
                {foreach $deliveries as $_delivery}
                    <div class="custom-control custom-radio custom-control-inline">
                        <input class="custom-control-input order-delivery" type="radio" id="delivery-{$_delivery->id}" name="delivery" value="{$_delivery->id}"{$delivery == $_delivery->id ? ' checked' : ''}>
                        <label class="custom-control-label" for="delivery-{$_delivery->id}">{$_delivery->name}</label>
                    </div>
                {/foreach}
            </div>

            <div class="mb-2x order-delivery-content">
                {$deliveryTpl}
            </div>

            <hr class="my-4 mb-2x">

            <div class="mt-2">
                <div class="h5">Товары</div>
                
                {foreach $order.items as $item} 
                    <div class="rounded shadow-sm overflow-hidden mb-3">
                        <div class="media">
                            <img class="mr-2" src="https://309921.selcdn.ru/l-s-ru/{$item.image}" width="85" />
                            <div class="media-body p-2">
                                <div><a href="{$item.product_id | url}" target="blanc_">{$item.pagetitle}</a></div>
                                <div class="small text-muted">{$item.description}</div>
                            </div>
                            <div class="p-2 text-end d-flex align-self-center">
                                x {$item.count}&nbsp;=&nbsp;<span class="fw-bolder">{$item.cost} {'wf_shop.currency_html_code' | option}</span>
                            </div>
                        </div>
                    </div>
                {/foreach}

            </div>
        
        </div>
        
        <div class="col-12 col-md-4">
            <div class="sticky-top offset-top-1">
                <section class="widget widget-order-summary" id="order-summary">
                    {$summary}
                </section>
            </div>
        </div>
        
    </div>

</form>

<div class="shopping-cart-footer d-none d-md-block">
    <div class="column"><a class="btn btn-outline-secondary" href="{5 | url}">
        <i class="icon-arrow-left"></i>&nbsp;Продолжить покупки</a>
    </div>
    <div class="column"></div>
</div>