<?php
require_once dirname(__FILE__, 2) . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$modx = new modX();
$modx->initialize('web');
$modx->invokeEvent('OnHandleRequest');

$app = $modx->services->get('app');

$post = file_get_contents('php://input');
$post = empty($post) ? [] : json_decode($post, true);
$data = array_merge($_REQUEST, $post);
$action = empty($data['action']) ? '' : $data['action'];

$response = $app->runProcessor($action, $data);
exit(json_encode($response->getResponse()));