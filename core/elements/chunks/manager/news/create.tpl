{set $categories = '!pdoMenu' | snippet : [
    'parents' => '5',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

{set $subjects = '!pdoMenu' | snippet : [
    'parents' => '342',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

{set $productCategories = '!pdoMenu' | snippet : [
    'parents' => '103',
    'level' => 2,
    'displayStart' => 0,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>{$wrapper}',
    'tplParentRow' => '@INLINE <optgroup label="{$menutitle}">{$wrapper}</optgroup>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

{include 'file:chunks/manager/content.header.tpl'}

<form class="wf-ress-form validate no-submit">

    <input type="hidden" name="hash" value="{$hash}">
    <input type="hidden" name="action" value="news/create">

    <div class="row">
        <div class="col-8">
            <div class="form-group">
                <label for="parent">Категория{$validation.parent.required ? ' <span class="text-danger">*</span>' : ''}</label>
                <select class="form-control" name="parent" id="parent" data-invalid="#error-parent"{$validation.parent.required ? ' required' : ''}>
                    <option value="">-- Не выбрана</option>
                    {$categories}
                </select>
                <div class="invalid-feedback" id="error-parent"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-8">
            <div class="form-group">
                <label for="subject">Тема{$validation.subject.required ? ' <span class="text-danger">*</span>' : ''}</label>
                <select class="form-control" name="subject" data-invalid="#error-subject"{$validation.subject.required ? ' required' : ''}>
                    <option value="">-- Не выбрана</option>
                    {$subjects}
                </select>
                <div class="invalid-feedback" id="error-subject"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-8">
            <div class="form-group">
                <label for="products_category">Тип продукции{$validation.products_category.required ? ' <span class="text-danger">*</span>' : ''}</label>
                <select class="form-control" name="products_category" data-invalid="#error-products-category"{$validation.products_category.required ? ' required' : ''}>
                    <option value="">-- Не выбран</option>
                    {$productCategories}
                </select>
                <div class="invalid-feedback" id="error-products-category"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="pagetitle">Заголовок{$validation.pagetitle.required ? ' <span class="text-danger">*</span>' : ''}</label>
                <input class="form-control check-resource" name="pagetitle" value="" 
                    data-parent="#parent" 
                    data-char-counter="" 
                    data-invalid="#error-pagetitle" 
                    {$validation.pagetitle.maxLength ? ' maxlength="' ~ $validation.pagetitle.maxLength ~ '"' : ''} 
                    {$validation.pagetitle.required ? ' required' : ''} />
                <div class="invalid-feedback" id="error-pagetitle"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="longtitle">Подробный заголовок{$validation.longtitle.required ? '<span class="text-danger">*</span>' : ''}</label>
                <input class="form-control" name="longtitle" value=""
                    data-char-counter="" 
                    data-invalid="#error-longtitle"
                    {$validation.longtitle.maxLength ? ' maxlength="' ~ $validation.longtitle.maxLength ~ '"' : ''} 
                    {$validation.longtitle.required ? ' required' : ''} />
                <div class="invalid-feedback" id="error-longtitle"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="description">Описание{$validation.description.required ? '<span class="text-danger">*</span>' : ''}</label>
                <textarea class="form-control" name="description" rows="2"
                    data-char-counter="" 
                    data-invalid="#error-description" 
                    {$validation.description.maxLength ? ' maxlength="' ~ $validation.description.maxLength ~ '"' : ''} 
                    {$validation.description.required ? ' required' : ''}></textarea>
                <div class="invalid-feedback" id="error-description"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="content">Содержимое{$validation.content.required ? '<span class="text-danger">*</span>' : ''}</label>
                <textarea class="form-control" id="content" name="content" rows="15"
                    data-tinymce="" 
                    data-invalid="#error-content"
                    {$validation.content.maxLength ? ' maxlength="' ~ $validation.content.maxLength ~ '"' : ''}  
                    {$validation.content.required ? 'required' : ''} ></textarea>
                <div class="invalid-feedback" id="error-content"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="introtext">Ключевые фразы, разделенные запятыми (до 10 фраз){$validation.textarea.required ? '<span class="text-danger">*</span>' : ''}</label>
                <input class="form-control" name="introtext" value="" 
                    data-inputtags="" 
                    data-invalid="#error-introtext" 
                    {$validation.introtext.maxCount ? ' data-maxcount="' ~ $validation.introtext.maxCount ~ '"' : ''}  
                    {$validation.introtext.maxLength ? ' maxlength="' ~ $validation.introtext.maxLength ~ '"' : ''}  
                    {$validation.introtext.required ? 'required' : ''} />
                <div class="invalid-feedback" id="error-introtext"></div> 
            </div>
        </div>
    </div>

    <hr class="my-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-lg btn-primary custom-disabled_" type="submit">Опубликовать</button>
        </div>
    </div>

</form>