<div class="card">
    <div class="card-body">
        <div class="float-end">
            <a href="#">Изменить</a>
        </div>

        <div class="mb-1">Получатель: 
            <span class="fw-bolder">{$recipient.profile.fullname}</span>
            {$recipient.profile.mobilephone ? $recipient.profile.mobilephone : '<span class="text-danger">Телефон не указан</span>'}
        </div>

        <div class="">
            <div>Организация: {$recipient.company.line}</div>
            <div>Адрес: {$recipient.company.address_line}</div>
        </div>
    </div>
</div>

{if $recipientNotFully}
    <div class="text-danger mt-2"><i class="icon-alert-triangle"></i> Заполните данные получателя полностью.</div>
{/if}

