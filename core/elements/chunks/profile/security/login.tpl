<style>
.custom-switch-fz-8 .custom-control-label::before {
    top: 4px!important;
}
.custom-switch-fz-8 .custom-control-label::after {

}
.custom-switch-fz-8 .custom-control-label {
    font-size: .8em!important; 
    font-weight: 300!important
}
</style>

{set $login_methods = '!pdoMenu' | snippet : [
    'return' => 'data',
    'parents' => '95',
    'level' => 1
]}

<form class="mlogin-form validate">

    <input type="hidden" name="action" value="login/settings/update" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="form-group h4">
        <div class="custom-control custom-switch custom-switch-fz-8">
            <input class="custom-control-input" type="checkbox" name="login_confirm_enabled" value="1" id="login-confirm-enabled" data-toggle="collapse" data-target="#login-confirm"{$login_confirm_enabled ? ' checked' : ''}>
            <label class="custom-control-label" for="login-confirm-enabled">Двухфакторная авторизация</label>
        </div>                
    </div>

    <div class="collapse{$login_confirm_enabled ? ' show' : ''}" id="login-confirm">
        
        <hr class="mb-4">

        <div class="row form-group">
            <div class="col-4">
                <select class="form-control" name="login_method" data-toggle="collapse" data-toggle-group=".options" data-invalid="#error-login-method">
                    {foreach $login_methods as $method}
                        <option value="{$method.id}" data-target="#opt-{$method.id}"{$login_method == $method.id ? ' selected' : ''}>{$method.pagetitle}</option>
                    {/foreach}
                </select>
                <div class="invalid-feedback" id="error-login-method"></div>
            </div>
        </div>

        {foreach $login_methods as $method}
            <div class="collapse options{$login_method == $method.id ? ' show' : ''}" id="opt-{$method.id}">
                {('@INLINE ' ~ $method.content) | chunk}
            </div>
        {/foreach}

    </div>

    <hr class="margin-top-2x mb-2">

    <div class="row">
        <div class="col-12">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>