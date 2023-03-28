<?php

require_once __DIR__ . '/model/minishop2/minishop2.class.php';

$miniShop2 = new miniShop2($modx);
$miniShop2->loadMap();

$modx->services->add('minishop2', $miniShop2);

// $modx->addPackage('minishop2', MODX_CORE_PATH . 'components/minishop2/model/minishop2/');

$modx->classMap['MODX\\Revolution\\modResource'][] = 'msCategory';
$modx->classMap['MODX\\Revolution\\modResource'][] = 'msProduct';