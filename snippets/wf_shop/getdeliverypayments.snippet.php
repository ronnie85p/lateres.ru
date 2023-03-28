<?php
$deliveryId = $scriptProperties['deliveryId'] ?? 0;
$defaultConfig = [
    'select' => $modx->getSelectColumns('msPayment'),
    'where' => [
        'active' => 1,
        'Deliveries.delivery_id' => $deliveryId
    ],
    'rightJoin' => [
        'Deliveries' => [
            'class' => 'msDeliveryMember',
            'on' => 'Deliveries.payment_id = msPayment.id'
        ],
    ],
    'sortby' => 'rank',
    'sortdir' => 'ASC'
];

/** @var pdoFetch $pdoTools */
$pdoTools = $modx->services->get('pdofetch');

/** @var array $rows */
$rows = $pdoTools->getCollection('msPayment', null, 
    array_merge($defaultConfig, $scriptProperties));

$output = '';
foreach ($rows as $row) {
    if (!empty($scriptProperties['tpl'])) {
        $output .= $pdoTools->getChunk($scriptProperties['tpl'], $row);
    }
}

if (!empty($scriptProperties['tplWrapper'])) {
    $output = $pdoTools->getChunk($scriptProperties['tplWrapper'], ['output' => $output]);
}

return $output;