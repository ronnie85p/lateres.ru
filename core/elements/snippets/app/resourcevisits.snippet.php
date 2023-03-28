<?php
if (!$modx->services->has('app.resource_visits')) {
    return '';
}

$toPlaceholder = 'visits.';
if (!empty($scriptProperties['toPlaceholder'])) {
    $toPlaceholder = $scriptProperties['toPlaceholder'];
}

/** @var \App\Client $client */
$client = $modx->services->get('app.client');
$browser = $client->getBrowser();

$resourceId = $scriptProperties['resource_id'];
$resourceId = empty($resourceId) ? $modx->resource->id : $resourceId;
$data = [
    'ip' => $client->getIp(),
    'ssid' => session_id(),
    'user_agent' => $browser->getUserAgent(),
    'resource_id' => $resourceId,
];

/** @var \App\Resource\Visits $visits */
$visits = $modx->services->get('app.resource_visits');

if (!$visits->hasToday($data)) {
    $visits->create($data);   
}

$stats = $visits->getStats($data);
        
if (!empty($toPlaceholder)) {
    $modx->setPlaceholders($stats, $toPlaceholder);
}

return '';