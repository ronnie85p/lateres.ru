<?php
// $wfRess = $modx->services->get('wf_resources');
// if (!$wfRess->initialize('web', $scriptProperties, $hash)) {
//     return '';
// }

if (!$modx->services->has('wf_profile')) {
    return '';
}

$wfProfile = $modx->services->get('wf_profile');
if (!$wfProfile->initialize('web')) {
    return '';
}

$profile = array_merge($modx->user->Profile->toArray(), $modx->user->Profile->get('extended') ?: []);

$pls = [
    'hash' => $hash,
    'profile' => $profile,
    'validation' => $scriptProperties['validation'] ?? []
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfProfile->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;