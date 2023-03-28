<!-- Квитанция об оплате -->
<table id="tablekvita" border="0" width="99%">
    <tr>
        <td width="290" height="350" valign="top" style=" border-right: 2px dashed #666;">
            <div style="top:70px; left:200px; position: absolute;">[[%mspra_kv_notice]]</div>
            <div style="top: 300px; left:100px; position: absolute;">[[%mspra_kv_cashier]]</div>
        </td>
        <td width="500px" valign="top">

            <table  border="0" width="99%">
                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok">
                            <div class="spanss widch">[[+org.name]]</div>
                            <small>[[%mspra_kv_name_payment]]</small>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 180px;">
                            <div class="spanss widch">[[+org.inn]]</div>
                            <small>[[%mspra_kv_r_inn]]</small>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 258px; margin-left: 50px;">
                            <div class="spanss widch">[[+org.ks]]</div>
                            <small>[[%mspra_kv_num_sh]]</small>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch">[[+org.name_bank]]</div>
                            <small>[[%mspra_kv_name_bank]]</small>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 150px;">
                            <div class="spanss widch">[[%mspra_kv_bik]] [[+org.bik_bank]]</div>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 319px; margin-left: 50px;">
                            <div class="spanss widch">[[+org.kr]]</div>
                            <small>[[%mspra_kv_kr_bank]]</small>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 230px;">
                            <div class="spanss widch">[[%mspra_kv_payment_num]] [[+order.num]]</div>
                            <small>[[%mspra_kv_payment_name]]</small>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 270px; margin-left: 20px;">
                            <div class="spanss widch" style=" height: 30px;">______________________________________</div>
                            <small>[[%mspra_kv_num_sh_r]]</small>
                        </div>
                    </td>
                </tr>


                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok">
                            <div class="spanss widch" style=" border: 0px; float:left;">
                                [[%mspra_kv_fio]]__________________________________________________

                                <div style="position: absolute; top: 213px; left: 420px;">
                                    [[+address.receiver]]
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch" style=" border: 0px; float:left;">
                                [[%mspra_kv_address]]__________________________________________________</div>
                            <div style="font-size: 9px;  position: absolute;width: 285px; bottom: 876px; left: 420px;">
                                [[+address.city:ne=``:then=`г. [[+address.city]] `]]
                                [[+address.street:ne=``:then=`, [[+address.street]]`]]
                                [[+address.building:ne=``:then=`,д. [[+address.building]]`]]
                                [[+address.room:ne=``:then=`, кв./оф. [[+address.room]]`]]
                            </div>


                        </div>
                    </td>
                </tr>


                <tr>
                    <td colspan="2" width="500px" valign="top" align="right">
                        [[%mspra_kv_total_paument]]: [[+order.cost_rub]] [[%ms2_frontend_currency]] [[+order.cost_kop]] [[%mspra_kv_kop]]
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" align="right">
                        [[%mspra_kv_total]]: [[+order.cost_rub]] [[%ms2_frontend_currency]] [[+order.cost_kop]] [[%mspra_kv_kop]]
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch" style="width: 250px;">_____________________________________</div>
                            <small>[[%mspra_kv_signature]]</small>
                        </div>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

<div class="images_stamp" style="left:90px; margin-top: -280px; position: absolute;">[[+images.stamp:ne=``:then=`<img width="200" height="200" src="[[+images.stamp]]" alt="">`]]</div>
<div class="images_stamp" style="left:60px; margin-top: 20px; position: absolute;">[[+images.stamp:ne=``:then=`<img width="200" height="200" src="[[+images.stamp]]" alt="">`]]</div>


<div class="signature" style="left:100px; margin-top: -20px; position: absolute; ">[[!+org.manager]]</div>
<div class="signature" style="left:100px; margin-top: 250px; position: absolute; ">[[!+org.manager]]</div>

<div class="images_signature" style="left:100px; margin-top: -150px; position: absolute;">[[+images.signature:ne=``:then=`<img width="200" height="200" src="[[+images.signature]]" alt="">`]]</div>
<div class="images_signature" style="left:100px; margin-top: 130px; position: absolute;">[[+images.signature:ne=``:then=`<img width="200" height="200" src="[[+images.signature]]" alt="">`]]</div>

<table id="tablekvita" border="0" width="99%">
    <tr>
        <td width="290" height="350" valign="top" style=" border-right: 2px dashed #666;">
            <div style="top: 345px; left:200px; position: absolute;">[[%mspra_kv_notice]]</div>
            <div style="top: 570px; left:100px; position: absolute;">[[%mspra_kv_cashier]]</div>
        </td>
        <td width="500px" valign="top">

            <table  border="0" width="99%">
                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok">
                            <div class="spanss widch">[[+org.name]]</div>
                            <small>[[%mspra_kv_name_payment]]</small>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 180px;">
                            <div class="spanss widch">[[+org.inn]]</div>
                            <small>[[%mspra_kv_r_inn]]</small>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 258px; margin-left: 50px;">
                            <div class="spanss widch">[[+org.ks]]</div>
                            <small>[[%mspra_kv_num_sh]]</small>
                        </div>
                    </td>
                </tr>


                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch">[[+org.name_bank]]</div>
                            <small>[[%mspra_kv_name_bank]]</small>
                        </div>
                    </td>
                </tr>


                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 150px;">
                            <div class="spanss widch">[[%mspra_kv_bik]] [[+org.bik_bank]]</div>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 319px; margin-left: 50px;">
                            <div class="spanss widch">[[+org.kr]]</div>
                            <small>[[%mspra_kv_kr_bank]]</small>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="230" valign="top" >
                        <div id="blok" class="fk" style=" width: 230px;">
                            <div class="spanss widch">[[%mspra_kv_payment_num]] [[+order.num]]</div>
                            <small>[[%mspra_kv_payment_name]]</small>
                        </div>
                    </td>
                    <td width="270" valign="top" >
                        <div id="blok" class="fk" style=" width: 270px; margin-left: 20px;">
                            <div class="spanss widch" style=" height: 30px;">______________________________________</div>
                            <small>[[%mspra_kv_num_sh_r]]</small>
                        </div>
                    </td>
                </tr>


                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok">
                            <div class="spanss widch" style=" border: 0px; float:left;">
                                [[%mspra_kv_fio]]__________________________________________________

                                <div style="position: absolute; top: 488px; left: 420px;">
                                    [[+address.receiver]]
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch" style=" border: 0px; float:left;">
                                [[%mspra_kv_address]]__________________________________________________</div>
                            <div style="font-size: 9px;  position: absolute;width: 285px; bottom: 600px; left: 420px;">
                                [[+address.city:ne=``:then=`г. [[+address.city]] `]]
                                [[+address.street:ne=``:then=`, [[+address.street]]`]]
                                [[+address.building:ne=``:then=`,д. [[+address.building]]`]]
                                [[+address.room:ne=``:then=`, кв./оф. [[+address.room]]`]]
                            </div>
                        </div>
                    </td>
                </tr>


                <tr>
                    <td colspan="2" width="500px" valign="top" align="right">
                        [[%mspra_kv_total_paument]]: [[+order.cost_rub]] [[%ms2_frontend_currency]] [[+order.cost_kop]] [[%mspra_kv_kop]]
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" align="right">
                        [[%mspra_kv_total]]: [[+order.cost_rub]] [[%ms2_frontend_currency]] [[+order.cost_kop]] [[%mspra_kv_kop]]
                    </td>
                </tr>

                <tr>
                    <td colspan="2" width="500px" valign="top" >
                        <div id="blok" >
                            <div class="spanss widch" style="width: 250px;">_____________________________________</div>
                            <small>[[%mspra_kv_signature]]</small>
                        </div>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
<hr />
<br>
<br>
</div>
</div>
<style>
    body {
        font-size: 12px;
        color: #000;
        background-color: #fff;
        font-family:font-family:Arial, Helvetica, sans-serif;
        margin: 10px 30px 20px 30px;
    }
    .wrapper {
        width: 700px;
        page-break-after: always;
        position: relative;
    }
    .wrapper:last-child {
        page-break-after: auto;
    }
    h1 {
        font-weight: normal;
        float: left;
        font-weight: bold;
        margin-bottom: 0px;
        font-size: 16px;
    }
    b{ color:#F00; font-size: 14px ; font-weight: bold;}

    table { border-spacing: 4px; font-size: 10px; }
    table.generalInfo th { text-align: left; padding-right: 50px; }
    table.generalInfo td {}
    table.itemsInfo      { border-collapse: collapse; width: 100%; }
    table.itemsInfo th   { text-align: center; font-weight: bold; }
    table.itemsInfo th, table.itemsInfo td { border: solid 1px #000; padding: 3px; }
    td.center { text-align: center; }
    td.money  { text-align: right; width: 120px; }
    table.signs { margin-top: 50px; }
    table.signs td {width: 350px; vertical-align: top; line-height: 200%;}
    .summary {width:700px; text-align: left;  margin-top:10px; line-height: 27px; }
    .summary.ito{ width: 700px; text-align: left;  margin-top:10px; line-height: 13px; font-weight: bold;}
    .summaryss {width: 700px; text-align: right; margin-bottom: 0px;  margin-top:0px; line-height: 12px; margin-left: 0px;}
    .topss{ font-size: 9px; text-align:center; margin-bottom: 10px;}
    .mips { font-size: 10px;}
    .bordersp { background:#000; height: 2px; display: block; width: 100%; border: 0px;  margin: 0px 0px 20px 0px;}
    .infobank{ font-size: 11px; margin-bottom: 20px;}
    .generalInfo { margin-bottom: 20px; font-size: 10px;}

</style>
<style>
    #tablekvita {
        border: 2px dashed #666;
        border-width: 2px 2px 0px 2px;
        margin: 0px 5px 0px 5px;
        display: table;
        width: 890px;
        height: 350px;
        font-size: 15px;
        font-family: Arial, sans-serif;
    }
    #tablekvita td{
        height: 30px;
        font-size: 15px;
        margin-bottom: 5px;
    }

    #blok { display: table; width: 100%; margin-bottom: 3px; position: relative;}
    #blok .spanss{ border-bottom: 1px solid #000; padding-bottom: 1px; height: 18px;}
    #blok span.widch{ width: 100%; }
    #blok small{}
    #blok.fk{ float:left; }
</style>