{set $invs = [
    [
        'name' => 'Без НДС', 
        'class' => 'ReceiptAccountSH', 
        'rank' => 0
    ], 
    [
        'name' => 'С НДС', 
        'class' => 'ReceiptAccountSH2',
        'rank' => 1
    ]
]}

<p class="text-muted">{$payment->description}</p>

<div class="row">
    <div class="col-12">

        {foreach $invs as $idx => $inv}
            <div class="custom-control custom-radio custom-control-inline">
                <input class="custom-control-input payment-with-tax" type="radio" id="with-tax-{$idx}" name="with_tax" value="{$idx}"{$inv.rank == 0 ? ' checked' : ''} />
                <label class="custom-control-label" for="with-tax-{$idx}">{$inv.name}</label>
            </div>
        {/foreach}

    </div>
</div>