<?php
if (!$modx->services->has('wf_auth')) {
    return 'Service could not registered';
}

$wfAuth = $modx->services->get('wf_auth');
if (!$wfAuth->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$pls = [
    'hash' => $hash
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfAuth->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;