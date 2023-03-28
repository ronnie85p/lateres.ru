<div class="auth-box card">
        <div class="card-block">
      

        <div class="row m-b-20">
                                <div class="col-md-12">
                                    <h3 class="text-center txt-primary">Регистрация</h3>
                                </div>
                            </div>
        <div class="alert form-message" id="login-message"></div>     
      
        <form class="wf-auth validate">
      
            <input type="hidden" name="action" value="register">
            <input type="hidden" name="hash" value="{$hash}">
            <input class="d-none" name="nospam" value="">
            
            <div class="row">
                
                <div class="col-12 form-group">
                    <label for="firstname">Имя <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" placeholder="" name="firstname" data-invalid="#error-firstname" required_ />
                    <div class="invalid-feedback" id="error-firstname"></div>
                </div>
                
                <div class="col-12 form-group">
                    <label for="midname">Отчество <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" placeholder="" name="midname" data-invalid="#error-midname" required_ />
                    <div class="invalid-feedback" id="error-midname"></div>
                </div>
                
                <div class="col-12 form-group">
                    <label for="lastname">Фамилия <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" placeholder="" name="lastname" data-invalid="#error-lastname" required_ />
                    <div class="invalid-feedback" id="error-lastname"></div>
                </div>
                
            </div>
            
            <div class="row">
                <div class="col-12 form-group">
                    <label for="mobilephone">Телефон <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" placeholder="" name="mobilephone" data-invalid="#error-mobilephone" required_ />
                    <div class="invalid-feedback" id="error-mobilephone"></div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12 form-group">
                    <label for="email">E-mail <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" placeholder="" name="email" data-invalid="#error-email" required_ />
                    <div class="invalid-feedback" id="error-email"></div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <div class="custom-control custom-checkbox">
                        <input class="custom-control-input" name="generate_password" value="1" type="checkbox" id="ex-generate-password" data-toggle="collapse" data-target="#custom-password" data-reverse="true" checked>
                        <label class="custom-control-label" for="ex-generate-password">Cгенерировать пароль</label>
                    </div>  
                </div>
            </div>
            
            <div class="collapse" id="custom-password">
                
                <div class="row mt-2 mb-4">
                    
                    <div class="col-12 form-group">
                        <label for="password">Пароль</label>
                        <div class="input-group password">
                            <input class="form-control pr-5" type="password" name="password" placeholder="" maxlength="16" autocomplete="off" data-invalid="#error-password" />
                            <span class="input-group-addon"><i class="icon-lock"></i></span>
                            <span class="input-group-btn" style="right: 27px; bottom: -5px; z-index: 111"><i class="password-sh icon-eye" title="Показать" data-titles="Показать, Скрыть"></i></span>
                        </div>
                        <div class="invalid-feedback" id="error-password"></div>                       
                    </div>
                    
                    <div class="col-12 form-group">
                        <label for="password_again">Подтвердите</label>
                        <div class="input-group password">
                            <input class="form-control pr-5" type="password" name="password_again" placeholder="" maxlength="16" autocomplete="off" data-invalid="#error-password-again" />
                            <span class="input-group-addon"><i class="icon-lock"></i></span>
                            <span class="input-group-btn" style="right: 27px; bottom: -5px; z-index: 111"><i class="password-sh icon-eye" title="Показать" data-titles="Показать, Скрыть"></i></span>
                        </div>
                        <div class="invalid-feedback" id="error-password-again"></div>                       
                    </div>
                    
                </div>
                
            </div>
            
            {* <div class="row">
                <div class="col-12">
                    <div class="custom-control custom-checkbox">
                        <input class="custom-control-input" name="custom_password" type="checkbox" id="ex-login-confirm" data-toggle="collapse" data-target="#login-confirm">
                        <label class="custom-control-label text-danger" for="ex-login-confirm">Двухфакторная авторизация</label>
                    </div>  
                </div>
            </div>
            
            <div class="collapse" id="login-confirm">
                
                <div class="row mt-2">
                    <div class="col-12 form-group">
                        <label for="confirm_type">Метод</label>
                        <select class="form-control" name="confirm_type">
                            <option value="email">E-mail</option>
                            <option value="question">Вопрос</option>
                        </select>
                    </div>
                    
                    <div class="col-12 form-group"></div>
                </div>
                
            </div>
            
            <span class="form-text">* рекомендуется при авторизации на сайте</span> *}
            
            <hr class="my-4" />
            
            <div class="row">
                <div class="col-12 form-group">
                    <div class="custom-control custom-checkbox">
                        <input class="custom-control-input" name="agreed" value="1" type="checkbox" id="ex-agreed">
                        <label class="custom-control-label" for="ex-agreed">Принять пользовательское соглашение <a class="icon-external-link" href="javascript:"></a></label>
                    </div>  
                </div>
            </div>
            
            <hr class="margin-bottom-2x" />
            
            <div class="form-group text-center">
                <button class="btn btn-primary disabled_" type="submit">Зарегистрироваться</button>
            </div>
              
        </form>
      
    </div>
</div>
