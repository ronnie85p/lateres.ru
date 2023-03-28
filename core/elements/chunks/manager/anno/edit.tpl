{set $categories = '!pdoMenu' | snippet : [
    'parents' => '362',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}" {$id == "'~ $resource.id ~'" ? " selected" : ""}>{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

{include 'file:chunks/manager/content.header.tpl'}

<form class="wf-ress-form validate no-submit">

    <input type="hidden" name="hash" value="{$hash}">
    <input type="hidden" name="action" value="adv/update">
    <input type="hidden" name="id" value="{$resource.id}">

    <div class="row">
        <div class="col-6 form-group">
            <label for="parent">Категория<span class="text-danger">*</span></label>
            <select class="form-control" name="parent" required>
                {$categories}
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="pagetitle">Заголовок{$validation.pagetitle.required ? ' <span class="text-danger">*</span>' : ''}</label>
                <input class="form-control check-resource" name="pagetitle" value="{$resource.pagetitle}" 
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
                <input class="form-control" name="longtitle" value="{$resource.longtitle}"
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
                    {$validation.description.required ? ' required' : ''}>{$resource.description}</textarea>
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
                    {$validation.content.required ? 'required' : ''} >{$resource.content}</textarea>
                <div class="invalid-feedback" id="error-content"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="introtext">Ключевые фразы, разделенные запятыми (до 10 фраз){$validation.textarea.required ? '<span class="text-danger">*</span>' : ''}</label>
                <input class="form-control" name="introtext" value="{$resource.introtext}" 
                    data-inputtags="" 
                    data-invalid="#error-introtext" 
                    {$validation.introtext.maxCount ? ' data-maxcount="' ~ $validation.introtext.maxCount ~ '"' : ''}  
                    {$validation.introtext.maxLength ? ' maxlength="' ~ $validation.introtext.maxLength ~ '"' : ''}  
                    {$validation.introtext.required ? 'required' : ''} />
                <div class="invalid-feedback" id="error-introtext"></div> 
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <label for="utube-video">Видео на YouTube</label>
                <input class="utube-video form-control" name="utube_video" value="{$resource.utube_video}" placeholder="Например: https://www.youtube.com/watch?v=qPeVoi6OmRc">
            </div>
        </div>
    </div>

    <hr class="my-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-lg btn-primary custom-disabled" type="submit">Сохранить изменения</button>
        </div>
    </div>

</form>