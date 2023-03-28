<?php
if (!$modx->services->has('wf_tools')) {
    return;
}

$wfTools = $modx->services->get('wf_tools');
if (!$wfTools->initialize('web', $scriptProperties, $hash)) {
    return;
}

$modx->regClientScript($wfTools->config['jsUrl'] . 'manager.js');

$pls = [
    'hash' => $hash
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;