<style>
    .cart .cart-item:not(:last-child) {
        border-bottom: 1px solid #c0c0c01a!important
    }

    .input-counter {
        display: flex;
    }

    .input-counter .btn {
        border: 1px solid #ced4da!important
    }
</style>

<div class="h2 mt-2x">{$_modx->resource.pagetitle} ({$total.total})</div>

<div class="row">
    
    <div class="col-12 col-md-8">
     
        <div class="card mb-2 cart" id="cart">

            <div class="card-header">
                <div class="custom-control custom-checkbox" style="margin-bottom: 0!important">
                    <input class="custom-control-input cart-check-all" type="checkbox" id="ex-check">
                    <label class="custom-control-label" for="ex-check">Выбрать все</label>
                </div>
            </div>

            <div class="card-body py-4">

                {$output} 

            </div>

        </div>

        <button class="btn btn-success mt-2 mb-4" type="submit">Получить коммерческое предложение</button>
    
        <div class="shopping-cart-footer d-none d-md-block">
            <div class="column"><a class="btn btn-outline-secondary" href="{5 | url}">
                <i class="icon-arrow-left"></i>&nbsp;Продолжить покупки</a>
            </div>
            <div class="column"></div>
        </div>
      
    </div>
    
    <div class="col-12 col-md-4">
        <div class="sticky-top offset-top-1">
            <div class="widget widget-order-summary" id="cart-summary">
                {$summary}
            </div>
        </div>
    </div>
    
</div>