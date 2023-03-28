<?php
$defaultConfig = [
    'where' => [
        'active' => 1
    ],
    'sortby' => 'rank',
    'sortdir' => 'ASC'
];

/** @var pdoFetch $pdoTools */
$pdoTools = $modx->services->get('pdofetch');

/** @var array $rows */
$rows = $pdoTools->getCollection('WF\\Shop\\Model\\PaymentStatus', null, 
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