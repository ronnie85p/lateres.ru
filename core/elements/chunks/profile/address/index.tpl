<form class="wf-profile validate">

    <input type="hidden" name="action" value="profile/update" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="row form-group">
        <div class="col-9">
            <label for="region">Регион</label>
            <input class="form-control" name="region"> 
        </div>
        <div class="col-3">
            <label for="index">Индекс</label>
            <input class="form-control" name="index"> 
        </div>
    </div>

    <div class="row form-group">
        <div class="col-12">
            <label for="city">Город</label>
            <input class="form-control" name="region"> 
        </div>
    </div>

    <div class="row form-group">
        <div class="col-9">
            <label for="street">Улица</label>
            <input class="form-control" name="street"> 
        </div>
        <div class="col-3">
            <label for="building">Дом</label>
            <input class="form-control" name="building"> 
        </div>
    </div>

    <hr class="my-2">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>