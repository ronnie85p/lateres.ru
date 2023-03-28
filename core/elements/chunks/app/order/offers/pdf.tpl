<blockquote align="right" style="width: 25_%; float: right">
    Кому:
    {if $address.receiver_type == 1}
        {$address.receiver_company.name} <br/> 
        ИНН: {$address.receiver_company.inn} <br/> 
        ОГРН(ОГРНИП): {$address.receiver_company.ogrn} <br/> 
        {if $address.receiver_company.kpp}
          КПП: {$address.receiver_company.kpp} <br/>
        {/if}
    {/if}

    {$address.receiver} <br/>
    Тел.: {$address.phone}
</blockquote>

<blockquote align="right" style="width: 25_%; float: right; clear: right">
    От Торговая марка: «LATERES»
    Собственное производство: МО, Солнечногорский район, пос. Смирновка
</blockquote>

<h3 align="center" style="clear:right">
    КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ <br/>
    на поставку продукции и оказании услуг
</h3>
  
<p>Настоящим предлагаем Вам приобрести продукцию Завода Вибропрессованых Изделий компании «LATERES», а именно:</p>
<table style="border-collapse: collapse; width: 100%">
  <thead>
    
  </thead>
  <tbody>
    
    {foreach $products as $product}
     
      <tr style="border: 1px solid silver;">
        
        <td style="width: 20%; padding: 5px; border: 1px solid #eaeaea">
          <a href="{$product.product_id | url : ['scheme' => 'full']}">
            <img src="data:image\jpeg;base64, {$product.img | file_get_contents | base64_encode}" 
                alt="{$product.pagetitle}" 
                style="border: 1px solid silver; width: 20%"/>
          </a>
        </td>
        
        <td style="width: 60%; padding: 5px; border: 1px solid #eaeaea" valign="top">
            <h2><a href="{$product.uri}">{$product.pagetitle}</a></h2>
            <div><span class="text-muted">Артикул:</span> <span class="text-gray-dark">{$product.article}</span></div>
            <div><span class="text-muted">Вес:</span> <span class="text-gray-dark">{$product.weight} {'ms2_frontend_weight_unit' | lexicon}</span></div>
            <div><span class="text-muted">Цена:</span> <span class="text-gray-dark">{$product.price} {'ms2_frontend_currency' | lexicon}</span></div>
            <div><span class="text-muted">Марка:</span> <span class="text-gray-dark">{$product.brand_strength}</span></div>    
        </td>
        
        <td style="width: 20%; padding: 5px; border: 1px solid #eaeaea" valign="top">
          <div>{$product.count} {$product.count_unit}</div>
          <div><span class="ms2_weight">{($product.weight * $product.count) | msFormat:'weight'}</span> {'ms2_frontend_weight_unit' | lexicon}</div>
          <div><span class="ms2_cost">{$product.cost | msFormat:'price'}</span> {'ms2_frontend_currency' | lexicon}</div>
        </td>
      </tr>
      
    {/foreach}

  </tbody>
</table>

<div align="right">
    <span>Кол-во: {$total.count}</span><br/>
    <span>Вес: {$total.cart_weight | msFormat:'weight'} {'ms2_frontend_weight_unit' | lexicon}</span><br/>
    <span>Стоимость:{$total.cart_cost | msFormat:'price'} {'ms2_frontend_currency' | lexicon}</span>
</div>

{if $delivery == 2}
    <p>Стоимость доставки из расчета за 1 рейс – {$delivery_car_cost | msFormat:'price'} руб., 
    а всего рейсов {$delivery_cars} – составляет {$delivery_cost | msFormat:'price'} руб. 00 копеек.
    Предложение носит информативный характер. Любые обязательства Сторон, в том числе и обязательства 
    по реализации и доставки товара, должны быть согласованы, 
    оформлены в соответствующем виде и подписаны уполномоченными представителями Сторон.</p>
{else}
    <p>Вы выбрали доставку самовывозом 0 руб.</p>
{/if}
  
<hr/>

<p align="right">_______________  С Уважением, Руководитель Отдела Продаж</p>
