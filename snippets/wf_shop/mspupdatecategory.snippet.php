<?php
$mShop = $modx->services->get('mshop');
$mShop->setConfig($scriptProperties);
$mShop->saveScriptProperties($scriptProperties);

$id = $_GET['id'];
$msCategory = $modx->getObject('modResource', $_GET['id']);
if (!$msCategory) {
    return 'Категория не найдена.';
}

$category = $msCategory->toArray();
foreach ($msCategory->getTemplateVars() as $tv) {
    $category[$tv->get('name')] = $tv->get('value');
}

$jsConfig = [
    'hash' => $mShop->config['sc_hash'],
    'connectorUrl' => $mShop->config['connectorUrl'],
];

$modx->regClientScript('<script>
    var mShopProductConfig = ' . json_encode($jsConfig) . ';
</script>', true);

if (!$mShop->initialize('web')) {
    return;
}

$pls = [
    'hash' => $mShop->config['sc_hash'],
    'category' => $category
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $mShop->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;