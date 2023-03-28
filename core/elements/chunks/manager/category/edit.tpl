{set $categories = '!pdoMenu' | snippet : [
    'parents' => '103',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

<script>

const isPlainObject = (obj) => {
    return obj && typeof obj === 'object' && !(obj instanceof Array);
};

const extend = (obj, obj2) => {
    for (let k in obj2) {
        let v = obj2[k];
        if (isPlainObject(obj[k]) && isPlainObject(v)) {
            v = extend(obj[k], v);
        }
        obj[k] = v;
    }

    return obj;
};

</script>

<form class="validate">

    <div class="row">
        <div class="col-6 form-group">
            <label for="category">Категория<span class="text-danger">*</span></label>
            <select class="form-control" name="parent" required>
                <option value="103">Главное меню</option>
                {$categories}
            </select>
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
            <textarea class="form-control" name="descripton" rows="" maxlength="200" required></textarea>
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="content">Описание<span class="text-danger">*</span></label>
            <textarea class="form-control" name="content" rows="7" maxlength="1500" required></textarea>
        </div>
    </div>

    <hr class="my-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-lg btn-primary custom-disabled" type="submit">Опубликовать</button>
        </div>
    </div>

</form>