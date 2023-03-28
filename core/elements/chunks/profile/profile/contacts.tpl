<style>
   .phone-rows {
       
   } 
   
   .phone-rows .phone-row {
        display: flex!important;
        align-items: center!important;
        position: relative!important;
   }
   
    .phone-rows .phone-row button {
        margin: 0!important;
        font-size: 1.5em!important;
        position: absolute!important; 
        right: 5px!important; 
        padding: 8px!important;
        line-height: 14px!important
    }
    
</style>

<h4>Телефон</h4>

<form class="mprofile-form validate">

    <input type="hidden" name="action" value="profile/contacts/update" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="form-message alert" id="contacts-phone-message"></div>

    <div class="row form-group">
        <div class="col-4 pr-2">
            <select class="form-control d-none">
            </select>
            <input class="form-control" name="phone" value="" aria-label="Username" aria-describedby="addon-wrapping" autocomplete="off" placeholder="+7 (___) ___ ___">
        </div>
        <div class="col-2 p-0">
            <button class="btn btn-outline-secondary m-0" type="submit">Добавить</button>
        </div>
    </div>

</form>

<div class="d-none">
    
{foreach $profile.phones as $phone}
    
    {set $bydef = $profile.mobilephone == $phone.number}
    
    <div class="row mb-4">
        <div class="col-4 pr-2 phone-rows">
            <div class="form-control phone-row">
                <span class="text">{$phone.text}</span>
                {if !$bydef}
                    <button class="btn btn-sm btn-light icon-x" title="Удалить" type="button"></button>
                {/if}
            </div>
            {if $bydef}
                <span class="text-warning">По умолчанию</span>
            {/if}
        </div>
    </div>
    
{/foreach}
    
<a href="{72 | url}">Установить по умолчанию</a>
    
<hr class="mt-2 margin-bottom-2x">

</div>
    
<form class="mprofile-form validate">
    
    <input type="hidden" name="action" value="profile/contacts/update" />
    <input type="hidden" name="hash" value="{$hash}" />

    <div class="form-message alert" id="profile-message"></div>
    
    <h4>Мессенджеры</h4>
    
    {if $profile.phone}
    
        <p>Для <a href="javascript:" class="">{$profile.phone.text} </a> доступны:</p>
        
        {foreach ['telegram' => 'Telegram', 'whatsapp' => 'Whatsapp', 'viber' => 'Viber'] as $k => $t}
            <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" name="msgr_{$k}" value="1" id="ex-msgr-{$k}"{$profile.contacts['msgr_' ~ $k] ? ' checked' : ''}>
                <label class="custom-control-label" for="ex-msgr-{$k}">{$t}</label>
            </div>
        {/foreach}
    
        <hr class="margin-top-2x mb-2">
    
        <div class="row">
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Сохранить</button>
            </div>
        </div>
    
    {else}

        <p>Добавьте и выберите телефон по умолчанию в <a href="{72 | url}">профиле</a>.</p>
        
    {/if}
    
</form>