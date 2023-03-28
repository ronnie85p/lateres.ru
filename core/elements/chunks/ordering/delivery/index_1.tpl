<div class="card mb-4">
    <div class="card-body">
        <p>{$delivery->description}</p> 
        <a href="#">Показать на карте</a>
    </div>
</div>

<div class="mb-4">
    {include 'file:chunks/ordering/recipient.tpl'}
</div>  

{include 'file:chunks/ordering/datetime.tpl' label="Дата и время получения:"}

<hr class="mb-2x">

{include 'file:chunks/ordering/order.tpl'}

<hr class="my-4">

{include 'file:chunks/ordering/payments.tpl'}