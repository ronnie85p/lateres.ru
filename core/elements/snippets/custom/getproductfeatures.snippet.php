<?php
if (!$modx->services->has('pdofetch')) {
    return;
}

$pdoTools = $modx->services->get('pdofetch');

$category = 13;
$productId = $scriptProperties['productId'] ?? $modx->resource->id;

$q= $modx->newQuery('modTemplateVarResource');
$q->select(['modTemplateVarResource.*', 'TemplateVar.*']);
$q->where([
    'contentid' => $productId, 
    'TemplateVar.category' => $category
]);
$q->innerJoin('modTemplateVar', 'TemplateVar', [
    '`TemplateVar`.`id` = `modTemplateVarResource`.`tmplvarid`'
]);

$rows = [];
if ($q->prepare() && $q->stmt->execute()) {
    $rows = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
}

$output = '';
foreach ($rows as $row) {
    $value = &$row['value'];
    if ($row['type'] == 'listbox') {
        if (!empty($value)) {
            $q= $modx->newQuery('modResource');
            $q->select($modx->getSelectColumns('modResource', '', '', ['pagetitle']));
            $q->where(['id' => $value]);
            $value = 0;
            if ($q->prepare() && $q->stmt->execute()) {
                $value = $q->stmt->fetch(PDO::FETCH_NUM)[0];
            }
        }
    } 
    if (!empty($value)) {
        if (!empty($scriptProperties['tpl'])) {
            $output .= $pdoTools->getChunk($scriptProperties['tpl'], $row);
        }
    }
}

if (!empty($scriptProperties['tplWrapper'])) {
    $output = $pdoTools->getChunk($scriptProperties['tplWrapper'], ['output' => $output]);
}

// echo '<pre>' . print_r($rows, true) . '</pre>';
return $output;