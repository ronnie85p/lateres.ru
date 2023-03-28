<form class="validate">

    <div class="p-2 border rounded d-flex align-items-center justify-content-center margin-bottom-2x" style="height: 150px">
        <p class="">Vendor's Logo will be here</p>
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