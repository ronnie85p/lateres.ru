<?php
if (!$modx->services->has('wf_shop')) {
    return 'is not';
}

$wfShop = $modx->services->get('wf_shop');
if (!$wfShop->initialize('web', $scriptProperties)) {
    return;
}

$pls = [];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfShop->pdoTools->getChunk($scriptProperties['tpl'],  $pls);
}

return $output;