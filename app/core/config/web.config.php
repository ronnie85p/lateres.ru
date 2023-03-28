<?php

require_once dirname(__DIR__, 3) . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$modx = new modX();
$modx->initialize('web');
$modx->invokeEvent('OnHandleRequest');

$app = $modx->services->get('app');

$namespace = 'app';
$language = $modx->getOption('cultureKey', null, 'en');

$topPanelResources = $modx->runSnippet('pdoMenu', [
    'resources' => '11, 28, 410, 411', 
    'return' => 'data',
]);

$categoryResources = $modx->runSnippet('pdoMenu', [
    'parent' => '103',
    'templates' => '11',
    'return' => 'data',
]);

foreach ($topPanelResources as &$res) {
    $res['url'] = $modx->makeUrl($res['id'], '', '', 'full');
}

return [
    'namespace' => $namespace,
    'language' => $language,
    'context' => $modx->context->get('key'),
    'config' => array_merge($app->getSystemConfig('site'), $app->getSystemConfig($namespace)),
    'lang' => $app->getLanguageLexicons($language, $namespace),
    'user' => $app->getUserInfo(),
    'request_uri' => $_SERVER['REQUEST_URI'],
    'topPanel' => [
        'items' => $topPanelResources,
    ],
    'logo' => [
      'src' => $modx->getOption('app.site_url') . '/'. $modx->getOption('site_logo'),
      'homeUrl' => $modx->getOption('app.site_url'),
    ],
    'categories' => $categoryResources,
];

