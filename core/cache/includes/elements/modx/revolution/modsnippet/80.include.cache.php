<?php
if (!$modx->services->has('app')) {
    return 'No app';
}

/*@var \App\Core $app*/
$app = $modx->services->get('app');

$basename = basename($_SERVER['REQUEST_URI']);
$pdfConfig = array_merge([
    'title' => $basename,
    'outFile' => $basename,
], $scriptProperties);

$pdfOptions = array_merge($scriptProperties['pdfOptions'] ?? [], 
    $app->toArray($modx->resource, true, 'properties'));

/*@var \App\Core\PDFBuilder $pdfBuilder*/    
$pdfBuilder = $app->getService('pdfBuilder', 
    \App\Core\PDFBuilder::class, $pdfConfig);

$output = $pdfBuilder->make($pdfOptions);
if ($output === false) {
    die('<b>PDF generation error occurred</b>');
}

exit($output);
return;
