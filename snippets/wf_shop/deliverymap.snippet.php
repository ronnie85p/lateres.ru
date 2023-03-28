<?php
/** @var Shop $shop */
$shop = $modx->services->get('wf_shop');

$yaMapsApi = $scriptProperties['yandexMapsApi'] ?? 
    $modx->getOption('yandex_maps_api');

$jsConfig = [
    'hash' => '',
    'connectorUrl' => $shop->config['connectorUrl'],
    'controllerUrl' => $shop->config['controllerUrl']
];

$modx->regClientScript($yaMapsApi);
$modx->regClientScript($shop->config['jsUrl'] . 'delivery/map.js');
$modx->regClientScript('<script>DeliveryMaps.initialize('. json_encode($jsConfig) .');</script>', true);

echo $modx->getRegisteredClientScripts();