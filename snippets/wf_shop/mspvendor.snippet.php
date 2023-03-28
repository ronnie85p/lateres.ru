<?php
$pdoTools = $modx->services->get('pdofetch');

$msVendor = $modx->getObject('msVendor', $_GET['id']);
if (!$msVendor) {
    return 'Vendor not found.';
}

$vendor = $msVendor->toArray();

$pls = [
    'vendor' => $vendor
];


return $pdoTools->getChunk($scriptProperties['tpl'], $pls);