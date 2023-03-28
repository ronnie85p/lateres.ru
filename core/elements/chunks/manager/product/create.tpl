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

<form class="wf-shp-form validate no-submit">

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

    <hr class="my-4">

    <div class="row margin-top-2x">
        <div class="col-8">
            <div class="form-group">
                <label for="pagetitle">Наименование {$fields.pagetitle.label}</label>
                <input class="form-control check-resource" name="pagetitle" placeholder=" " autocomplete="off" 
                    data-parent="#"
                    data-char-counter="" 
                    data-invalid="#error-pagetitle"
                    {$fields.pagetitle.attrs} />
                <span class="invalid-feedback" id="error-pagetitle">
            </div>
        </div>
        <div class="col-4">
            <div class="form-group">
                <label for="article">Aртикль {$fields.article.label}</label>
                <input class="form-control product-article" name="article" placeholder=" " autocomplete="off" 
                    data-invalid="#error-article"
                    data-char-counter="" 
                    data-invalid="#error-pagetitle" 
                    {$fields.article.attrs} />
                <span class="invalid-feedback" id="error-article">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="longtitle">Полное наименование {$fields.longtitle.label}</label>
                <input class="form-control" name="longtitle" placeholder=" " 
                    data-char-counter="" 
                    data-invalid="#error-longtitle"
                    {$fields.longtitle.attrs} />
                <span class="invalid-feedback" id="error-longtitle">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label for="description">Краткое описание {$fields.description.label}</label>
                <input class="form-control" name="description" placeholder=" "
                    data-char-counter="" 
                    data-invalid="#error-description"
                    {$fields.description.attrs} />
                <span class="invalid-feedback" id="error-description">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="description">Описание {$fields.content.label}</label>
                <textarea class="form-control" name="content" placeholder=" " id="textarea-content" rows="10"
                    data-tinymce="" 
                    data-invalid="#error-content"
                    {$fields.content.attrs}></textarea>
                <span class="invalid-feedback" id="error-content">
            </div>
        </div>
    </div>

    <hr class="my-4">

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="description">Преимущества {$fields.benefits.label}</label>
                <textarea class="form-control" name="benefits" placeholder=" " id="textarea-benefits" rows="10" 
                    data-tinymce=""
                    data-invalid="#error-benefits"
                    {$fields.benefits.attrs}></textarea>
                <span class="invalid-feedback" id="error-benefits"></span>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="introtext">Ключевые фразы по товару, разделенные запятыми (до 10 фраз) {$fields.introtext.label}</label>
                <input class="form-control" name="introtext" placeholder=" " 
                    data-inputtags="" 
                    data-invalid="#error-introtext"
                    data-maxcount="10"
                    {$fields.introtext.attrs} />
                <span class="invalid-feedback" id="error-introtext"></span>
            </div>
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