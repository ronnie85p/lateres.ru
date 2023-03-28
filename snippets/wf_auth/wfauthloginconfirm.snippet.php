<?php
if (!$modx->services->has('wf_auth')) {
    return 'Service could not registered';
}

$wfAuth = $modx->services->get('wf_auth');
if (!$wfAuth->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$loginProperties = $_SESSION['wf_auth.login.' . $_GET['lt']];
$isExpired = false;

if (!empty($loginProperties)) {
    $timestamp = $loginProperties['timestamp'] ?? 0;
    $expires = !empty($scriptProperties['expires']) ? $scriptProperties['expires']
        : $modx->getOption('wf_auth.login_two_auth_expires', null, '');

    if (!empty($expires)) {
        $expires = is_numeric($expires) ? $timestamp + $expires : strtotime($expires); 
    }

    $expires = (int) $expires;

    if ($expires > 0 && $expires < time()) {
        $isExpired = true;
    } else {
 
        $profileSettings = $modx->getObject('WF\\Auth\\Model\\ProfileSettings', [
            'user_id' => $loginProperties['user_id'],
            'two_auth_enabled' => 1
        ]);

        if ($profileSettings) {

            $loginMethod = $profileSettings->getOne('TwoAuthMethod');
            
            if ($loginMethod) {

                $tpl = '';
                if (!empty($scriptProperties['tplMethod' . $loginMethod->id])) {
                    $tpl = $scriptProperties['tplMethod' . $loginMethod->id];
                }
     
                $pls = [
                    'hash' => $hash,
                ];

                if ($loginMethod->get('id') == 2) {
                    $questions = $modx->getCollection('WF\\Auth\\Model\\SecurityQuestion', [
                        'user_id:=' => 0,
                        'OR:user_id:=' => $modx->user->id
                    ]);
                
                    $pls['questions'] = $questions;
                }

                if (!empty($tpl)) {
                    $output = $wfAuth->pdoTools->getChunk($tpl, $pls);
                }
    
                if (!empty($scriptProperties['tplWrapper'])) {
                    $output = $wfAuth->pdoTools->getChunk($scriptProperties['tplWrapper'], ['output' => $output]);
                }
                
                return $output;    
            } else {
                $isExpired = true;
            }          

        } else {
            $isExpired = true;
        }

    }

} else {
    $isExpired = true;
}

if ($isExpired) {
    return 'Time expires';
}