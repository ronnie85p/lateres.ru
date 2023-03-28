{set $profile = [
    'type' => 71,
    'fullname' => $_modx->user.fullname,
    'mobilephone' => $_modx->user.mobilephone,
]}

<div class="row form-group">
    <div class="col-8">
        <h4>Мой адрес</h4>
    </div>
</div>

<div class="row">
    <div class="col-8 form-group">
        <label for="address_city">Регион <span style="font-weight: 300">(область, край, республика и т.п)</span> <span class="text-danger">*</span></label>
        <input class="form-control msp-delivery-city delivery-address" name="region" autocomplete="off" placeholder="Московская область">
        <span class="invalid-feedback"></span>
    </div>
    <div class="col-8 form-group">
        <label for="address_city">Населенный пункт <span style="font-weight: 300">(город, поселение и т.п)</span> <span class="text-danger">*</span></label>
        <input class="form-control msp-delivery-city delivery-address" name="city" autocomplete="off" placeholder="город Солнечногорск">
        <span class="invalid-feedback"></span>
    </div>
    <div class="col-6 form-group">
        <label for="address_street">Улица <span style="font-weight: 300">(проезд, переулок и т.п)</span> <span class="text-danger">*</span></label>
        <input class="form-control msp-delivery-street delivery-address" name="street" autocomplete="off" placeholder="улица Баранова">
        <span class="invalid-feedback"></span>
    </div>
    <div class="col-2 form-group">
        <label for="address_building">№ дома <span class="text-danger">*</span></label>
        <input class="form-control msp-delivery-building delivery-address" name="building" autocomplete="off" placeholder="12a">
        <span class="invalid-feedback"></span>
    </div>
</div>
    
<div class="row">
    <div class="col-8 form-group">
        <label for="delivery_address_comment" style="opacity: .9">Дополнительные инструкции:</label>
        <textarea class="form-control mt-2" name="comment" placeholder="Если необходимо, то предоставьте подробную информацию по доставке или оставьте комментарий" maxlength="1500" rows="3"></textarea>
    </div>
</div>

<hr class="mt-4 margin-bottom-2x">

<h5>Получатель</h5>

<div class="row">
    <div class="col-8">
        <div class="alert py-3" style="background: #f5f5f5;">
            <div>{$profile.type | resource : 'longtitle'}</div>
            <div><i class="icon-user"></i> {$profile.fullname}</div>
            <div><i class="icon-phone"></i> {$profile.mobilephone}</div>
            <hr class="my-3">
            <a class="float-end" href="{}">Изменить</a>
            <div class="clearfix"></div>
        </div>
    </div>
</div>

{* I вариант
1 Заполнить адрес из профиля (регион, город и т.п.)
2 Заполнить получателя из профиля (имя, телефон и т.п.)
* сохранить в таблице (при изменении данных профиля, данные адреса не изм)

II вариант
1 Заполнить адрес и получателя из профиля
* сохранить в таблице *}