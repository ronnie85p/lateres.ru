<?php
if (!$modx->services->has('pdofetch')) {
    return ;
}

$pdoTools = $modx->services->get('pdofetch');

$defaultConfig = array_merge([
    'limit' => 25,
    'level' => 1,
    'strictMode' => 0,
    'ajaxMode' => 0,
    'pageLimit' => 5,
    // 'tplPage' => '',
    // 'tplPageActive' => '',
    // 'tplPageWrapper' => '@INLINE {$output}',
    // 'tplPagePrev' => '',
    // 'tplPageNext' => '',
    // 'tplPageFirst' => '',
    // 'tplPageLast' => '',
    // 'tplPageSkip' => ''
], $scriptProperties);

$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
if (!$isAjax) {
    
    if (!empty($defaultConfig['tplOuter'])) {
        $tplOuter = $defaultConfig['tplOuter'];
        unset($defaultConfig['tplOuter']);
    }

    $hash = md5(json_encode($defaultConfig));
    $_SESSION['scripts']['Ry\\Tools'][$hash] = array_merge($defaultConfig, ['tplWrapper' => $tplWrapper]);

    $jsConfig = [
        'connectorUrl' => 'assets/components/rytools/connector.php',
        'hash' => $hash
    ];

    $modx->regClientScript('
        <script>
            var ryToolsPageConfig = ' . json_encode($jsConfig) . '
        </script>
    ', true);

}

$output = $modx->runSnippet('pdoPage', $defaultConfig);

if (!empty($tplOuter)) {
    $output = $pdoTools->getChunk($tplOuter, ['output' => $output]);
}

return $output;