<?php
$orderId = $scriptProperties['orderId'] ?? 0;
$defaultConfig = [
    'where' => [
        'order_id' => $orderId
    ],
    // 'sortby' => 'rank',
    // 'sortdir' => 'ASC'
];

/** @var pdoFetch $pdoTools */
$pdoTools = $modx->services->get('pdofetch');

/** @var array $rows */
$rows = $pdoTools->getCollection('msOrderProduct', null, 
    array_merge($defaultConfig, $scriptProperties));

$output = '';
foreach ($rows as $row) {
    $row = array_merge($row, $row['options']?:[], $row['properties']?:[]);
    
    unset($row['options'], $row['properties']);
    if (!empty($scriptProperties['tpl'])) {
        $output .= $pdoTools->getChunk($scriptProperties['tpl'], $row);
    }
}

if (!empty($scriptProperties['tplWrapper'])) {
    $output = $pdoTools->getChunk($scriptProperties['tplWrapper'], ['output' => $output]);
}

return $output;