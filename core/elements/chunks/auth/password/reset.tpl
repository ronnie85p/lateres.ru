<form class="wf-auth md-float-material form-material validate">

    <input type="hidden" name="action" value="password/reset" />
    <input type="hidden" name="hash" value="{$hash}" />
    <input type="hidden" name="ck" value="{$.server.REQUEST_URI | basename}" />

    <div class="auth-box card">
        <div class="card-block">
            <div class="row m-b-20">
                <div class="col-md-12">
                    <h3 class="text-center txt-primary">Сброс пароля</h3>
                </div>
            </div>
            <div class="form-group form-primary">
                <label class="float-label_">Пароль</label>
                <input type="password" name="password" class="form-control" required="">
                <span class="form-bar"></span>
            </div>
            <div class="form-group form-primary">
                <label class="float-label_">Повторите пароль</label>
                <input type="password" name="password_again" class="form-control" required="">
                <span class="form-bar"></span>
            </div>
            <div class="row m-t-30">
                <div class="col-md-12">
                    <button class="btn btn-primary btn-block waves-effect text-center m-b-20 py-1 custom-disabled" type="submit">Сбросить</button>
                </div>
            </div>
        </div>
    </div>
</form>