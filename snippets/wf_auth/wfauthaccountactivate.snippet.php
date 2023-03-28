<?php
if (!$modx->services->has('wf_auth')) {
    return 'Service could not registered';
}

$wfAuth = $modx->services->get('wf_auth');
if (!$wfAuth->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$uri = trim(rawurldecode($_SERVER['REQUEST_URI']), '/'); 
$data = $wfAuth->getCache($uri);
if (empty($data) || !$data['user_id'] || (!$user = $modx->getObject(modUser::class, $data['user_id']))) {
    $modx->sendErrorPage();
}

$tpl = $scriptProperties['tplSuccess'];
if (!$user->get('active')) {
    $user->set('active', true);
    if (!$user->save()) {
        $tpl = $scriptProperties['tplFailure'];
    }
}

$wfAuth->deleteCache($uri);

$pls = [

];

$output = '';
if (!empty($tpl)) {
    $output = $wfAuth->pdoTools->getChunk($tpl, $pls);
}

return $output;