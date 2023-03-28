<?php
$wfRess = $modx->services->get('wf_resources');

$properties = array_merge([
    'id' => $scriptProperties['id'] ?? 0,
    'template' => $scriptProperties['template'] ?? 0,
], $scriptProperties['where'] ?: []);

$response = $wfRess->runProcessor('object/get', $properties);
if ($response->isError()) {
    return $response->getMessage();
}

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfRess->pdoTools->getChunk($scriptProperties['tpl'], $response->getObject());
}

return $output;