{*

old component
assets/snippets/orderlist/

Все статусы заказа: 
    новый, отменить, завершен, передан на доставку.

Все статусы оплаты:
    внесена предоплата, оплачен, не оплачен

1. изменить статус заказа (отменить, завершен, передан на доставку)
2. изменить статус оплаты (внесена предоплата, оплачен)
3. изменить способ доставки
4. изменить способ оплаты
5. сделать скидку
6. установить стоимость доставки
7. изменить адрес доставки
8. добавить, удалить, изменить кол-во товаров
9. сделать скидку на товар
10. изменить получателя
11. опции доставки: выбрать траспорт
12. комментарий для менеджера
13. опции оплаты: счет на оплату, квитанция

 *}

<script src="{'yandex_maps_api' | option}"></script>
<script src="assets/components/wf_shop/js/delivery/calculator.js"></script>
<script src="assets/components/wf_shop/js/delivery/map.js"></script>

<div class="row mt-4 mb-4">
    <div class="col-9">
        <h4 class="d-inline">Заказ № {$order.num}</h4>
        <p class="mb-1">от {$order.createdon | date : 'j F Y H:i'} <a href="#">{$order.userprofile.fullname}</a></p>
        <p><a href="#">Редактировать</a></p>
    </div>
    <div class="col-3 text-end">
        <span class="badge" style="background-color: #{$order.status.color}; font-size: 1em">{$order.status.name}</span>
    </div>
</div>

<div class="row mb-4">
    <div class="col-8">

        <h5 class="mb-4"><i class="icon-truck"></i>&nbsp;{$order.delivery.name}</h5>
            
        <div class="card mb-2">
            <div class="card-body">
                <div>Адрес доставки: <i class="icon-map-pin"></i>&nbsp;{$order.address.text_address}</div>
                <div>Расстояние до склада: {$order.address.distance} км.</div>
                <div class=""><a class="btn-modal" href="#" data-modal='{
                    "title": "<i class=\"icon-map-pin\"></i>&nbsp;Адрес доставки",
                    "size": "fullscreen",
                    "afterLoaded": "DeliveryMap.initialize({ finishPoint: {$order.address.coords ?: []} })",
                    "request": {
                        "url": "assets/components/wf_shop/index.php",
                        "action": "delivery/map/index"
                    }
                }'>Маршрут</a></div>
                {* <div>Транспорт {$order.delivery_car.name}</div>
                <div>Рейсов {$order.delivery_cars}</div> *}
            </div>
        </div>

        {* {'!DeliveryMap' | snippet : [

            ]} *}

        <div class="card mb-2">
            <div class="card-body">
                <div>Получатель {$order.address.receiver}, {$order.address.phone}</div>
                <div>Организация {$order.address.receiver_company.text}</div>
                <div>Адрес {$order.address.receiver_company.address_text}</div>
                <div class=""><a class="btn-modal" href="#" data-modal='{
                    "title": "<i class=\"icon-user\"></i>&nbsp;Получатель",
                    "size": "md",
                    "request": {
                        "url": "assets/components/wf_shop/index.php",
                        "action": "recipient/index"
                    }
                }'>Подробнее</a></div>
            </div>
        </div>

        <div class="card mb-2">
            <div class="card-body">

                <div><b>Транспорт</b> {$order.delivery_car.name}</div>
                <div><b>Дата и время доставки</b> {$order.delivery_date}&nbsp;{$order.delivery_time}</div>

                {* <div class="row">
                    <div class="col-12 mb-4">
                        <div class="fw-bolder mb-2">{$order.delivery_car.name}</div>
                        <div class="row">
                            <div class="col-6">
                                <img src="{$order.delivery_car.image}" style="width: 150px" />
                                <div class="text-muted">{$order.delivery_car.description}</div>
                            </div>
                            <div class="col-6">
                                <div>Цена за км.: {$order.delivery_zone.price}</div>
                                <div>Мин. цена: {$order.delivery_zone.minprice}</div>
                                <div>Фикс. цена: {$order.delivery_zone.fixprice}</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        
                    </div>
                </div> *}
            </div>
        </div>

        <a href="#">Установить стоимость доставки</a>
    </div>

    <div class="col-4">

        <div class="sticky-top offset-top-1">
            <h5 class="mb-4">{$order.payment.name}</h5>

            <div>Товары {$order.cart_cost}</div>
            <div>Налог {$order.sales_tax ? $order.sales_tax : 'Без НДС'}</div>
            <div>Доставка {$order.delivery_cost}</div>
            <div>Итого {$order.cost}</div>

            <a href="#">Сделать скидку</a>

        </div>

    </div>
</div>

<hr class="my-3">

<div class="row">
    <div class="col-12 text-end">
        <button class="btn btn-danger" type="button"><i class="icon-x"></i>&nbsp;Отменить</button>
        {* <button class="btn btn-info" type="button"><i class="icon-truck"></i>&nbsp;Отправлен</button>
        <button class="btn btn-dark" type="button"><i class="icon-check-circle"></i>&nbsp;Принять</button> *}
        <button class="btn btn-success" type="button"><i class="icon-alert-circle"></i>&nbsp;Завершить</button>
    </div>
</div>

<ul class="nav nav-pills mb-4 mt-2x">
    <li class="nav-item">
        <a class="nav-link active" href="#items" aria-current="page" data-bs-toggle="tab">Товары</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#payment" data-bs-toggle="tab">Оплата</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#payments" data-bs-toggle="tab">Платежи</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#logs" data-bs-toggle="tab">История</a>
    </li>
</ul>

<div class="tab-content" style="min-height: 100px">

    <div class="tab-pane active" id="items">

        {'!GetOrderProducts' | snippet : [
            'orderId' => $order.id,
            'tpl' => '@INLINE <div class="media mb-4">
                <img class="d-flex rounded mr-3" src="https://309921.selcdn.ru/l-s-ru/{$image}" style="width: 100px" />
                <div class="media-body">
                    <h6 class="mt-0 mb-1">{$name}</h6>
                    <div class="">x {$count} = {$cost}</div>
                    <span class="d-none text-sm text-muted">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</span>
                </div>
            </div>'
        ]}

    </div>

    <div class="tab-pane" id="payment">
        {set $invs = [
            [
                'name' => 'Без НДС', 
                'class' => 'ReceiptAccountSH', 
                'rank' => 0
            ], 
            [
                'name' => 'С НДС', 
                'class' => 'ReceiptAccountSH2',
                'rank' => 1
            ]
        ]}

        <p class="text-muted">{$payment->description}</p>

        <div class="row">
            <div class="col-12">

                {foreach $invs as $idx => $inv}
                    <div class="custom-control custom-radio custom-control-inline">
                        <input class="custom-control-input payment-with-tax" type="radio" id="with-tax-{$idx}" name="with_tax" value="{$idx}"{$inv.rank == 0 ? ' checked' : ''} />
                        <label class="custom-control-label" for="with-tax-{$idx}">{$inv.name}</label>
                    </div>
                {/foreach}

            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <h4 class="payment-title text-center">Cчёт</h4>
                <div class="payment-body text-center">
                <a href="https://www.lateres.ru/assets/components/mspreceiptaccount/payment/receiptaccount.php?InvId={$order.id}&class=ReceiptAccountSH" target="blanc_" 
                class="btn btn-secondary payment-link" id="muo-open-pdf">Открыть PDF</a>
                <a href="#" class="btn btn-secondary payment-link" id="muo-send-manager" data-class="ReceiptAccountSH">Отправить менеджеру</a>
                <a href="#" class="btn btn-secondary payment-link" id="muo-send-user" data-class="ReceiptAccountSH">Отправить пользователю</a>
                </div>
            </div>
        </div>

        <hr class="mt-2 mb-4" />

        <div class="row mt-2">
            <div class="col-md-12">
                <h4 class="payment-title text-center">Квитанция</h4>
                <div class="payment-body text-center">
                <a href="https://www.lateres.ru/assets/components/mspreceiptaccount/payment/receiptaccount.php?InvId={$order.id}&class=ReceiptAccountKV" target="blanc_" 
                class="btn btn-secondary payment-link" id="muo-open-pdf">Открыть PDF</a>
                <a href="#" class="btn btn-secondary payment-link" id="muo-send-manager" data-class="ReceiptAccountKV">Отправить менеджеру</a>
                <a href="#" class="btn btn-secondary payment-link" id="muo-send-user" data-class="ReceiptAccountKV">Отправить пользователю</a>
                </div>
            </div>
        </div>

    </div>

    <div class="tab-pane" id="payments">
    </div>

    <div class="tab-pane" id="logs">
    </div>

</div>

<form class="wf-shop validate d-none">
    <input type="hidden" name="action" value="order/update" />


    <h5 class="mt-4">Оплата</h5>
    <div class="row">
        <div class="col-4">

            <div class="form-group">
                <label for="">Способ оплаты</label>
                {'!GetDeliveryPayments' | snippet: [
                    'deliveryId' => $order.delivery.id,
                    'tpl' => '@INLINE <option value="{$id}"{$id == "'~ $order.payment.id ~'" ? " selected" : ""}>{$name}</option>',
                    'tplWrapper' => '@INLINE <select class="form-control" name="payment">{$output}</select>'
                ]}
            </div>

            {* <div class="form-group">
                <label for="">Статус</label>
                {'!GetPaymentStatuses' | snippet: [
                    'tpl' => '@INLINE <option value="{$id}"{$id == "'~ $order.payment_status.id ~'" ? " selected" : ""}>{$name}</option>',
                    'tplWrapper' => '@INLINE <select class="form-control" name="payment_status">{$output}</select>'
                ]}
            </div> *}
        </div>
    </div>

    <hr class="my-3"/>


    <div class="row">
        <div class="col-12">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>

<a href="#" data-bs-target="#order-info" data-bs-toggle="collapse">Order</a>
<div class="collapse" id="order-info">
    {$order | print}
</div>


{ignore}
<script>

    wf.Events.add('click', '.btn-modal', async function (e) {
        e.preventDefault();

        const options = JSON.parse(this.dataset.modal || "{}");
        
        const modal = new Modal(options);
        modal.show();

        if (options.request) {
            const response = await wf.sendRequest(
                options.request.action, 
                options.request.params, 
                { ...options.request, preloader: { 
                    context: modal.modal('body')
                } }
            );

            if (response.success && response.object.html) {
                modal.modal('body').innerHTML = response.object.html;

                if (options.afterLoaded) {
                    window.eval(options.afterLoaded);
                }
            }
        }
    });

    // const btn = document.querySelector('.btn-custom');
    // btn?.addEventListener('click', function (e) {
    //     console.log("click", this)
    //     const modal = new Modal({
    //         // position: 'center',
    //         size: 'fullscreen',
    //         title: '<i class="icon-map-pin"></i>&nbsp;Адрес доставки',
    //         // header: '',
    //         body: `
    //             <div class="row">
    //                 <div class="col-4 d-none">
    //                     <div class="row">
    //                         <div class="col-12 form-group">
    //                             <label>Город</label>
    //                             <input class="form-control" name="city" autocomplete="off">
    //                         </div>
    //                         <div class="col-12 form-group">
    //                             <label>Улица</label>
    //                             <input class="form-control" name="street" autocomplete="off">
    //                         </div>
    //                         <div class="col-4 form-group">
    //                             <label>Cтроение</label>
    //                             <input class="form-control" name="building" autocomplete="off">
    //                         </div>
    //                         <div class="col-8"></div>
    //                     </div>

    //                     <hr class="my-3">
    //                 </div>
    //                 <div class="col-12">
    //                     This will map
    //                 </div>
    //             </div>
    //         `,
    //         // footer: '',
    //         // content: ''
    //     });

    //     modal.show();

    //     // wf.Shop.sendRequest('', {});

    // }, false);

    function Modal(options = {}) {

        this.options = {
            selector: '',

            position: '',

            scrollable: true,

            bodyMinHeight: '150px',

            // @var array|string|number size 
            // Default 500px
            size: '', 

            title: '',
            animation: '',
            header: `
                <h6 class="modal-title"></h6>
                <button class="btn-close" data-bs-dismiss="modal" title="Close"></button>
            `,
            body: '',
            footer: `
                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            `,
            content: `
                <div class="modal-header"></div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            `,
            template: `<div class="modal">
                <div class="modal-dialog">
                    <div class="modal-content"></div>
                </div>
            </div>`,

            ...options
        };

        this.dialogSizes = [
            'sm',                 // 300px
            'lg',                 // 800px
            'xl',                 // 1140px
            'fullscreen',         // Always
            'fullscreen-sm-down', // Below 576px
            'fullscreen-md-down', // Below 768px
            'fullscreen-lg-down', // Below 992px
            'fullscreen-xl-down', // Below 1200px
            'fullscreen-xxl-down' // Below 1400px
        ];

        this.modalElement = null;
        this.bsModal = null;

        this.init = () => {
            this.modal();

            if (this.setContent(this.options.content)) {
                if (this.setHeader(this.options.header)) {
                    this.setTitle(this.options.title);
                }

                this.setBody(this.options.body);
                this.setFooter(this.options.footer);
            }

            if (this.options.position) {
                this.setPosition(this.options.position);
            }

            if (this.options.scrollable) {
                this.setScrollable();
            }

            if (this.options.size) {
                this.setSize(this.options.size);
            }

            if (this.options.animation) {
                this.setAnimation(this.options.animation);
            }

            if (this.options.bodyMinHeight) {
                const body = this.modal('body');
                if (body) {
                    body.style.minHeight = this.options.bodyMinHeight;
                }
            }

            document.body.append(this.modalElement);
            this.bsModal = new bootstrap.Modal(this.modalElement, this.options);

            this.modalElement.addEventListener('hidden.bs.modal', (e) =>  {
                if (!this.options.selector) {
                    this.modalElement.remove();
                }
            });

            return this;
        };

        this.modal = (component = '') => {
            if (!this.modalElement) {
                if (this.options.selector) {
                    this.modalElement = document.querySelector(this.options.selector);
                } else {
                    this.modalElement = wf.DOM.createElement(this.options.template);
                }
            }

            return component 
                ? this.modalElement?.querySelector(`.modal-${component}`) 
                : this.modalElement
            ;
        };

        this.show = () => {
            this.bsModal.show();
        };

        this.hide = () => {
            this.bsModal.hide();
        };

        this.setScrollable = () => {
            this.modal('dialog').classList.add('modal-dialog-scrollable');
        };

        this.setAnimation = (animation) => {
            this.modal().classList.add(animation);
        };

        this.setSize = (size) => {
            const dialog = this.modal('dialog');

            switch (typeof size) {
                case 'string':
                    if (this.dialogSizes.includes(size)) {
                        dialog.classList.add(`modal-${size}`);
                    }

                    break;
                case 'number':
                    dialog.style.width = `${size}px`;

                    break;
                default:
                    let { width, height } = size;

                    width = typeof width === 'number' ? `${width}px` : width;
                    height = typeof height === 'number' ? `${height}px` : height;

                    if (width) {
                        dialog.style.width = width;
                    }

                    if (height) {
                        dialog.style.height = height;
                    }
            }
        };

        this.setPosition = (position) => {
            switch (position) {
                case 'center':
                    position = 'modal-dialog-centered';
                    break;
            }
            
            if (position) {
                this.modal('dialog')?.classList.add(position);
            }
        };

        this.setHtml = (component, html) => {
            const elem = this.modal(component);
            if (elem) {
                elem.innerHTML = html;
            }
        };

        this.setHidden = (component) => {
            this.modal(component).classList.add('d-none');
        };

        this.setComponent = (component, html) => {
            if (html !== false) {
                this.setHtml(component, html);
                return true;
            }

            this.setHidden(component);
            return false;
        };

        this.setContent = (html) => {
            return this.setComponent('content', html);
        };

        this.setTitle = (title) => {
            return this.setComponent('title', title);
        };

        this.setHeader = (html) => {
            return this.setComponent('header', html);
        };

        this.setBody = (html) => {
            return this.setComponent('body', html);
        };

        this.setFooter = (html) => {
            return this.setComponent('footer', html);
        };

        return this.init();
    }
</script>
{/ignore}