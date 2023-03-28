<form class="mlogin-form collapse show validate" onsubmit="
    event.preventDefault(); 
    this.classList.remove('show'); 
    document.getElementById('password-update').classList.add('show');
    ">

    <input type="hidden" name="action" value="password/check">
    <input type="hidden" name="hash" value="{$hash}">

    <div class="text-lg mb-2">Введите пароль</div>
    <div class="row form-group">
        <div class="col-4">
            <input class="form-control" name="password" value="" autocomplete="off" required>
        </div>
        <div class="col-8 p-0">
            <button class="btn btn-primary custom-disabled m-0" type="submit">Авторизация</button>
        </div>
    </div>

</form>

<form class="mlogin-form validate collapse" id="password-update" onsubmit="
    event.preventDefault();
    alert('Password ' + this.password?.value + ' updated!');
    ">

    <input type="hidden" name="action" value="password/update">
    <input type="hidden" name="hash" value="{$hash}">
    <input type="hidden" name="token" value="" id="auth-token">

    <div class="text-lg mb-2">Новый пароль</div>
    <div class="row form-group">
        <div class="col-4">
            <input class="form-control" name="password" value="" autocomplete="off" required>
        </div>
        <div class="col-8 p-0">
            <button class="btn btn-primary custom-disabled m-0" type="submit">Обновить</button>
        </div>
    </div>

</form>