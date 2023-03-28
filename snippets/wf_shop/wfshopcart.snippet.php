<?php
if (!$modx->services->has('wf_cart')) {
    return '';
}

$cart = $modx->services->get('wf_cart');
$total = $cart->getTotal();
$items = $cart->get();

$scriptProperties['jsConfig'] = [
    'items' => $items
];

if (!$cart->initialize('web', $scriptProperties, $hash)) {
    return '';
}

$output = '';
foreach ($items as $item) {
    if ($cart->getProduct($item['product_id'])) {
        $item['product'] = $cart->product->toArray();
        foreach ($cart->product->getTemplateVars() as $tv) {
            $item['product'][$tv->get('name')] = $tv->get('value');
        }
        $item['has_fav'] = $modx->getCount('WF\\Shop\\Model\\Favorite', [
            'user_id' => $modx->user->id, 
            'product_id' => $item['product_id']
        ]) > 0;
    }

    if (!empty($scriptProperties['tpl'])) {
        $output .= $cart->pdoTools->getChunk($scriptProperties['tpl'], $item);
    }
}

if (!empty($scriptProperties['tplWrapper'])) {
    if (!empty($scriptProperties['tplSummary'])) {
        $summary = $cart->pdoTools->getChunk($scriptProperties['tplSummary'], [
            'total' => $total
        ]);
    }

    $output = $cart->pdoTools->getChunk($scriptProperties['tplWrapper'], [
        'total' => $total,
        'output' => $output, 
        'summary' => $summary
    ]);
}

return $output;