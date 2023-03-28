<?php
$wfRess = $modx->services->get('wf_resources');
if (!$wfRess->initialize('web', $scriptProperties, $hash)) {
    return '';
}

if ($_GET['status'] == 'success') {
    if (!empty($scriptProperties['tplStatus'])) {
        $response = $wfRess->runProcessor('resource/get', ['id' => $_GET['id']]);
        if ($response->isError()) {
            return $response->getMessage();
        }

        $output = $wfRess->pdoTools->getChunk($scriptProperties['tplStatus'], $response->getObject());
        return $output;
    }
}

$pls = [
    'hash' => $hash,
    'validation' => $scriptProperties['validation'] ?? []
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfRess->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;