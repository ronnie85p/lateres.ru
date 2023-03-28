<form class="mshop-form validate">

    <input type="hidden" name="action" value="product/form/save"  />
    <input type="hidden" name="type" value="features" />
    <input type="hidden" name="hash" value="{$.post.hash}" />

    <div class="row">
        <div class="col-6 form-group">
            <label for="product_material">Материал</label>
            <input class="form-control product-options" name="product_material" required_ data-invalid="#error-product-material" data-options='{
                "name": "product_material",
                "action": "product/options/getList"
            }'/>
            <span class="invalid-feedback" id="error-product-material">
        </div>
        <div class="col-6 form-group">
            <label for="product_type">Тип изделия</label>
            <input class="form-control product-options" name="product_type" required_ data-invalid="#error-product-type" data-options='{
                "name": "product_type",
                "action": "product/options/getList"
            }' />
            <span class="invalid-feedback" id="error-product-type">
        </div>
    </div>

    <div class="row">
        <div class="col-6 form-group">
            <label for="product_brand_strength">Марка прочности</label>
            <input class="form-control product-options" name="product_brand_strength" required_ data-invalid="#error-brand-strength" data-options='{
                "name": "product_brand_strength",
                "action": "product/options/getList"
            }' />
            <span class="invalid-feedback" id="error-brand-strength">
        </div>
        <div class="col-6 form-group">
            <label for="qty_per_pallet">Кол-во на поддоне</label>
            <input class="form-control product-options" name="qty_per_pallet" required_ data-invalid="#error-qty-per-pallet" data-options='{
                "name": "qty_per_pallet",
                "action": "product/options/getList"
            }' />
            <span class="invalid-feedback" id="error-qty-per-pallet">
        </div>
    </div>


    <div class="row">
        <div class="col-6 form-group">
            <label for="color">Цвет</label>
            <input class="form-control product-options" name="color" required_ data-invalid="#error-color" data-options='{
                "name": "color",
                "action": "options/getList"
            }' />
            <span class="invalid-feedback" id="error-color">
        </div>
        <div class="col-6 form-group">
            <label for="size">Размер (Ш x В x Д)</label>
            <div class="d-flex">
                <input class="form-control mr-2" name="width" placeholder="Ширина" required_ data-invalid="#error-size"/>
                <input class="form-control mr-2" name="height" placeholder="Высота" required_ data-invalid="#error-size"/>
                <input class="form-control" name="length" placeholder="Длина" required_ data-invalid="#error-size"/>
            </div>
            <span class="invalid-feedback" id="error-size">
        </div>
    </div>

        <div class="row margin-top-2x">
        <div class="col-2 form-group">
            <label for="unit_measure">Ед. измерения</label>
            <input class="form-control product-options" name="unit_measure" required_ data-invalid="#error-unit-measure" data-options='{
                "name": "unit_measure",
                "action": "product/options/getList"
            }'/>
            <span class="invalid-feedback" id="error-unit-measure">
        </div>
        <div class="col-6 form-group">

        </div>
    </div>  

    <hr class="margin-top-2x mb-2">

    <div class="row">
        <div class="col-12 text-right">
            <button class="btn btn-primary custom-disabled_ nav-btn" type="submit">Продолжить <i class="icon-chevron-right nav-icon"></i></button>
        </div>
    </div>

</form>