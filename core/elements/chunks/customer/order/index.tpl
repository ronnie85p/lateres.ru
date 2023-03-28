<div class="row mt-4 mb-2">
    <div class="col-12">
        <h4 class="d-inline">Заказ № {$order.num}</h4>
        <sup class="badge" 
            style="
                background-color: #{$order.status.color}; 
                position: relative; 
                top: -15px; 
                left: 15px;
                font-size: .9em
            "
        >{$order.status.name}</sup>
        <p>от {$order.createdon | date : 'j F Y H:i'}</p>
    </div>
</div>

<div class="row mb-2">
    <div class="col-6">
        <div class="card">
            <div class="card-body">
                <div class="h5">{$order.delivery.name}</div>
                <div>Адрес доставки: <i class="icon-map-pin"></i>&nbsp;{$order.address.text_address}</div>
                <div>Расстояние до склада: {$order.address.distance} км.</div>
                <div>Получатель {$order.address.receiver}, {$order.address.phone}</div>
                <div>Организация {$order.address.receiver_company.text}</div>
                <div>Адрес {$order.address.receiver_company.address_text}</div>
                <div>Транспорт {$order.delivery_car.name}</div>
                <div>Рейсов {$order.delivery_cars}</div>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="text-dark h6">Не оплачено</div>
        <div>Товары {$order.cart_cost}</div>
        <div>Налог {$order.sales_tax ? $order.sales_tax : 'Без НДС'}</div>
        <div>Доставка {$order.delivery_cost}</div>
        <div>Итого {$order.cost}</div>
    </div>
</div>

<div class="card mb-2">
    <div class="card-body">
        <h6>{$order.payment.name}</h6>

    </div>
</div>

<div class="row mb-2x">
    <div class="col-12 text-end">
        <button class="btn btn-warning" type="button">Отменить</button>
    </div>
</div>

{foreach $order.products as $product}
    <div class="media mb-4">
        <img class="d-flex rounded mr-3" src="https://309921.selcdn.ru/l-s-ru/{$product.image}" style="width: 100px" />
        <div class="media-body">
            <h6 class="mt-0 mb-1">{$product.name}</h6>
            <div class="">x {$product.count} = {$product.cost}</div>
            <span class="d-none text-sm text-muted">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</span>
        </div>
    </div>
{/foreach}

<a href="#" data-bs-target="#order-info" data-bs-toggle="collapse">Order</a>
<div class="collapse" id="order-info">
    {$order | print}
</div>