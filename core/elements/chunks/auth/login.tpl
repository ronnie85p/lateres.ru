

                <form class="wf-auth md-float-material form-material validate">

                    <input type="hidden" name="action" value="login" />
                    <input type="hidden" name="hash" value="{$hash}" />

                    <div class="auth-box card">
                        <div class="card-block">
                            <div class="row m-b-20">
                                <div class="col-md-12">
                                    <h3 class="text-center txt-primary">Авторизация</h3>
                                </div>
                            </div>
                            <div class="row m-b-20 d-none">
                                <div class="col-md-6">
                                    <button class="btn btn-facebook m-b-20 btn-block"><i class="icofont icofont-social-facebook"></i>facebook</button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-twitter m-b-20 btn-block"><i class="icofont icofont-social-twitter"></i>twitter</button>
                                </div>
                            </div>
                            <p class="text-muted text-center p-b-5 d-none">Sign in with your regular account</p>
                            <div class="form-group form-primary">
                                <label class="float-label_">E-mail или ID</label>
                                <input type="text" name="username" class="form-control" required="">
                                <span class="form-bar"></span>
                            </div>
                            <div class="form-group form-primary">
                                <label class="float-label_">Пароль</label>
                                <input type="password" name="password" class="form-control" required="">
                                <span class="form-bar"></span>
                            </div>
                            <div class="row m-t-25 text-left">
                                <div class="col-12">
                                    <div class="checkbox-fade fade-in-primary">
                                        <label>
                                            <input type="checkbox" value="">
                                            <span class="cr"><i class="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                                            <span class="text-inverse">Запомнить меня</span>
                                        </label>
                                    </div>
                                    <div class="forgot-phone text-right float-right">
                                        <a href="{66 | url}" class="text-right f-w-600">Забыли пароль?</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-t-30">
                                <div class="col-md-12">
                                    <button class="btn btn-primary btn-block waves-effect text-center m-b-20 py-1 custom-disabled" type="submit">ВОЙТИ</button>
                                </div>
                            </div>
                            <p class="text-inverse text-left">Вы еще не зарегистрированы?<a href="{64 | url}"> <b>Регистрация </b></a></p>
                        </div>
                    </div>
                </form>
