<form class="mshop-form validate">

    <input type="hidden" name="action" value="delivery/update">
    <input type="hidden" name="hash" value="{$hash}">
    <input type="hidden" name="id" value="{$delivery.id}" />

    <div class="row margin-bottom-2x">
        <div class="col-12">
            <img src="{$delivery.logo}" />
            <div class="float-right">
            {if $delivery.active}
                <span class="fw-bolder badge badge-success"><i class="icon-eye"></i> Активна</span>
            {else}
                <span class="fw-bolder badge badge-danger p-2"><i class="icon-eye-off"></i> Не активна</span>
            {/if}
            </div>
        </div>
    </div>

    <hr class="margin-bottom-2x mt-4">

    <div class="row">
        <div class="col-12 col-md-9 form-group">
            <label for="pagetitle">Название</label>
            <input class="form-control" name="pagetitle" value="{$delivery.name}" placeholder="" >
        </div>
        <div class="col-12 col-md-3 form-group">
            <label for="price">Стоимость</label>
            <input class="form-control" name="price" value="{$delivery.price}" placeholder="" >
        </div>
    </div>

    <div class="row">
        <div class="col-12 form-group">
            <label for="content">Описание:</label>
            <textarea class="form-control" rows="3" name="content" id="textarea-content" data-maxlength="1500" onready="tmceEditor.ready(this)">{$delivery.description}</textarea>
            <span class="form-error"></span>
        </div>
    </div>

    <hr class="margin-top-2x mb-4">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>