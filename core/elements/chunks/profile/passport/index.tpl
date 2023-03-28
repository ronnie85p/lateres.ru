{set $profile.passport_test = [
    'gender' => 1,
    'date_of_birth' => time(),
    'place_of_birth' => 'Moskow',
    'sitizenship' => 'Россия',
    'seria' => '12 04',
    'num' => '333333',
    'date_issued' => time(),
    'dep_issued' => 'Moskow GROVD',
    'dep_code' => '001-254',
    'place_of_reg' => 'Moskow'
]}

{set $countries = [
    'Россия'
]}

{set $profile.passport.date_of_birth = ($profile.passport.date_of_birth > 0 ? ($profile.passport.date_of_birth | date : 'Y-m-d') : '')}
{set $profile.passport.date_issued = ($profile.passport.date_issued > 0 ? ($profile.passport.date_issued | date : 'Y-m-d') : '')}

<form class="wf-profile validate">

    <input type="hidden" name="action" value="profile/update" />
    <input type="hidden" name="hash" value="{$hash}" />
    
    <div class="row form-group">
        <div class="col-12">
            <input class="form-control" value="{$_modx->user.fullname}" disabled />
        </div>
    </div>
    
    <hr class="mt-2 margin-bottom-2x">
    
    <div class="row form-group">
        <div class="col-3">
            <label for="gender">Пол<span class="text-danger">*</span></label>
            <select class="form-control" name="gender" data-invalid="#error-gender" required>
                <option value="">Не выбран</option>
                {foreach ['Муж', 'Жен'] as $id => $v}
                <option value="{$id}"{$profile.passport.gender == $id ? ' selected' : ''}>{$v}</option>
                {/foreach}
            </select>
            <span class="invalid-feedback" id="error-gender"></span>
        </div> 
        <div class="col-4">
            <label for="date_of_birth">Дата рождения<span class="text-danger">*</span></label>
            <input class="form-control" type="date" name="date_of_birth" value="{$profile.passport.date_of_birth}" data-invalid="#error-date-of-birth" required>
            <span class="invalid-feedback" id="error-date-of-birth"></span>
        </div>
        <div class="col-3">
            <label for="sitizenship">Гражданство<span class="text-danger">*</span></label>
            <select class="form-control" name="sitizenship" data-invalid="#error-sitizenship" required>
                <option value="">Не выбрано</option>
                {foreach $countries as $country}
                    <option value="{$country}" {if $country == $profile.passport.sitizenship}selected{/if}>{$country}</option>
                {/foreach}
            </select>
            <span class="invalid-feedback" id="error-sitizenship"></span>
        </div>
    </div>
    
    <div class="row form-group">
        <div class="col-12">
            <label for="place_of_birth">Место рождения<span class="text-danger">*</span></label>
            <input class="form-control" name="place_of_birth" value="{$profile.passport.place_of_birth}" data-invalid="#error-place-of-birth" required>
            <span class="invalid-feedback" id="error-place-of-birth"></span>
        </div>
    </div>
    
    <div class="row form-group">
        <div class="col-2">
            <label for="seria">Серия<span class="text-danger">*</span></label>
            <input class="form-control" name="seria" value="{$profile.passport.seria}" placeholder="00 00" data-invalid="#error-seria" data-inputmask="'mask': '99 99 999999', 'placeholder':'00 00 000000'" required />
            <span class="invalid-feedback" id="error-seria"></span>
        </div>
        <div class="col-3">
            <label for="num">Номер<span class="text-danger">*</span></label>
            <input class="form-control" name="num" value="{$profile.passport.num}" placeholder="000000" data-invalid="#error-num" data-inputmask="'mask': '99 99 999999', 'placeholder':'00 00 000000'" required />
            <span class="invalid-feedback" id="error-num"></span>
        </div>
        <div class="col-3">
            <label for="date_issued">Дата выдачи<span class="text-danger">*</span></label>
            <input class="form-control" type="date" name="date_issued" value="{$profile.passport.date_issued}" placeholder="" data-invalid="#error-date-issued" required />
            <span class="invalid-feedback" id="error-date-issued"></span>
        </div>
    </div>
    
    <div class="row form-group">
        <div class="col-10">
            <label for="dep_issued">Кем выдан<span class="text-danger">*</span></label>
            <input class="form-control" type="text" name="dep_issued" value="{$profile.passport.dep_issued}" placeholder="Кем выдан" data-invalid="#error-dep-issued" required />
            <span class="invalid-feedback" id="error-dep-issued"></span>
        </div>
        <div class="col-2">
            <label for="dep_code">Код подр.<span class="text-danger">*</span></label>
            <input class="form-control text-right" type="text" name="dep_code" value="{$profile.passport.dep_code}" placeholder="000-000" data-invalid="#error-dep-code" data-inputmask="'mask': '999-999', 'placeholder':'000-000'" required />
            <span class="invalid-feedback" id="error-dep-code"></span>
        </div>
    </div>
        
    <div class="form-group">
        <div class="row">
            <div class="col-12">
                <label for="place_of_reg">Место регистрации<span class="text-danger">*</span></label>
                <textarea class="form-control" name="place_of_reg" placeholder="Место регистрации" data-invalid="#error-place-of-reg" required>{$profile.passport.place_of_reg}</textarea>
                <span class="invalid-feedback" id="error-place-of-reg"></span>
            </div>
        </div>
    </div>
    
    <hr class="mt-2 margin-bottom-2x">

    <div class="h4">Скан/Документ</div>
    <p>Файл должен быть не более {$photo.maxSizeMb} Мбайт и иметь один из типов <span class="text-warning">{$photo.types}</span>.</p>
    
    <hr class="my-2">

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>
