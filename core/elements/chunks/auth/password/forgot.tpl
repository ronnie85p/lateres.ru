<form class="wf-auth md-float-material form-material validate">

    <input type="hidden" name="action" value="password/forgot" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="auth-box card">
        <div class="card-block">

            <div class="row m-b-20">
                <div class="col-md-12">
                    <h3 class="text-center txt-primary">Восстановление пароля</h3>
                </div>
            </div>

            <div class="form-group form-primary">
                <label class="float-label_">E-mail или ID</label>
                <input type="text" name="username" class="form-control" required="">
                <span class="form-bar"></span>
            </div>

            <div class="row m-t-30">
                <div class="col-md-12">
                    <button class="btn btn-primary btn-block waves-effect text-center m-b-20 py-1 custom-disabled" type="submit">Отправить</button>
                </div>
            </div>
            
            <p class="text-inverse text-left">Вы еще не зарегистрированы?<a href="#"> <b>Регистрация </b></a></p>
        </div>
    </div>
</form>