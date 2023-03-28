{set $isAuth = $modx->user->isAuthenticated('web')}

<div class="card">
    <div class="card-body">
        
        <div class="widget-title text-left">
            <div class="row">
                <div class="col-6">
                    <h3 class="m-0" style="font-size: 1.5em">Ваша корзина</h3>
                </div>
                <div class="col-6 text-right text-sm text-secondary d-flex align-items-center justify-content-end">
                    {$total.count} товара - {$total.weight} кг.
                </div>
            </div>
        </div>
        
        <table class="table mb-0">
            <tbody>

                {if $total.old_cost > 0}

                    <tr>
                        <td>Стоимость</td>
                        <td class="text-gray-dark">
                            <span class="">{$total.old_cost}.00</span> {'wf_shop.currency_html_code' | option}</span>
                        </td>
                    </tr>

                    <tr>
                        <td>Скидка</td>
                        <td class="text-danger">
                            <span class="">- {$total.discount}.00</span> {'wf_shop.currency_html_code' | option}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Товары</td>
                        <td class="text-gray-dark">
                            <span class="">{$total.net_sales_cost}.00</span> {'wf_shop.currency_html_code' | option}</span>
                        </td>
                    </tr>

                {else}

                    <tr>
                        <td>Стоимость</td>
                        <td class="text-gray-dark">
                            <span class="">{$total.net_sales_cost}.00</span> {'wf_shop.currency_html_code' | option}</span>
                        </td>
                    </tr>

                {/if}
                            
                <tr><td colspan="2"></td></tr>
                        
                <tr>
                    <td>Налог</td>
                    <td class="text-gray-dark">
                    {if $total.sales_tax > 0}
                        <span class="">{$total.sales_tax}</span> {'wf_shop.currency_html_code' | option}</span>
                    {else}
                        Без НДС
                    {/if}
                    </td>
                </tr>
                <tr style="font-size: 1.6em; font-weight: 400; position: relative; top: 5px">
                    <td>Итого</td>
                    <td class="text-gray-dark">
                        <span class="order-cost">{$total.cost}.00</span> {'wf_shop.currency_html_code' | option}
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
</div>

<form class="wf-shop">
    <input type="hidden" name="action" value="cart/prepare" />
    <input type="hidden" name="hash" value="{$hash}" />
    <input type="hidden" name="returnUrl" value="{$isAuth ? '' : ''}" />

    <button class="btn btn-lg btn-primary btn-block{!$total.cost ? ' custom-disabled' : ''}" type="submit">
        <i class="icon-shopping-cart"></i> Оформить заказ
    </button>
</form>