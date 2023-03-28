{* <div class="h5">Метод оплаты</div>

<div class="row">
    {foreach $payments as $_payment} 
        <div class="col-3 px-2">
            <div class="card{$payment == $_payment->id ? ' checked' : ''}">
                <div class="card-body">
                    <div>{$_payment->name}</div>
                    <div>{$_payment->description}</div>
                </div>
            </div>
        </div>
    {/foreach}
</div> *}

<div class="h5">Метод оплаты</div>
<div class="row">
    <div class="col-12 form-group">
        {foreach $payments as $_payment} 
            <div class="custom-control custom-radio custom-control-inline">
                <input class="custom-control-input order-payment" type="radio" id="payment-{$_payment->id}" name="payment" value="{$_payment->id}" {$order.payment == $_payment->id ? ' checked' : ''}>
                <label class="custom-control-label" for="payment-{$_payment->id}">{$_payment->name}</label>
            </div>
        {/foreach}
    </div>
</div>

<div class="alert alert-warning order-payment-content"></div>