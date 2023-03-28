<form class="wf-auth validate">

    <input type="hidden" name="action" value="login/auth" />
    <input type="hidden" name="hash" value="{$hash}" />
    <input type="hidden" name="lt" value="{$.get.lt}" />

    <div class="auth-box card">
        <div class="card-block">

            <div class="row m-b-20">
                <div class="col-md-12">
                    <h3 class="text-center txt-primary">Подтвердите вход</h3>
                 </div>
            </div>

            {$output}

            <div class="row">
                <div class="col-12 text-center">
                    <button class="btn btn-primary custom-disabled_" type="submit">Отправить</button>
                </div>
            </div>

            <p class="text-inverse text-left">Вы еще не зарегистрированы?<a href="#"> <b>Регистрация </b></a></p>
        </div>
    </div>
</form>