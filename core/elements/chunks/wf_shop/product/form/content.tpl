<form class="mshop-form validate">

    <input type="hidden" name="action" value="product/form/save"  />
    <input type="hidden" name="type" value="content" />
    <input type="hidden" name="hash" value="{$.post.hash}" />

    <div class="row form-group">
        <div class="col-8">
            <label for="pagetitle">Наименование</label>
            <input class="form-control product-check-exists" name="pagetitle" autocomplete="off" required_  data-invalid="#error-pagetitle" data-options='{
                "action": "product/checkExists",
                "parent": 122
            }' />
            <span class="invalid-feedback" id="error-pagetitle">
        </div>
        <div class="col-4">
            <label for="article">Aртикль</label>
            <input class="form-control product-article" name="article" autocomplete="off" data-invalid="#error-article"  data-options='{
                "action": "product/article/getGeneratedList",
                "vendorId": 1
            }' />
            <span class="invalid-feedback" id="error-article">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-12">
            <label for="longtitle">Полное наименование</label>
            <input class="form-control" name="longtitle" autocomplete="off" required_ data-invalid="#error-longtitle"/>
            <span class="invalid-feedback" id="error-longtitle">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-12">
            <label for="description">Краткое описание</label>
            <input class="form-control" name="description" autocomplete="off" required_ data-invalid="#error-description"/>
            <span class="invalid-feedback" id="error-description">
        </div>
    </div>

    <div class="row form-group margin-top-2x">
        <div class="col-12">
            <label class="label-lg-text" for="content">Подробное описание</label>
            <textarea class="form-control" name="content" id="textarea-content" rows="7" autocomplete="off" data-invalid="#error-content" onready="tmceEditor.ready(this, {  })"></textarea>
            <span class="invalid-feedback" id="error-content">
        </div>
    </div>

    <div class="row form-group margin-top-2x">
        <div class="col-12">
            <label class="label-lg-text" for="benefits">Преимущества</label>
            <textarea class="form-control" name="benefits" id="textarea-benefits" rows="7" autocomplete="off" data-invalid="#error-benefits" onready="tmceEditor.ready(this, {  })"></textarea>
            <span class="invalid-feedback" id="error-benefits">
        </div>
    </div>

    <hr class="margin-top-2x mb-2">

    <div class="row">
        <div class="col-12 text-right">
            <button class="btn btn-primary custom-disabled_ nav-btn" type="submit">Продолжить <i class="icon-chevron-right nav-icon"></i></button>
        </div>
    </div>

</form>