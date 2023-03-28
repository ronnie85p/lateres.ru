<style>
.btn-icon {
    font-size: 1.2em;
    padding: 0 6px 0 6px;
    margin: 0;
    height: 29px;
    line-height: 24px;
    margin-right: 5px;
}
</style>

<div class="mb-4 py-4" style="border-bottom: 1px solid #f2f2f2">
    <div class="row mb-4">
        <div class="col-4">
            <img src="{$logo}" />
        </div>
        <div class="col-8">
            <div class="h6 m-0"><a class="" href="{303 | url}?id={$id}" style="text-decoration: none;color: #3e4349;">{$name}</a></div>
            <div class="text-muted">{$description}</div>
        </div>
        <div class="col-4 text-end d-none">
            <button class="btn btn-outline-secondary icon-edit btn-icon"></button>
            <button class="btn btn-outline-secondary icon-trash-2 btn-icon"></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            {if $price}
                Стоимость: {$price}
            {/if}
            {if $free_delivery_amount}
                Беспл. от суммы заказа: {$free_delivery_amount}
            {/if}
        </div>
    </div>
</div>
