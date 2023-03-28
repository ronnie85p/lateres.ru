<?php

if (in_array($modx->context->get('key'), ['mgr']) || 
!($modUserGroup = $modx->user->getOne('PrimaryGroup'))) {
break;
}

// Определяем базовый url
$baseUrl = preg_match('/(\/.+){1,}/', $_SERVER['REQUEST_URI'], $matches, 0, 1)
? str_replace($matches[0], '', $_SERVER['REQUEST_URI']) 
: $_SERVER['REQUEST_URI'];
$baseUrl = trim($baseUrl, '/');
$httpHost = preg_replace('/www\./', '', $_SERVER['HTTP_HOST']) . '/' . $baseUrl;
$context = '';

$acs = $modx->getCollection(\modAccessContext::class, [
'principal' => $modUserGroup->get('id'),
'principal_class' => 'MODX\\Revolution\\modUserGroup',
'target:!=' => $modx->context->key        
]);

foreach ($acs as $ac) {
// Проверяем есть ли такой контекст,
// если контекст найден завершаем цикл.
if ($modx->getCount(modContextSetting::class, [
    'context_key' => $ac->get('target'), 
    'key' => 'http_host', 
    'value' => $httpHost
])) {
    $context = $ac->get('target');
    break;
}
} 

if ($context) {
$modx->switchContext($context);

$uri = ltrim(str_replace($baseUrl, '', $_REQUEST['q']), '/');

$_REQUEST['q'] = $uri;
$_SERVER['REQUEST_URI'] = $uri; 
}

// echo print_r([
//     'baseUrl' => $baseUrl,
//     'httpHost' => $httpHost,
//     'foundContext' => $context,
//     'context' => $modx->context->key,
//     'uri' => $uri
// ], true);

// echo 'q = ' . $_REQUEST['q'];