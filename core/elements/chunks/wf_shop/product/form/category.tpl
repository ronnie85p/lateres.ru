<form class="mshop-form validate">

    <input type="hidden" name="action" value="product/form/save"  />
    <input type="hidden" name="type" value="category" />
    <input type="hidden" name="hash" value="{$.post.hash}" />

    <div class="row">
        <div class="col-12 col-md-5">
            <div class="form-group">
                {'pdoMenu' | snippet : [
                    'parents' => '103',
                    'level' => 1,
                    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
                    'tplOuter' => '@INLINE 
                        <label for="category">Категория</label>
                        <a class="icon-plus_ float-right text-muted" style="position: relative; top: 2px; text-decoration: none; font-size: 1em" href="#">Добавить</a>
                        <select class="form-control" name="category" required_ data-invalid="#error-category">
                            <option value="">-- Не выбрана</option>
                            {$wrapper}
                        </select>
                    '
                ]}
                <span class="invalid-feedback" id="error-category">
            </div>
            <div class="form-group">
                {'pdoMenu' | snippet : [
                    'parents' => '104',
                    'level' => 1,
                    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
                    'tplOuter' => '@INLINE 
                        <select class="form-control" name="category_group" required_ data-invalid="#error-category-group">
                            <option value="">-- Не выбрана</option>
                            {$wrapper}
                        </select>
                    '
                ]}
                <span class="invalid-feedback" id="error-category-group">
            </div>
        </div>
                
    </div>

    <div class="row margin-top-2x">
        <div class="col-12 col-md-4 form-group">
            <label for="vendor">Производитель</label>
            <a class="icon-plus_ float-right text-muted" style="position: relative; top: 2px; text-decoration: none; font-size: 1em" href="#">Добавить</a>
            <input class="form-control custom-select" name="vendor" id="vendor" autocomplete="off" placeholder="--Не выбран" required_ data-invalid="#error-vendor" data-select='{
                "action": "vendor/getList"
            }'/>
            <span class="invalid-feedback" id="error-vendor">
        </div>
        <div class="col-12 col-md-4 form-group">
            <label for="trademark">Торговая марка</label>
            <a class="icon-plus_ float-right text-muted" style="position: relative; top: 2px; text-decoration: none; font-size: 1em" href="#">Добавить</a>
            <input class="form-control custom-select" name="trademark" id="trademark" autocomplete="off" placeholder="--Не выбрана" required_ data-invalid="#error-trademark" data-select='{
                "action": "vendor/trademark/getList"
            }' />
            <span class="invalid-feedback" id="error-trademark">
        </div>
        <div class="col-12 col-md-4 form-group">
            <label for="made_in">Страна</label>
            <input class="form-control custom-select" id="made-in" name="made_in" autocomplete="off" placeholder="--Не выбрана" required_ data-invalid="#error-made-in" data-select='{
                "action": "country/getList"
            }' />
            <span class="invalid-feedback" id="error-made-in">
        </div>
    </div>

    <hr class="margin-top-2x mb-2">

    <div class="row">
        <div class="col-12 text-right">
            <button class="btn btn-primary custom-disabled_ nav-btn" type="submit">Продолжить <i class="icon-chevron-right nav-icon"></i></button>
        </div>
    </div>

</form>