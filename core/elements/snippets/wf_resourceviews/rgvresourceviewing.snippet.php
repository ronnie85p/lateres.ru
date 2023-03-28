<?php
$resourceId = $scriptProperties['resourceId'] ?? $modx->resource->id;

$rgViews = $modx->services->get('rgviews');
$rgViews->setConfig($scriptProperties);
$views = $rgViews->getService('Views', 'Views');

$views->setResourceId($resourceId);

if ($views->has()) {
    return;
}

$views->add();

echo 'ClassName: ' . is_object($views);