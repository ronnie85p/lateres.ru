<style>
    .custom-control-label {
        color: #0000006e
    }
    .custom-control-input:checked + .custom-control-label {
        color: #000000d4
    }
</style>

<form class="wf-profile validate">

    <input type="hidden" name="action" value="profile/update" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="margin-bottom-1x">
        <div class="custom-control custom-switch custom-control-inline">
            <input class="custom-control-input" type="checkbox" id="ex-account-type-1" name="account_type" value="1" data-toggle="collapse" data-target="#is-company">
            <label class="custom-control-label" for="ex-account-type-1">Юр лицо</label>
        </div>
    </div>

    <div class="row">
        <div class="col-6 form-group">
            <label for="fullname">Имя</label>
            <input class="form-control" name="fullname" value="{$_modx->user.fullname}" data-invalid="#error-fullname" autocomplete="off" required_>
            <span class="invalid-feedback" id="error-fullname"></span>
        </div>
        <div class="col-6 form-group">
            <label for="fullname">Отчество</label>
            <input class="form-control" name="fullname" value="{$_modx->user.fullname}" data-invalid="#error-fullname" autocomplete="off" required_>
            <span class="invalid-feedback" id="error-fullname"></span>
        </div>
    </div>

    <div class="row">
        <div class="col-8 form-group">
            <label for="fullname">Фамилия</label>
            <input class="form-control" name="fullname" value="{$_modx->user.fullname}" data-invalid="#error-fullname" autocomplete="off" required_>
            <span class="invalid-feedback" id="error-fullname"></span>
        </div>
        <div class="col-4 form-group">
            <label for="mobilephone">Телефон</label>
            <select class="form-control" name="mobilephone" data-invalid="#error-mobilephone" required_>
                <option value="{$_modx->user.mobilephone}">{$_modx->user.mobilephone}</option>
            </select>
            <span class="invalid-feedback" id="error-mobilephone"></span>
        </div>
    </div>

    <hr class="my-2">

    <div class="collapse margin-top-2x" id="is-company">

        <div class="h5">Организация</div>

        <div class="row">
            <div class="col-12 form-group">
                <label for="company_name">Название<span class="text-danger">*</span></label>
                <input class="form-control" name="company_name" value="" placeholder="Название организации" data-invalid="#error-company-name" required_ />
                <span class="invalid-feedback" id="error-company-name"></span>
            </div>
        </div>
            
        <div class="row">
                
            <div class="col-4 form-group">
                <label for="company_inn">ИНН<span class="text-danger">*</span></label>
                <input class="form-control" name="company_inn" value="" min="0" placeholder="0000000000" maxlength="10" data-invalid="#error-company-inn" required_ />
                <span class="invalid-feedback" id="error-company-inn"></span>
            </div>
                                        
            <div class="col-4 form-group">
                <label for="company_ogrn">ОГРН (ИП)</label>
                <input class="form-control" name="company_ogrn" value="" min="0" placeholder="000000000000000" maxlength="15" data-invalid="#error-company-ogrn" />
                <span class="invalid-feedback" id="error-company-ogrn"></span>
            </div>
                                        
            <div class="col-4 form-group">
                <label for="company_kpp">КПП</label>
                <input class="form-control text-right" name="company_kpp" value="" min="0" placeholder="000000000" maxlength="9" data-invalid="#error-company-kpp" />
                <span class="invalid-feedback" id="error-company-kpp"></span>
            </div>
                                        
        </div>
                                    
        <div class="row margin-bottom-1x">
            <div class="col-4 form-group">
                <label for="company_phone">Телефон</label>
                <input class="form-control" name="company_phone" value="" placeholder="+7 (___) ___ ____" data-mask="phone" data-invalid="#error-company-phone" />
                <span class="invalid-feedback" id="error-company-phone"></span>
            </div>
        </div>

        <div class="custom-control custom-checkbox mt-2 mb-4 d-none">  
            <input class="custom-control-input" name="company_address_enabled" value="1" type="checkbox" id="ex-check-2" data-toggle="collapse" data-target="#customer-company-address">
            <label class="custom-control-label" for="ex-check-2">Указать адрес</label>
        </div>
                        
        <div class="row">
            <div class="col-12 form-group">
                <a class="" type="button" data-bs-toggle="collapse" data-bs-target="#customer-company-address" onclick="this.classList.add('d-none')"><i class="icon-plus"></i>&nbsp;Добавить адрес</a>
                {* <label for="comment">Описание</label>
                <textarea class="form-control" name="comment" data-invalid="#error-fullname"></textarea>
                <span class="invalid-feedback" id="error-fullname"></span> *}
            </div>
        </div>

        <div class="collapse" id="customer-company-address">
                                        
            <div class="row">
                                        
                <div class="col-9 form-group">
                    <label for="company_address_region">Область/Край</label>
                    <input class="form-control" name="company_address_region" value="" placeholder="Например: Московская область" data-invalid="#error-company-region" />
                    <span class="invalid-feedback" id="error-company-region"></span>
                </div>
                                        
                <div class="col-3 form-group">
                    <label for="company_address_index">Индекс</label>
                    <input class="form-control" name="company_address_index" value="" maxlength="6" placeholder="000000" data-invalid="#error-company-index" />
                    <span class="invalid-feedback" id="error-company-index"></span>  
                </div>
                                        
            </div>

            <div class="row">
                <div class="col-12 form-group">
                    <label for="company_address_city">Город/Поселение</label>
                    <input class="form-control" name="company_address_city" value="" placeholder="Например: г. Солнечногорск" data-invalid="#error-company-city" />
                    <span class="invalid-feedback" id="error-company-city"></span>
                </div>
            </div>
                                        
            <div class="row">
                                        
                <div class="col-9 form-group">
                    <label for="company_address_street">Улица</label>
                    <input class="form-control" name="company_address_street" value="" placeholder="Например: ул. Разина" data-invalid="#error-company-street" />
                    <span class="invalid-feedback" id="error-company-street"></span>
                </div>
                                        
                <div class="col-3 form-group">
                    <label for="company_address_building">Строение</label>
                    <input class="form-control" name="company_address_building" value="" placeholder="0" data-invalid="#error-company-building" />
                    <span class="invalid-feedback" id="error-company-building"></span>
                </div>
                                        
            </div>
                                        
            <div class="row">
                                        
                <div class="col-3 form-group">
                    <label for="company_address_corpus">Корпус</label>
                    <input class="form-control" name="company_address_corpus" value="" placeholder="Корпус" data-invalid="#error-company-corpus" />
                    <span class="invalid-feedback" id="error-company-corpus"></span>
                </div>
                                        
                <div class="col-3 form-group">
                    <label for="company_address_floor">Этаж</label>
                    <input class="form-control" name="company_address_floor" value="" type="number" min="0" placeholder="0" data-invalid="#error-company-floor" />
                    <span class="invalid-feedback" id="error-company-floor"></span>
                </div>
                                        
                <div class="col-3 form-group">
                    <label for="company_address_premise">Помещение</label>
                    <input class="form-control" name="company_address_premise" value="" placeholder="Помещение" data-invalid="#error-company-premise" />
                    <span class="invalid-feedback" id="error-company-premise"></span>
                </div>
                                        
                <div class="col-3 form-group">
                    <label for="company_address_room">Комната/Офис</label>
                    <input class="form-control" name="company_address_room" value="" placeholder="Комната" data-invalid="#error-company-room" />
                    <span class="invalid-feedback" id="error-company-room"></span>
                </div>
                                        
            </div>  
                                        
        </div>

        <hr class="my-2">

    </div>

    <div class="row">
        <div class="col-12 text-center">
            <button class="btn btn-primary custom-disabled" type="submit">Сохранить</button>
        </div>
    </div>

</form>