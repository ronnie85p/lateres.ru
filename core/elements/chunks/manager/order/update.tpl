<div class="row mb-4">
    <div class="col-8">
        <h5>Доставка</h5>

            <div class="row">
                <div class="col-12 form-group">
                    {$order.delivery.name}
                    {'!GetDeliveries' | snippet: [
                        'tpl' => '@INLINE <option value="{$id}"{$id == "'~ $order.delivery.id ~'" ? " selected" : ""}>{$name}</option>',
                        'tplWrapper' => '@INLINE <select class="form-control" name="delivery">{$output}</select>'
                    ]}
                </div>
            </div>
            
            <div class="card mb-2">
                <div class="card-body">
                    <div>Адрес доставки: <i class="icon-map-pin"></i>&nbsp;{$order.address.text_address}</div>
                    <div>Расстояние до <a href="#">склада</a>: {$order.address.distance} км.</div>
                    {* <div>Транспорт {$order.delivery_car.name}</div>
                    <div>Рейсов {$order.delivery_cars}</div> *}
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-6 form-group">
                    <label for="delivery_car">Транспорт</label>
                    {'!GetDeliveryCars' | snippet : [
                        'tpl' => '@INLINE <option value="{$id}"{$id == "'~ $order.delivery_car.id ~'" ? " selected" : ""}>{$name}</option>',
                        'tplWrapper' => '@INLINE <select class="form-control" name="delivery_car">{$output}</select>'
                    ]}
                </div>

                <div class="col-6 form-group">
                    <label for="delivery_datetime">Дата и время доставки</label>
                    <div class="input-group">
                        <input class="form-control w-90" type="date" name="delivery_date" value="{$order.delivery_date}" min="{'Y-m-d' | date}" />
                        {'!GetWorkTimes' | snippet : [
                            'tpl' => '@INLINE <option value="{$time}"{$time == "'~$order.delivery_time~'" ? " selected" : ""}>{$time}</option>',
                            'tplWrapper' => '@INLINE <select class="form-control" name="delivery_time">{$output}</select>'
                        ]}
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-4 form-group">
                    <label for="delivery_cost">Стоимость доставки</label>
                    <input class="form-control" name="delivery_cost" value="{$order.delivery_cost}">
                </div>
            </div>

        <h5>Получатель</h5>
        <div class="card mb-2x">
            <div class="card-body">
                <div>Получатель {$order.address.receiver}, {$order.address.phone}</div>
                <div>Организация {$order.address.receiver_company.text}</div>
                <div>Адрес {$order.address.receiver_company.address_text}</div>
            </div>
        </div>
    </div>

    <div class="col-4">

        <div class="sticky-top offset-top-1">
            <h5 class="">Cумма</h5>

            <div class="row d-none">
                <div class="col-12 form-group">
                    {'!GetPaymentStatuses' | snippet: [
                        'tpl' => '@INLINE <option value="{$id}"{$id == "'~ $order.payment_status.id ~'" ? " selected" : ""}>{$name}</option>',
                        'tplWrapper' => '@INLINE <select class="form-control" name="payment_status">{$output}</select>'
                    ]}
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div>Товары {$order.cart_cost}</div>
                    <div>Налог {$order.sales_tax ? $order.sales_tax : 'Без НДС'}</div>
                    <div>Доставка {$order.delivery_cost}</div>
                    <div>Итого {$order.cost}</div>
                </div>
            </div>

            <a href="#">Сделать скидку</a>

        </div>

    </div>

    <hr class="my-3">
</div>