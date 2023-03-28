<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/Core.php';
require_once __DIR__ . '/src/Client.php';
require_once __DIR__ . '/src/Resource/Visits.php';

$modx->addPackage('App\\Model', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Auth', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Cart', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Review', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Resource', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Profile', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');
$modx->addPackage('App\\Model\\Delivery', $modx->getOption('app.core_path') . 'src/', 'app_', 'App\\');

$modx->services->add('app', function () use ($modx) {
    return new App\Core($modx);
});

$modx->services->add('app.client', function () use ($modx) {
    return new App\Client($modx);
});

$modx->services->add('app.resource_visits', function () use ($modx) {
    return new App\Resource\Visits($modx);
});