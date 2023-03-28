<div class="mb-4">
    {if $address}
        <div class="card">
            <div class="card-body">
                <div class="float-end">
                    <a href="#">Изменить</a>
                </div>

                <p>Адрес доставки: {$address->text}</p>
                <p>Расстояние до <a href="#">склада</a> {$address->distance} км.</p>
            </div>
        </div>
    {else}
        <div class="card card-body alert alert-danger">Нет адреса доставки</div>
        <button class="btn btn-sm btn-primary wf-profile-btn" data-action="modal" type="button"><i class="icon-plus"></i>&nbsp;Добавить</button>
    {/if}
</div>

<div class="mb-4">
    {include 'file:chunks/ordering/recipient.tpl'}
</div>

{if $address}
    <div class="row mb-4">
        <div class="col-4 form-group">
            <label for="delivery_car">Транспорт&nbsp;<span class="text-danger">*</span></label>

            {'!wfShopDeliveryCars' | snippet : [
                'tplWrapper' => '@INLINE <select class="form-control order-delivery-car" name="delivery_car" data-toggle="collapse">
                    <option value="" data-target="#car-{$id}">Выбрать</option>
                    {$output}
                </select>',
                'tpl' => '@INLINE <option value="{$id}">{$name}</option>'
            ]}
        </div>
        <div class="col-8">
            {* <div class="collapse">
                {'!wfShopDeliveryCars' | snippet : [
                    'tplWrapper' => '@INLINE {$output}',
                    'tpl' => '@INLINE <img src="{$image}" />'
                ]}
            </div> *}
        </div>
    </div>
{/if}

{include 'file:chunks/ordering/datetime.tpl' label="Дата и время доставки:"}

<hr class="mb-2x">

{include 'file:chunks/ordering/order.tpl'}

<hr class="my-4">

{include 'file:chunks/ordering/payments.tpl'}