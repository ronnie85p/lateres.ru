<?php

require_once dirname(__FILE__, 2) . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$modx = new modX();
$modx->initialize('web');

$modx->invokeEvent('OnHandleRequest');
$response = $modx->runProcessor($_REQUEST['action'], $_REQUEST, [
    'processors_path' => $modx->getOption('app.core_path') . '/controllers/'
]);

if (!empty($_REQUEST['isAjax']) && (int) $_REQUEST['isAjax'] === 1) {
    exit(json_encode($response->getResponse()));
}

echo $response->getObject()['content'];