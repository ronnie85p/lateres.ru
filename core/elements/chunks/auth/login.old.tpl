<div class="card m-auto mt-4" style="width: 400px; margin-top: 50px!important">
    <div class="card-body">
      
        <div class="alert form-message" id="login-message"></div>     
      
        <form class="mlogin-form">
      
            <input type="hidden" name="action" value="login">
            <input type="hidden" name="hash" value="{$hash}">
            <input class="d-none" name="nospam" value="">
            
            <h4 class="margin-bottom-1x">ID или E-MAIL</h4>
              
            <div class="form-group">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="ID или E-MAIL" name="username" data-invalid="#error-username" required_ />
                    <span class="input-group-addon"><i class="icon-mail"></i></span>
                </div>
                <div class="invalid-feedback" id="error-username"></div>
            </div>
              
            <div class="form-group">
                <div class="input-group password">
                    <input class="form-control pr-5" type="password" name="password" placeholder="" maxlength="16" autocomplete="off" data-invalid="#error-password" required_ />
                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                    <span class="input-group-btn" style="right: 27px; bottom: -5px; z-index: 111"><i class="password-sh icon-eye" title="Показать" data-titles="Показать, Скрыть"></i></span>
                </div>
                <div class="invalid-feedback" id="error-password"></div>
            </div>
              
            <div class="d-flex flex-wrap justify-content-between padding-bottom-1x">
                <div class="custom-control custom-checkbox">
                    <input class="custom-control-input" type="checkbox" id="rememberme" name="rememberme" value="1" checked="">
                    <label class="custom-control-label" for="rememberme">Запомнить</label>
                </div>
                <a class="navi-link" href="javascript:">Восстановить доступ!</a>
            </div>
              
            <div class="form-group text-center">
                <button class="btn btn-block btn-primary" type="submit">Войти</button>
            </div>
              
        </form>
      
    </div>
</div>


