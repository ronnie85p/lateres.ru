<form class="mshop-form validate">

    <input type="hidden" name="action" value="product/form/save"  />
    <input type="hidden" name="type" value="prices" />
    <input type="hidden" name="hash" value="{$.post.hash}" />


    <div class="row form-group">
        <div class="col-6">
            <label for="purchase_price">Цена закупки</label>
            <input class="form-control" name="purchase_price" required_ data-invalid="#error-purchase-price"/>
            <span class="invalid-feedback" id="error-purchase-price">
        </div>
        <div class="col-6">
            <label for="purchase_currency">Валюта закупки</label>
            <input class="form-control" name="purchase_currency" required_ data-invalid="#error-purchase-currency"/>
            <span class="invalid-feedback" id="error-purchase-currency">
        </div>
    </div>  

    <div class="row form-group">
        <div class="col-6">
            <label for="wholesale_price">Оптовая цена (мин)</label>
            <input class="form-control" name="wholesale_min_price" required_ data-invalid="#error-wholesale-min-price"/>
            <span class="invalid-feedback" id="error-wholesale-min-price">
        </div>
        <div class="col-6">
            <label for="wholesale_count">Кол-во (крупный ОПТ)</label>
            <input class="form-control" name="wholesale_count" required_ data-invalid="#error-wholesale-count"/>
            <span class="invalid-feedback" id="error-wholesale-count">
        </div>
    </div>  

    <div class="row form-group">
        <div class="col-6">
            <label for="small_wholesale_price">Цена (мелкий ОПТ)</label>
            <input class="form-control" name="small_wholesale_price" required_ data-invalid="#error-small-wholesale-price"/>
            <span class="invalid-feedback" id="error-small-wholesale-price">
        </div>
        <div class="col-6">
            <label for="small_wholesale_count">Кол-во (мелкий ОПТ)</label>
            <input class="form-control" name="small_wholesale_count" required_ data-invalid="#error-small-wholesale-count"/>
            <span class="invalid-feedback" id="error-small-wholesale-count">
        </div>
    </div>  

    <hr class="margin-top-2x mb-2">

    <div class="row">
        <div class="col-12 text-right">
            <button class="btn btn-primary custom-disabled_ nav-btn" type="submit">Продолжить <i class="icon-chevron-right nav-icon"></i></button>
        </div>
    </div>

</form>