<?php
if (!$modx->services->has('pdofetch')) {
    return;
}

$defaultConfig = [
    'class' => 'msVendor',
    'fastMode' => 1,
    'result' => 'data',
    'limit' => 100,
    'sortby' => 'id',
    'sortdir' => 'ASC',
    'disableConditions' => 1,
];

$tpl = $scriptProperties['tpl'] ?? '';
$tplWrapper = $scriptProperties['tplWrapper'] ?? '';
// unset($scriptProperties['tpl'], $scriptProperties['tplWrapper']);

$pdoTools = $modx->services->get('pdofetch');
$pdoTools->setConfig(array_merge($defaultConfig, $scriptProperties));

return $pdoTools->run();