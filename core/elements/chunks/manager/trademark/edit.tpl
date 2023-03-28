{set $vendors = '!pdoMenu' | snippet : [
    'parents' => '230',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

<form class="validate">

    <div class="row mb-4">
        <div class="col-6 form-group">
            <label for="parent">Производитель<span class="text-danger">*</span></label>
            <select class="form-control" name="parent" required>
                {$vendors}
            </select>
        </div>

        <div class="col-6">

        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="pagetitle">Название<span class="text-danger">*</span></label>
            <input class="form-control" name="pagetitle" value="" maxlength="115" required />
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="longtitle">Полное название<span class="text-danger">*</span></label>
            <input class="form-control" name="longtitle" value="" required />
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="description">Краткое описание<span class="text-danger">*</span></label>
            <textarea class="form-control" name="descripton" rows="2" maxlength="200" required></textarea>
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="content">Описание<span class="text-danger">*</span></label>
            <textarea class="form-control" name="content" rows="4" maxlength="200" required></textarea>
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="introtext">Ключевые фразы, разделенные запятыми (до 10 фраз)<span class="text-danger">*</span></label>
            <input class="form-control" name="introtext" value="" required />
        </div>
    </div>

    <hr class="my-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-lg btn-primary custom-disabled" type="submit">Добавить</button>
        </div>
    </div>

</form>