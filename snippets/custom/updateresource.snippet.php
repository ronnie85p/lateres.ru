<?php
$wfRess = $modx->services->get('wf_resources');
if (!$wfRess->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$properties = array_merge([
    'id' => $scriptProperties['resourceId'],
], $scriptProperties['where'] ?? []);

$response = $wfRess->runProcessor('object/get', $properties);
if ($response->isError()) {
    return $response->getMessage();
}

$resource = $response->getObject();

if ($_GET['status'] === 'success') {
    if (!empty($scriptProperties['tplStatus'])) {
        $output = $wfRess->pdoTools->getChunk($scriptProperties['tplStatus'], $resource);
        return $output;
    }
}

$pls = [
    'hash' => $hash,
    'resource' => $resource,
    'validation' => $scriptProperties['validation'] ?? []
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfRess->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;