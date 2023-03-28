<form class="mshop-form validate">

    <input type="hidden" name="action" value="category/update">
    <input type="hidden" name="hash" value="{$hash}">
    <input type="hidden" name="id" value="{$category.id}" />

    <div class="row">
        <div class="col-12 col-md-6 form-group">
            <label for="parent">Категория</label>
            {'!pdoMenu' | snippet : [
                'parents' => 103,
                'resources' => '-' ~ $category.id,
                'level' => 1,
                'where' => ['class_key' => 'msCategory'],
                'tpl' => '@INLINE <option value="{$id}"{$id == "'~$category.parent~'" ? " selected" : ""}>{$menutitle}</option>',
                'tplOuter' => '@INLINE <select class="form-control" name="parent">
                    <option value="">Главное меню</option>
                    {$wrapper}
                </select>'
            ]}
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="pagetitle">Название</label>
            <input class="form-control" name="pagetitle" value="{$category.pagetitle}" placeholder="" >
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label class="text-dark" for="longtitle">Полное название:<span class="text-danger">*</span></label>
            <input class="form-control" name="longtitle" value="{$category.longtitle}" autocomplete="off" data-maxlength="115" />
            <span class="form-error"></span>
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label class="text-dark" for="description">Краткое описание:<span class="text-danger">*</span></label>
            <input class="form-control" name="description" value="{$category.description}" autocomplete="off" data-maxlength="200" data-toggle="tooltip" data-placement="top" />
            <span class="form-error"></span>
        </div>
    </div>
      		  
    <div class="row">
        <div class="col-12 form-group">
            <label class="text-dark" for="introtext">Ключевые фразы по разделу категории, разделенные запятыми (до 10 фраз):<span class="text-danger">*</span></label>
            <input class="form-control tagsinput" name="introtext" value="{$category.introtext}" autocomplete="off" data-maxtags="10" data-maxchars="255" />
            <span class="form-error"></span>
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="content">Описание:</label>
            <textarea class="form-control" rows="9" name="content" id="textarea-content" data-maxlength="1500" onready="tmceEditor.ready(this)">{$category.content}</textarea>
            <span class="form-error"></span>
        </div>
    </div>

    <div class="h5 margin-top-2x">Изображения</div>
    <div class="row">
        <div class="col-4">
            <img src="{$category.img}" />
        </div>
    </div>

    <hr class="margin-top-2x mb-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить изменения</button>
        </div>
    </div>

</form>