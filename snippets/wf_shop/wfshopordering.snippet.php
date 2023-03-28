<?php
$order = $modx->services->get('wf_order');
if (!$order->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$defaultDeliveryId = (int)$scriptProperties['defaultDeliveryId'] ?: 
    $modx->getOption('wf_shop.ordering_default_delivery_id', null, 2);
$defaultPaymentId = (int)$scriptProperties['defaultPaymentId'] ?:
    $modx->getOption('wf_shop.ordering_default_payment_id', null, 1);

$data = $order->get();
$deliveries = $order->getObjects('msDelivery');
$deliveryTpl = $order->getTemplate('order/delivery/index', [
    'delivery' => $defaultDeliveryId,
    'payment' => $defaultPaymentId
]);

$output = '';
if (!empty($scriptProperties['tpl'])) {

    if (!empty($scriptProperties['tplSummary'])) {
        $summary = $order->pdoTools->getChunk($scriptProperties['tplSummary'], [
            'order' => $data
        ]);
    }

    $output = $order->pdoTools->getChunk($scriptProperties['tpl'], [
        'hash' => $hash,
        'order' => $data,
        'delivery' => $defaultDeliveryId,
        'deliveries' => $deliveries,
        'deliveryTpl' => $deliveryTpl,
        'summary' => $summary
    ]);
}

return $output;