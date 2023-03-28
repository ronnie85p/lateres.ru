{set $categories = '!pdoMenu' | snippet : [
    'parents' => '103',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <select class="form-control" name="category" required_ data-invalid="#error-category">
            <option value="">-- Не выбрана</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-category">
    '
]}

{set $subCategories = '!pdoMenu' | snippet : [
    'parents' => '104',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <select class="form-control" name="sub_category" required_ data-invalid="#error-sub-category">
            <option value="">-- Не выбрана</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-sub-category">
    '
]}

{set $productType = '!pdoMenu' | snippet : [
    'parents' => '234',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <label for="product_type">Тип изделия</label>
        <select class="form-control" name="product_type" required_ data-invalid="#error-product-type">
            <option value="">-- Не выбран</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-product-type">
    '
]}

{set $productMaterial = '!pdoMenu' | snippet : [
    'parents' => '233',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <label for="product_material">Материал</label>
        <select class="form-control" name="product_material" required_ data-invalid="#error-product-material">
            <option value="">-- Не выбран</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-product-material">
    '
]}

{set $brandStrength = '!pdoMenu' | snippet : [
    'parents' => '233',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <label for="brand_strength">Марка прочности</label>
        <select class="form-control" name="brand_strength" required_ data-invalid="#error-brand-strength">
            <option value="">-- Не выбрана</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-brand-strength">
    '
]}

{set $qtyPerPallet = '!pdoMenu' | snippet : [
    'parents' => '238',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <label for="qty_per_pallet">Кол-во на поддоне</label>
        <select class="form-control" name="qty_per_pallet" required_ data-invalid="#error-qty-per-pallet">
            <option value="">-- Не выбрано</option>
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-qty-per-pallet">
    '
]}

{set $measureUnit = '!pdoMenu' | snippet : [
    'parents' => '237',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <label for="measure_unit">Ед. измерения</label>
        <select class="form-control" name="measure_unit" required_ data-invalid="#error-measure-unit">
            {$wrapper}
        </select>
        <span class="invalid-feedback" id="error-measure-unit">
    '
]}

{set $purchaseCurrency = '!pdoMenu' | snippet : [
    'parents' => '239',
    'level' => 1,
    'includeTVs' => 'currency_html_code',
    'prefixTv' => '',
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$currency_html_code}</option>',
    'tplOuter' => '@INLINE 
        <select class="form-control" name="purchase_currency" style="width: 80px!important" required_>
            {$wrapper}
        </select>
    '
]}

{set $salesCurrency = '!pdoMenu' | snippet : [
    'parents' => '239',
    'level' => 1,
    'includeTVs' => 'currency_html_code',
    'prefixTv' => '',
    'tpl' => '@INLINE <option value="{$parent}.{$id}">{$currency_html_code}</option>',
    'tplOuter' => '@INLINE 
        <select class="form-control" name="currency" style="width: 80px!important" required_>
            {$wrapper}
        </select>
    '
]}

{set $useTypes = '!pdoMenu' | snippet : [
    'parents' => '322',
    'level' => '1',
    'tpl' => '@INLINE <div class="custom-control custom-switch custom-control-inline">
        <input class="custom-control-input" type="checkbox" name="product_state[{$idx-1}]" value="{$id}" id="ex-product-state-{$id}" >
            <label class="custom-control-label" for="ex-product-state-{$id}">{$menutitle}</label>
    </div>',
    'tplOuter' => '@INLINE <label class="d-block" for="product_state">Состояние</label>{$wrapper}'
]}

<style>

</style>

<form class="wf-shp-form validate">

    <input type="hidden" name="action" value="product/create"  />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="row">
        <div class="col-12 col-md-5">
            <div class="h5">Категория</div>
            <div class="form-group">
                {$categories}
            </div>
            <div class="form-group d-none_">
                {$subCategories}
            </div>
        </div>   
        <div class="col-12 col-md-5 ">
            {* <div class="h5">Производитель</div>
            <div class="form-group form-floating">
                <input class="form-control" name="vendor" placeholder="Производитель" id="vendor" autocomplete="off" placeholder="--Не выбран" required_ data-invalid="#error-vendor" data-select='{
                    "action": "vendor/getList"
                }'/>
                <label for="vendor">Производитель</label>
                <span class="invalid-feedback" id="error-vendor">
            </div>
            <div class="form-group form-floating">
                <input class="form-control" name="trademark" placeholder="Торговая марка" id="trademark" autocomplete="off" placeholder="--Не выбрана" required_ data-invalid="#error-trademark" data-select='{
                    "action": "vendor/trademark/getList"
                }' />
                <label for="trademark">Торговая марка</label>
                <span class="invalid-feedback" id="error-trademark">
            </div> *}
        </div>
    </div>

    <div class="row margin-top-2x">
        <div class="col-8 form-group">
            <label for="pagetitle">Наименование</label>
            <input class="form-control product-check-exists" name="pagetitle" placeholder=" " autocomplete="off" required_  data-invalid="#error-pagetitle" data-options='{
                "action": "product/checkExists",
                "parent": 122
            }' />
            <span class="invalid-feedback" id="error-pagetitle">
        </div>
        <div class="col-4 form-group">
            <label for="article">Aртикль</label>
            <input class="form-control product-article" name="article" placeholder=" " autocomplete="off" data-invalid="#error-article"  data-options='{
                "action": "product/article/getGeneratedList",
                "vendorId": 1
            }' />
            <span class="invalid-feedback" id="error-article">
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="longtitle">Полное наименование</label>
            <input class="form-control" name="longtitle" placeholder=" " required_ data-invalid="#error-longtitle"/>
            <span class="invalid-feedback" id="error-longtitle">
        </div>
        <div class="col-12 form-group">
            <label for="description">Краткое описание</label>
            <input class="form-control" name="description" placeholder=" " required_ data-invalid="#error-description"/>
            <span class="invalid-feedback" id="error-description">
        </div>
    </div>

    <div class="margin-top-2x h5">Описание</div>
    <div class="row">
        <div class="col-12 form-group">
            <textarea class="form-control" name="content" placeholder=" " id="textarea-content" style="height: 200px" autocomplete="off" data-invalid="#error-content" onready="tmceEditor.ready(this, {  })"></textarea>
            <span class="invalid-feedback" id="error-content">
        </div>
    </div>

    <div class="margin-top-2x h5">Преимущества</div>
    <div class="row">
        <div class="col-12 form-group">
            <textarea class="form-control" name="benefits" placeholder=" " id="textarea-benefits" style="height: 200px" rows="7" autocomplete="off" data-invalid="#error-benefits" onready="tmceEditor.ready(this, {  })"></textarea>
            <span class="invalid-feedback" id="error-benefits">
        </div>
    </div>

    <div class="row margin-top-2x">
        <div class="col-12 form-group">
            <label for="tags">Ключевые фразы по товару, разделенные запятыми (до 10 фраз)</label>
            <input class="form-control" name="tags" placeholder=" " required_ data-invalid="#error-tags"/>
            <span class="invalid-feedback" id="error-tags">
        </div>
    </div>

    <hr class="mt-4">

    <div class="margin-top-2x h5">Производство</div>
    <div class="row">
        <div class="col-6 form-group">
            <label for="vendor">Производитель</label>
            <input class="form-control" name="vendor" placeholder="Производитель" id="vendor" autocomplete="off" placeholder="--Не выбран" required_ data-invalid="#error-vendor" data-select='{
                "action": "vendor/getList"
            }'/>    
            <span class="invalid-feedback" id="error-vendor">
        </div>
        <div class="col-6 form-group">
            <label for="made_in">Страна</label>
            <input class="form-control" id="made-in" name="made_in" autocomplete="off" placeholder="--Не выбрана" required_ data-invalid="#error-made-in" data-select='{
                "action": "country/getList"
            }' />
            <span class="invalid-feedback" id="error-made-in">
        </div>
        <div class="col-6 form-group">
            <label for="trademark">Торговая марка</label>
            <input class="form-control" name="trademark" placeholder="Торговая марка" id="trademark" autocomplete="off" placeholder="--Не выбрана" required_ data-invalid="#error-trademark" data-select='{
                "action": "vendor/trademark/getList"
            }' />
            <span class="invalid-feedback" id="error-trademark">
        </div>
    </div>

    <div class="margin-top-2x h5">Характеристики</div>
    <div class="row">
        <div class="col-6 form-group">
            {$productType}
        </div>
        <div class="col-6 form-group">
            {$productMaterial}
        </div>
    </div>

    <div class="row">
        <div class="col-6 form-group">
            {$brandStrength}
        </div>
        <div class="col-6 form-group">
            <label for="colors">Цвет</label>
            <input class="form-control product-options" name="colors" placeholder="Цвет" required_ data-invalid="#error-colors" data-options='{
                "name": "color",
                "action": "options/getList"
            }' />
            <span class="invalid-feedback" id="error-colors">
        </div>
    </div>

    <div class="row">
        <div class="col-9 form-group">
            <label class="" for="sizes">Размер, мм (Ш x В x Д)</label>
            <div class="list-action">

                <div class="row list-action-row list-action-template d-none">
                    <div class="col-8 form-group">
                        <div class="d-flex">
                            <input class="form-control mr-2 text-center" type="number" name="dimensions[(idx)][0]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                            <input class="form-control mr-2 text-center" type="number" name="dimensions[(idx)][1]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                            <input class="form-control text-center" type="number" name="dimensions[(idx)][2]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                        </div>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-secondary list-action-btn m-0" type="button" data-action="add">Добавить</button>
                        <button class="btn btn-outline-secondary text-danger list-action-btn m-0 d-none" type="button" data-action="remove">Удалить</button>
                    </div>
                </div>

                <div class="list-action-rows">
                    <div class="row list-action-row">
                        <div class="col-8 form-group">
                            <div class="d-flex">
                                <input class="form-control mr-2 text-center" type="number" name="dimensions[0][0]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                                <input class="form-control mr-2 text-center" type="number" name="dimensions[0][1]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                                <input class="form-control text-center" type="number" name="dimensions[0][2]" placeholder="0" min="0" required_ data-invalid="#error-size"/>
                            </div>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-secondary list-action-btn m-0" type="button" data-action="add">Добавить</button>
                            <button class="btn btn-outline-secondary text-danger list-action-btn m-0 d-none" type="button" data-action="remove">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
            <span class="invalid-feedback" id="error-size">
        </div>
    </div>

    <script>

        var ListAction = function (container, options = { }) {

            var self = this;

            this.options = {
                ...options
            };

            this.container = container;
            this.rows = [];

            this.init = () => {

                var self = this;
                console.log('init')
                this.rows = this.container.querySelectorAll('.list-action-rows .list-action-row');

                this.container.querySelectorAll('.list-action-btn').forEach(el => {
                    el.removeEventListener('click', this.clickHandler, false);
                    el.addEventListener('click', this.clickHandler, false);
                });

                return this;
            };

            this.clickHandler = (e) => {
                switch (e.target.dataset.action) {
                    case 'add':
                        this.addRow(e.target);
                        break;
                    case 'remove':
                        self.removeRow(e.target);
                        break;
                }   
                
            };

            this.addRow = (btn) => {
                const template = this.container.querySelector('.list-action-template')?.cloneNode(true);
                const target = this.container.querySelector('.list-action-rows');
                if (template && target) {
                    const idx = this.rows.length;
                    template.dataset.rowIdx = idx+1;
                    template.classList.remove('.list-action-template', 'd-none');
                    template.querySelector('.list-action-btn[data-action="remove"]')?.classList.add('d-none');

                    const html = template.outerHTML.replace(/\(idx\)/g, idx);
                    target.insertAdjacentHTML('BEFOREEND', html);
                    btn.parentNode.querySelector('.list-action-btn[data-action="remove"]')?.classList.remove('d-none');
                    btn.classList.add('d-none');

                    this.init();
                }
            };

            this.removeRow = (btn) => {
                const parent = btn.closest('.list-action-row');
                parent?.remove();

                this.init();
            };

            return this.init();
        };

        var container = document.querySelector('.list-action');
        var list = new ListAction(container, { });
        
    </script>

    <div class="row">
        <div class="col-3 form-group">
            <label for="weight">Вес, кг.</label>
            <input class="form-control" name="weight" placeholder="0.000" required_ data-invalid="#error-weight" />
            <span class="invalid-feedback" id="error-weight">
        </div>
        <div class="col-4 form-group">
            <label for="weight">Кол-во товара</label>
            <input class="form-control" name="product_count" type="number" placeholder="0" required_ data-invalid="#error-product-count" />
            <span class="invalid-feedback" id="error-product-count">
        </div>
        <div class="col-3 form-group">
            {$qtyPerPallet}
        </div>
        <div class="col-2 form-group">
            {$measureUnit}
        </div>
    </div>

    <hr class="mt-4">

    <div class="margin-top-2x h5">Закупка, цена</div>
    <div class="row">
        <div class="col-12 col-md-4 form-group">
            <div class="input-group">
                <input class="form-control" name="purchase_price" placeholder="0.00" required_ data-invalid="#error-purchase-price"/>
                {$purchaseCurrency}
            </div>
            <span class="invalid-feedback" id="error-purchase-price">
        </div>
    </div>

    <div class="margin-top-2x h5">Оптовые продажи</div>
    <div class="row">
        <div class="col-12 col-md-3 form-group">
            <label for="wholesale_count">От шт.</label>
            <input class="form-control" name="wholesale_count" placeholder=" " required_ data-invalid="#error-wholesale-count"/>
            <span class="invalid-feedback" id="error-wholesale-count">
        </div>
        <div class="col-12 col-md-3 form-group">
            <label for="wholesale_price">Мин. цена, круп. ОПТ</label>
            <input class="form-control" name="wholesale_min_price" placeholder=" " required_ data-invalid="#error-wholesale-min-price"/>
            <span class="invalid-feedback" id="error-wholesale-min-price">
        </div>
        <div class="col-12 col-md-3 form-group">
            <label for="small_wholesale_count">От шт., мелк. ОПТ</label>
            <input class="form-control" name="small_wholesale_count" placeholder=" " required_ data-invalid="#error-small-wholesale-count"/>
            <span class="invalid-feedback" id="error-small-wholesale-count">
        </div>
        <div class="col-12 col-md-3 form-group">
            <label for="small_wholesale_price">Цена, мелк. ОПТ</label>
            <input class="form-control" name="small_wholesale_price" placeholder=" " required_ data-invalid="#error-small-wholesale-price"/>
            <span class="invalid-feedback" id="error-small-wholesale-price">
        </div>
    </div> 
{*
Ключевые фразы по товару, разделенные запятыми (до 10 фраз): (introtext)
Кол-во товара (product_count)

Ссылка на видео с YouTube: (popup Ссылка на видео с YouTube << https://youtu.be/t_jHrUE5IOk >>.)

Новый товар
Популярный товар
Особый товар

фото
 *}

    <style>
    .fs-photo-gallery .fs-photo-thumbs-placeholder {
        border: 2px dashed silver;
        border-radius: 10px;
        padding: 20px 10px;
        color: #686868; 
        font-size: 1.1rem; 
        text-align: center;
    }
    .fs-photo-gallery .fs-file-action[data-action]  {
        cursor: pointer
    }
    .fs-photo-gallery .fs-photo-thumb {
        position: relative
    }

    .btn-custom {
        font-size: 1.1em;
        margin: 0!important;
        padding: 0 10px;
        height: 34px!important;
        line-height: 34px!important;
        /* background: #fff!important; */
    }
    </style>

    <style>

    .fls-gallery 
            .glr-panel-actions {
                display: flex;
                margin-bottom: 40px!important;
            }

    .fls-gallery 
        .glr-panel-actions 
            > .nav {
                flex: 1 1 auto!important;
                line-height: 1.5!important
            }

    .fls-gallery 
        .glr-panel-actions 
            > .nav
                .nav-item {
                    margin-right: 10px!important
                }

    .fls-gallery 
        .glr-panel-actions 
            .glr-panel-action {
                display: flex;
                align-items: center!important;
                cursor: pointer;
                border-radius: 4px;
                padding: 8px 8px;
                outline: 1px solid #c0c0c033;
                box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
                background: #fff
            }

    .fls-gallery 
        .glr-panel-actions 
            .glr-panel-action:hover {
                opacity: .8
            }

    .fls-gallery 
        .glr-panel-actions 
            .glr-panel-action input[type=checkbox] {
                width: 1rem; 
                height: 1.1rem;
            }

    .fls-gallery 
        .glr-panel-actions 
            .glr-panel-action 
                > i[class^=icon-] {
                    font-size: 1rem
                }

    .glr-thumb-check {
        position: absolute;
        top: 10px;
        left: 8px;
        z-index: 1123;
        /* font-size: 1.2em; */
        /* background: #000000bd; */
        /* padding: 1px; */
        /* border-radius: 2px; */
    }

    input.glr-thumb-check {
        opacity: .6;
        width: 1rem;
        height: 1.1rem;
    }

    .glr-thumb.tools-shown input.glr-thumb-check,
    input.glr-thumb-check:checked,
    input.glr-thumb-check:hover {
        opacity: 1
    }

    .glr-thumb-tools {
        display: none
    }

    .glr-thumb.tools-shown .glr-thumb-tools, 
    .glr-thumb.tools-shown .glr-thumb-tools .glr-thumb-backdrop {
        display: block
    }

    .glr-thumb-backdrop {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #00000040;
    }

    .glr-placeholder {
        min-height: 100px;
        border: 2px dashed #0000004f;
        background: #00000008;
        border-radius: 5px;
        font-size: 1.1em;
    }

    .glr-placeholder.show {
        display: flex;
    }
    </style>

    <div class="margin-top-2x h5">Розница, цена</div>
    <div class="row">
        <div class="col-4 form-group">
            <div class="input-group">
                <input class="form-control" name="price" placeholder="0.00" required_ data-invalid="#error-price"/>
                {$salesCurrency}
            </div>
            <span class="invalid-feedback" id="error-price">
        </div>
    </div>

    <hr class="mt-4">

    <div class="margin-top-2x mb-4 h3">Фотографии</div>

    {'!flsGetFiles' | snippet : [
        'resource' => 131,
        'source' => 3,
        'container' => 'imgs/1'
    ]}

    {'!flsGetFiles' | snippet : [
        'resource' => 132,
        'source' => 3,
        'container' => 'imgs/1',
        'validation' => [
            'types' => ['image/jpeg', 'image/jpg', 'image/png'],
            'maxSize' => 10,
            'minSize' => 0,
            'maxCount' => 5,
        ],
        'autoLoadList' => 0,
        'sortableJsEnabled' => 1,
        'hashToPlaceholder' => 'photos.hash',

        'thumbParams' => [
            'w' => 1000,
            'h' => 666,
            'q' => 100,
            'f' => 'jpeg',
            'far' => 'C',
            'wmi' => "assets/imgs/watermark/water-lg.png|C|80"
        ],
        
        'tplThumb' => '<div class="col-6 col-md-3 mb-4">
            <div class="glr-thumb shadow-sm position-relative">

                <div class="overflow-hidden rounded position-relative">

                    <div class="glr-thumb-tool">
                        <input class="glr-thumb-check" type="checkbox" id="ex-check-{$id}">
                    </div>

                    <div class="glr-thumb-tools" style="pointer-events: none!important">

                        <div class="glr-thumb-backdrop" style="
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: #00000040;
                        "></div>


                        <div class="" style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            z-index: 111111;
                            background: #0000008a;
                            padding: 3px;
                            color: #fff;
                            text-align: center;
                        ">
                            <div class="">Заменить</div>
                            <div class="">Удалить</div>
                        </div>

                        <div class="icon-zoom-in d-none"></div>

                    </div>

                    <img class="" src="{$url}" />

                </div>

            </div>
        </div>',

        'tpl' => '@INLINE  <div class="col-6 col-md-3 mb-4">
            <div class="glr-thumb shadow-sm position-relative">

                <div class="overflow-hidden rounded position-relative">

                    <div class="glr-thumb-tool">
                        <input class="glr-thumb-check" type="checkbox" id="ex-check-{$id}">
                    </div>

                    <div class="glr-thumb-tools" style="pointer-events: none!important">

                        <div class="glr-thumb-backdrop" style="
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: #00000040;
                        "></div>


                        <div class="" style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            z-index: 111111;
                            background: #0000008a;
                            padding: 3px;
                            color: #fff;
                            text-align: center;
                        ">
                            <div class="">Заменить</div>
                            <div class="">Удалить</div>
                        </div>

                        <div class="icon-zoom-in d-none"></div>

                    </div>

                    <img class="" src="{$url}" />

                </div>

            </div>
        </div>',

        'tplPlaceholder' => '@INLINE 
            <div class="text-center w-100">
                Переместите сюда или&nbsp;<a class="text-decoration-underline fls-action" href="javascript:" data-action="select">выберите</a>&nbsp;с компьютера
            </div>
        ',

        'tplThumbs' => '@INLINE 
            <div class="glr-panel-actions bg-light py-2 px-1 border-bottom">

                <ul class="nav">
                    <li class="nav-item">
                        <div class="glr-panel-action" data-action="toggleCheckAll">
                            <input class="" type="checkbox" id="ex-check">&nbsp;&nbsp;
                            <label class="d-none d-xxl-inline-block" for="ex-check">Выбрать все</label>
                        </div>
                    </li>

                    <li class="nav-item">
                        <div class="glr-panel-action text-warning d-none" data-action="remove">
                            <i class="icon-trash-2"></i>&nbsp;&nbsp;(<span class="remove-count"></span>) Удалить выбранные
                        </div>   
                    </li>
                </ul>

                <div class="">
                    <div class="glr-panel-action" data-action="refresh">
                        <i class="icon-refresh-ccw"></i>&nbsp;&nbsp;<span class="d-none d-xxl-inline">Обновить</span>
                    </div>
                </div>

            </div>

            <div class="glr-thumbs-grid row" style="min-height: 150px">
                {$output}
            </div>
        ',

        'tplWrapper' => '@INLINE <div class="fls-gallery" id="fls-container-{$hash}">
            <div class="glr-thumbs-container">
                {$thumbs}

                <div class="glr-panel-info mb-4">
                <div class="text-end">
                    <b>Всего:</b> <span class="">{$totalCount}</span> фотографий
                </div>
            </div>

                <div class="glr-upload-progress fw-bolder">1 из 5 фотографий загружаются...</div>

                <hr class="mt-4" />

                <div class="row">
                    <div class="col-12 justify-content-center justify-content-xxl-start">
                        <button class="btn btn-info fls-action-btn" type="button" data-action="select"><i class="icon-upload"></i>&nbsp;Выбрать c компьютера</button>
                    </div>
                </div>
            </div>
        </div>'
    ]}

    {set $images = [
        [
            'checked' => true,
            'file' => '5b55cf7bfe1483d9681f8f474c82109b.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-481/5b55cf7bfe1483d9681f8f474c82109b.jpeg'
        ],

        [
            'file' => '891e16c38fd01d982bad405db5922a6a.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-481/891e16c38fd01d982bad405db5922a6a.jpeg'
        ],

        [
            'file' => 'bc7bc569fd82264fae3d8e70e2d9ec49.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-481/bc7bc569fd82264fae3d8e70e2d9ec49.jpeg'
        ],

        [
            'checked' => true,
            'file' => 'e2a6dcfc0c1fcd0c0669442c5cfa283a.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-481/e2a6dcfc0c1fcd0c0669442c5cfa283a.jpeg'
        ],

        [
            'file' => '4841ad55b79818af82fd8d661ab48513.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-503/4841ad55b79818af82fd8d661ab48513.jpeg'
        ],

        [
            'file' => '5e5353e60b7294da95579d80a20acb68.jpeg',
            'src' => 'https://309921.selcdn.ru/l-s-ru/news/news-503/5e5353e60b7294da95579d80a20acb68.jpeg'
        ],
    ]}

    {set $showImages = true}
{* 
    <div class="fls-gallery" id="fls-container-{$hash}">

        <div class="glr-placeholder collapse align-items-center {!$showImages ? ' d-flex' : ''}">
            <div class="text-center w-100">
                Переместите сюда или&nbsp;<a class="text-decoration-underline" href="javascript:">выберите</a>&nbsp;с компьютера
            </div>
        </div>

        <div class="glr-thumbs-container collapse{$showImages ? ' show' : ''}">

            <div class="glr-panel-actions bg-light py-2 px-1 border-bottom">

                <ul class="nav">
                    <li class="nav-item">
                        <div class="glr-panel-action" data-action="toggleCheckAll">
                            <input class="" type="checkbox" id="ex-check">&nbsp;&nbsp;
                            <label class="d-none d-xxl-inline-block" for="ex-check">Выбрать все</label>
                        </div>
                    </li>

                    <li class="nav-item">
                        <div class="glr-panel-action text-warning d-none" data-action="remove">
                            <i class="icon-trash-2"></i>&nbsp;&nbsp;(<span class="remove-count"></span>) Удалить выбранные
                        </div>   
                    </li>
                </ul>

                <div class="">
                    <div class="glr-panel-action" data-action="refresh">
                        <i class="icon-refresh-ccw"></i>&nbsp;&nbsp;<span class="d-none d-xxl-inline">Обновить</span>
                    </div>
                </div>

            </div>

            <div class="glr-panel-info mb-4">
                <div class="text-end">
                    <b>Всего:</b> <span class="">{count($images)}</span> фотографий
                </div>
            </div>

            <div class="glr-thumbs-grid row" style="min-height: 150px">
                        
                {foreach $images as $image}
                       
                    {set $index = $image@index}

                    <div class="col-6 col-md-3 mb-4">
                        <div class="glr-thumb shadow-sm position-relative tools-shown_">


                            <div class="overflow-hidden rounded position-relative">

                                <div class="glr-thumb-tool">
                                    <input class="glr-thumb-check" type="checkbox" id="ex-check-{$index}" {$image.checked ? ' checked' : ''}>
                                </div>

                                <div class="glr-thumb-tools" style="pointer-events: none!important">

                                    <div class="glr-thumb-backdrop" style="
                                        position: absolute;
                                        top: 0;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        background: #00000040;
                                    "></div>


                                    <div class="" style="
                                        position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 111111;
    background: #0000008a;
    padding: 3px;
    color: #fff;
    text-align: center;
                                    ">
                                        <div class="">Заменить</div>
                                        <div class="">Удалить</div>
                                    </div>

                                    <div class="icon-zoom-in d-none"></div>

                                </div>

                                <img class="" src="{$image.src}" />

                            </div>

                        </div>
                    </div>

                {/foreach}
                
            </div>

            <hr class="mt-4" />

            <div class="row">
                <div class="col-12 justify-content-center justify-content-xxl-start">
                    <button class="btn btn-info fls-action-btn" type="button" data-action="select"><i class="icon-upload"></i>&nbsp;Выбрать c компьютера</button>
                </div>
            </div>

        </div>

    </div> *}

    {ignore}
    <script>

    // let thumbs = document.querySelectorAll('.fls-gallery .glr-thumbs .glr-thumb');

    let handlers = {

        actions: {

            setCheckedAll(checked) {
                let thumbs = document.querySelectorAll('.fls-gallery .glr-thumb');
                if (checked) {
                    thumbs.forEach(elm => {
                        elm.querySelector('.glr-thumb-check').checked = true;
                    })
                } else {
                    thumbs.forEach(elm => {
                        elm.querySelector('.glr-thumb-check').checked = false;
                    });
                }

                this.toggleActionCheckedAll();
            },

            toggleActionCheckedAll() {
                let thumbs = document.querySelectorAll('.fls-gallery .glr-thumb');
                let checkedThumbs = Array.from(thumbs).filter(
                    elm => elm.querySelector('.glr-thumb-check:checked')
                );
                
                let toggleCheckAll = document.querySelector('.fls-gallery .glr-panel-actions .glr-panel-action[data-action=toggleCheckAll]');
                let toggleCheckAllInput = toggleCheckAll.querySelector('input');
                let toggleCheckAllLabel = toggleCheckAll.querySelector('label');

                let actionRemoveChecked = document.querySelector('.fls-gallery .glr-panel-actions .glr-panel-action[data-action=remove]');

                if (checkedThumbs.length > 0) {
                    toggleCheckAllInput.checked = true;

                    if (thumbs.length > checkedThumbs.length) {
                        toggleCheckAllLabel.innerText = 'Выбрать все';
                    } else {
                        toggleCheckAllLabel.innerText = 'Снять все';
                    }

                    actionRemoveChecked.classList.remove('d-none');
                    actionRemoveChecked.querySelector('.remove-count').innerText = checkedThumbs.length;
                } else {
                    toggleCheckAllInput.checked = false;
                    toggleCheckAllLabel.innerText = 'Выбрать все';
                    actionRemoveChecked.classList.add('d-none');
                }
            }

        }

    };

    webEx.Events.add(
        'mouseover mouseout'
        , '.fls-gallery .glr-thumb'
        , function (evt) {  
            // return;
            let tools = this.querySelector('.glr-thumb-tools');
            let thumb = this.closest('.glr-thumb');

            switch (evt.type) {
                case 'mouseover':
                    thumb.classList.add('tools-shown');
                    break;

                case 'mouseout':
                    thumb.classList.remove('tools-shown');
                    break;
            }
        }
    );

    webEx.Events.add(
        'change'
        , '.fls-gallery .glr-thumb .glr-thumb-check'
        , function (evt) {  
            handlers.actions.toggleActionCheckedAll();
        }
    );

    webEx.Events.add(
        'change'
        , '.fls-gallery .glr-panel-actions .glr-panel-action[data-action] input'
        , function (evt) {  
            let parent = this.parentNode;
                console.log(evt.type, parent.dataset.action)
            switch (parent.dataset.action) {

                case 'toggleCheckAll':
                    if (evt.type == 'change') {

                        handlers.actions.setCheckedAll(this.checked);
                                    
                    }
                    break;
                
            }

        }
    );

    </script>
    {/ignore}

    <hr class="margin-top-2x mb-4">

    <div class="row margin-top-2x">
        <div class="col-12 form-group">
            {$useTypes}
        </div>
    </div>

    <hr class="mt-4">

    <div class="row mt-5 mb-4">
        <div class="col-12 form-group">
            <div class="custom-control custom-switch">
                <input class="custom-control-input" type="checkbox" name="published" value="1" id="ex-published" data-invalid="#error-published" checked >
                <label class="custom-control-label" for="ex-published">Разместить на сайте</label>
                <span class="invalid-feedback" id="error-published">
            </div>
            <div class="form-text">Товар будет размещен в категориях на сайте.</div>
        </div>
    </div>
    
    <hr class="mb-4">

    <div class="row">
        <div class="col-12 form-group text-center">
            <button class="btn btn-lg btn-primary custom-disabled" type="submit">Добавить товар</button>
        </div>
    </div>

</form>