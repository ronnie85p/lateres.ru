{* 'context' => 'web',
'status' => 0,
'createdon' => time(),
'user_id' => $this->modx->user->id, 
'num' => $this->getOrderNum(), 
'delivery' => $this->getValue('delivery'), 
'payment' => $this->getValue('payment'), 
'cost' => $this->getValue('cost'), 
'cart_cost' => $this->getValue('cart_cost'), 
'delivery_cost' => $this->getValue('delivery_cost'), 
'weight' => $this->getValue('weight'), 
'comment' => $this->getValue('comment'),
'properties' => [
  'sales_tax' => $this->getValue('sales_tax'),
  'tax_enabled' => $this->getValue('tax_enabled'),
  'contract_required' => $this->getValue('contract_required'),
  'delivery_datetime' => $this->getValue('delivery_datetime'),
  'delivery_distance' => $this->getValue('delivery_distance'),
  'delivery_cars' => $this->delivery['cars'],
  'delivery_car' => $this->delivery['car'],
  'delivery_car_zone' => $this->delivery['car_zone'],
  'delivery_car_price' => $this->delivery['car_price']
] *}

{set $orders = [
    [
        'id' => 1,
        'user_id' => $_modx->user.id,
        'num' => '234343433-001',
        'cart_cost' => '1000.00',
        'cost' => '1000.00',
        'weight' => 0,
        'delivery_cost' => 0,
        'tax_included' => 0,
        'sales_tax' => 0,
        'status' => [
            'id' => 1,
            'name' => 'Новый',
            'color' => '343a40',
            'final' => 0
        ],
        'comment' => '',
        'delivery' => [
            'id' => 1,
            'name' => 'Самовывоз'
        ],
        'payment_status' => [
            'name' => 'Оплачено'
        ],
        'address' => 0,
        'payment' => 0,
        'createdon' => time(),
        'updatedon' => time(),
        'properties' => []
    ],
    [
        'id' => 2,
        'user_id' => $_modx->user.id,
        'num' => '234343433-002',
        'cart_cost' => '542.00',
        'cost' => '585.00',
        'weight' => 0,
        'delivery_cost' => 0,
        'tax_included' => 1,
        'sales_tax' => '43.00',
        'status' => [
            'id' => 1,
            'name' => 'Завершен',
            'color' => '4caf50',
            'final' => 1
        ],
        'comment' => '',
        'delivery' => [
            'id' => 2,
            'name' => 'Транспортом компании "Латерес"'
        ],
        'payment_status' => [
            'name' => 'Не оплачено'
        ],
        'address' => 0,
        'payment' => 0,
        'createdon' => time(),
        'updatedon' => time(),
        'properties' => []
    ],
    [
        'id' => 2,
        'user_id' => $_modx->user.id,
        'num' => '234343433-003',
        'cart_cost' => '792.00',
        'cost' => '792.00',
        'weight' => 0,
        'delivery_cost' => 0,
        'tax_included' => 0,
        'sales_tax' => '',
        'status' => [
            'id' => 1,
            'name' => 'Отменен',
            'color' => 'f44336',
            'final' => 1
        ],
        'comment' => '',
        'delivery' => [
            'id' => 1,
            'name' => 'Самовывоз',
        ],
        'payment_status' => [
            'name' => 'Внесена предоплата'
        ],
        'address' => 0,
        'payment' => 0,
        'createdon' => time(),
        'updatedon' => time(),
        'properties' => []
    ]
]}

{if $orders}

    {foreach $orders as $order}

        {* <div class="card">
            <div class="card-body">
                
            </div>
        </div> *}

        <div class="order-row mb-4 rounded shadow-sm p-4" style="">
            <div class="row">
                <div class="col-12 col-md-5">
                    <h4 class="d-inline"><a class="text-dark text-decoration-none" href="">NO {$order.num}</a></h4> 
                    <sup class="badge" style="position: relative; top: -15px; left: 15px; background-color: #{$order.status.color}!important">{$order.status.name}</sup>
                    <p>от {$order.createdon | date : 'j F'}</p>
                </div>
                <div class="col-6 col-md-3">
                    <div class="mb-2 text-lg d-none">Оплата картой</div>
                    <div class="text-lg">{$order.payment_status.name}</div>
                </div>
                <div class="col-6 col-md-4 text-end">
                    <h5 class="mb-1">$ {$order.cost}</h5>
                    <span class="text-muted">{$order.tax_included ? 'В том числе НДС $ ' ~ $order.sales_tax : 'Без НДС'} </span>
                </div>
            </div>

            <hr class="mb-4">

            <div class="row">
                <div class="col-6">
                    <div><i class="icon-truck"></i> {$order.delivery.name}</div>
                </div>
                <div class="col-6 text-end">
                    Внесена оплата на сумму $ 1 000
                </div>
            </div>

        </div>

    {/foreach}

{else}

    <div class="text-center">
        <p class="text-lg d-flex align-items-center justify-content-center alert alert-info">
            <i class="icon-truck_" style="font-size: 1.5em"></i>&nbsp;У Вас еще нет заказов
        </p>
        <hr class="my-4">
        <a href="{91 | url}" class="btn btn-outline-secondary"><i class="icon-shopping-cart"></i> Сделать заказ</a>
    </div>

{/if}