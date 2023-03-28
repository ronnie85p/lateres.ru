<?php
$pdoTools = $modx->services->get('pdofetch');

$msDelivery = $modx->getObject('msDelivery', $_GET['id']);
if (!$msDelivery) {
    return 'Delivery not found.';
}

$delivery = $msDelivery->toArray();

$pls = [
    'delivery' => $delivery
];


return $pdoTools->getChunk($scriptProperties['tpl'], $pls);