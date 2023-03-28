<?php
$shop = $modx->services->get('wf_shop');
if (!$shop->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$orderId = $scriptProperties['id'] ?? '';
$order = $shop->getOrder($orderId);

if (!$order) {
    return "<b>Order #{$orderId} not found.</b>";
}

$pls = [
    'order' => $order,
    'hash' => $hash
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $shop->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;