<!-- Счет на оплату (invoice) Wealfull -->
{set $stamp = "https://lateres.ru/assets/tpl/web/img/stamp-w.png"|file_get_contents|base64_encode}
{set $signature = "https://lateres.ru/assets/tpl/web/img/signature-w.png"|file_get_contents|base64_encode}
{set $addr_line = ([
  'inn' => $address.properties.extfld_inn,
  'ogrn' => $address.properties.extfld_ogrn,
  'kpp' => $address.properties.extfld_kpp,
  'org' => $address.properties.extfld_org,
  'index' => $address.properties.extfld_org_index,
  'country' => 'Россия',
  'region' => $address.properties.extfld_org_region,
  'district' => $address.properties.extfld_org_district,
  'city' => $address.properties.extfld_org_city,
  'street' => $address.properties.extfld_org_street,
  'house' => $address.properties.extfld_org_house,
  'building' => $address.properties.extfld_org_building,
  'corpus' => $address.properties.extfld_org_corpus,
  'floor' => $address.properties.extfld_org_floor,
  'premise' => $address.properties.extfld_org_premise,
  'room' =>  $address.properties.extfld_org_room,
  'phone' => $address.properties.extfld_org_phone
] | address_line)}

<table class="topss"  border="0" width="100%" align="center">
    <tr>
        {if $images.logo}
          <td class="topss_left"><img width="200" height="60" src="data:image\png;base64, {$images.logo|file_get_contents|base64_encode}" alt=""></td>
        {/if}
        <td class="topss_right">[[%mspra_sh_header_text]]</td>
    </tr>
</table>
<table class="infobank itemsInfo" width="100%"  >
    <tr valign="top">
        <td colspan="3" width="40%">
            [[%mspra_sh_header_fil_bank]]: ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ", МОСКВА<br><br>
            <span class="mips">[[%mspra_sh_header_rece_bank]]</span>
        </td>
        <td valign="top">
            [[%mspra_sh_bik]] <br><hr>
            [[%mspra_sh_sh]]
        </td>
        <td width="40%" valign="top">
            044525999<br><hr>
            30101810845250000999
        </td>
    </tr>
    <tr valign="top">
        <td>[[%mspra_sh_inn]] 5044111853</td>
        <td colspan="2">[[%mspra_sh_kpp]] 504401001</td>
        <td rowspan="2" valign="top">
            [[%mspra_sh_sh]]
        </td>
        <td rowspan="2" valign="top">40702810602500050261</td>
    </tr>
    <tr>
        <td colspan="3">
            Общество с Ограниченной Ответственностью «ВИЛФУЛ»<br><br>
            <span class="mips">[[%mspra_sh_recevece]]</span>
        </td>
    </tr>
</table>


<table border="0" width="100%">
    <tr>
        <td><h1>[[%mspra_sh_payment_name]] RU-[[+order.num]]-00[[+order.id]] от [[+order.print_date]]</h1></td>
    </tr>
</table>
<hr />

<table class="generalInfo">

    <tr>
        <th valign="top">[[%mspra_sh_provider]]:</th>
        <td>Общество с Ограниченной Ответственностью «ВИЛФУЛ», [[%mspra_sh_pr_inn]] 5044111853, [[%mspra_sh_pr_kpp]] 504401001, [[+org.address]] ( тел.: [[+org.phone]] )</td>
    </tr>
    <tr >
        <th valign="top">Грузоотправитель:</th>
        <td>Общество с Ограниченной Ответственностью «ВИЛФУЛ», [[%mspra_sh_pr_inn]] 5044111853, [[%mspra_sh_pr_kpp]] 504401001, [[+org.address]] ( тел.: [[+org.phone]] )</td>
    </tr>
    <tr >
        <th valign="top">[[%mspra_sh_buyer]]:</th>
        <td>
          {if $address.properties.extfld_type == 1}
            {$receiver}
          {else}
            {$addr_line}
          {/if}
        </td>
    </tr>
    
    <tr >
        <th valign="top">[[%mspra_sh_basis]]:</th>
        <td>Заказ № RU-[[+order.num]]-00[[+order.id]] от [[+order.createdon]]</td>
    </tr>
</table>

<!--Вывод товаров-->
<table class="itemsInfo" >
    <thead>
    <tr>
        <th>№</th>
        <th style="width: 270px;">[[%mspra_sh_table_th_name]]</th>
        <th style="width: 80px;" colspan="2">[[%mspra_sh_table_th_count]]</th>
        <th style="width: 80px;">[[%mspra_sh_table_th_price]]</th>

        [[+nds.enabled:is=`1`:then=`
            <th style="width: 50px;">[[%mspra_sh_table_th_snds]]</th>
            <th style="width: 80px;">[[%mspra_sh_table_th_sumnds]]</th>
        `]]

        <th style="width: 110px;">[[%mspra_sh_table_th_cost]]</th>
    </tr>
    </thead>
    <tbody>
    [[+cart]]
    </tbody>
</table>

<table class="summaryss">
    <tr>
        <td style="text-align:left; width: 500px"><div style="display: none"><strong>[[%mspra_sh_footer_payment_type]]:</strong> [[+order.delivery]]</div></td>
        <td ><strong>[[%mspra_sh_footer_total]]:</strong></td>
        <td style="font-weight: normal; ;">[[+order.cart_cost]] [[%ms2_frontend_currency]]</td>
    </tr>


    <tr>
        <td style=" text-align:left"></td>
        <td ><strong>[[+nds.text]]</strong></td>
        <td style=" font-weight: normal"> [[+nds.cost]]</td>
    </tr>

    [[+order.delivery_cost:ne=`0,00`:then=`
        <tr>
            <td style=" text-align:left"></td>
            <td ><strong>Доставка:</strong></td>
            <td style=" font-weight: normal"> [[+order.delivery_cost]] [[%ms2_frontend_currency]]</td>
        </tr>
    `]]

    <tr>
        <td style=" text-align:left"></td>
        <td style=" text-align:right"><strong>[[%mspra_sh_footer_total_payment]]:</strong></td>
        <td style=" font-weight: normal; width: 100px"> [[+order.cost]] [[%ms2_frontend_currency]]</td>
    </tr>
</table>


<table class="summaryss">
    <tr>
        <td style="text-align:left">
            [[%mspra_sh_footer_total_items]] [[+total_count]], [[%mspra_sh_footer_total_na]] [[+order.cost]] [[%ms2_frontend_currency]]
        </td>
    </tr>
    <tr>
        <td style=" text-align:left">
            <strong>[[+order.cost_writing]]</strong>
        </td>
    </tr>
</table>
<hr class="bordersp">
<br>




<table class="summaryss" style="width:635px;">
    <tr>
        <td valign="top" style=" text-align:left; width: 18%">
            <div class="images_stamp" style="left:210px; margin-top: -90px; position: absolute;">

                <img width="300" height="300" src="data:image\png;base64, {$stamp}" alt="">
             
            </div>
            <strong>Генеральный директор</strong>
        </td>
        <td style="text-align:left; width: 200px"><hr style=" width: 130px; margin: 20px 0px 0px 0px;"></td>
        <td style="text-align:left; width: 200px"><hr style=" width: 250px; margin: 20px 0px 0px 0px;"></td>
        <td ></td>
    </tr>
    <tr>
        <td ></td>
        <td valign="top" style=" text-align: center; padding:0px; ">
            <div class="images_signature" style="left:130px; margin-top: -45px; position: absolute;">
              <img width="200" height="200" src="data:image\png;base64, {$signature}" alt="" height="100" />
            </div>
            [[%mspra_sh_signature]]
        </td>
        <td valign="top" style=" text-align: center; padding:0px;">
            <div class="signature" style="left:390px; margin-top: 5px; position: absolute; text-align: center; width: 180px">Балашов С В</div>
            [[%mspra_sh_signatures]]
        </td>
        <td ></td>
    </tr>
</table>
<br><br><br><br><br><br><br>
</div>
</div>
{ignore}
<style>
    .summaryss {width: 700px; text-align: right; margin-bottom: 0;  margin-top:0; line-height: 12px; margin-left: 0;}
</style>
{/ignore}