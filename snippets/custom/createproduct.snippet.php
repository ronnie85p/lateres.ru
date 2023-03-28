<?php
$wfShop = $modx->services->get('wf_shop');
if (!$wfShop->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$modx->regClientScript($wfShop->config['jsUrl'] . 'product.js');

$fields = [];
$validation = $scriptProperties['validation'] ?? [];
foreach ($validation as $fieldName => $params) {
    $fields[$fieldName] = [
        'attrs' => '',
        'label' => ''
    ];

    foreach ($params as $k => $v) {
        $k = strtolower($k);
        if ($k == 'required' && (int)$v) {
            $v = 'required';
            $fields[$fieldName]['label'] = '<span class="text-danger">*</span>';
        }
        $fields[$fieldName]['attrs'] .= " {$k}=\"{$v}\"";
    }
}

$pls = [
    'hash' => $hash,
    'fields' => $fields,
    'validation' => $scriptProperties['validation'] ?? []
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $wfShop->pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;