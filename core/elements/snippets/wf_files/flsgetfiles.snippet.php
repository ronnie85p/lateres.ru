<?php
if (!$modx->services->has('wffiles')) {
    return '';
}

$wfFiles = $modx->services->get('wffiles');
$wfFiles->saveScriptProperties($scriptProperties);

if (!$wfFiles->initialize('web', $scriptProperties)) {
    return;
}

$tpl = $scriptProperties['tpl'] ?: '';
$tplPlaceholder = $scriptProperties['tplPlaceholder'] ?: '';
$tplThumbs = $scriptProperties['tplThumbs'] ?: '';
$tplWrapper = $scriptProperties['tplWrapper'] ?: '';

$autoLoadList = (int)$scriptProperties['autoLoadList'] ?: 0;

$output = '';
if (!$autoLoadList) {
    $response = $modx->runProcessor('files/getList', $scriptProperties, [
        'processors_path' => $wfFiles->config['processorsPath']
    ]);
    if (!$response->isError()) {
        $response = $response->getResponse();
        $results = (array)$response->results;
        if (!empty($tpl)) {
            foreach ($results as $item) {
                $output .= $wfFiles->pdoTools->getChunk($tpl, (array)$item);
            }
        }
    } else {
        die('<p><b>' . $response->getMessage() . '</b></p>');
    }
}

$totalCount = $modx->getCount('wfFiles\\flsFile', [
    'path' => $scriptProperties['container']
]);

$pls = [
    'hash' => $wfFiles->scriptPropertiesHash,
    'totalCount' => $totalCount
];

$thumbs = '';
if (!empty($tplThumbs)) {
    $thumbs = $wfFiles->pdoTools->getChunk($tplThumbs, array_merge($pls, ['output' => $output]));
}

$placeholder = '';
if (!empty($tplPlaceholder)) {
    $placeholder = $wfFiles->pdoTools->getChunk($tplPlaceholder, $pls);
}

if (!empty($tplWrapper)) {
    $output = $wfFiles->pdoTools->getChunk($tplWrapper,  array_merge($pls, [
        'thumbs' => $thumbs, 
        'placeholder' => $placeholder
    ]));
}

return $output;