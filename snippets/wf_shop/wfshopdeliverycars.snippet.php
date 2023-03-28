<?php
$delivery = $modx->services->get('wf_shop_delivery');
if (!$delivery->initialize('web')) {
    return '';
}

$where = $scriptProperties['where'] ?? [];

$output = '';
$cars = $delivery->getCars($where);
foreach ($cars as $car) {
    $car = $car->toArray();
    if (!empty($scriptProperties['tpl'])) {
        $output .= $delivery->pdoTools->getChunk($scriptProperties['tpl'], $car);
    }
}

if (!empty($scriptProperties['tplWrapper'])) {
    $output = $delivery->pdoTools->getChunk($scriptProperties['tplWrapper'], [
        'output' => $output
    ]);
}

return $output;