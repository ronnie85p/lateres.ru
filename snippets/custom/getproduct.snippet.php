<?php
/** @var pdoFetch $pdoTools */
$pdoTools = $modx->services->get('pdofetch');

/** @var int $productId */
$productId = (int)$scriptProperties['id'] ?: $modx->resource->id;

$defaultConfig = [
    'parents' => 0,
    'where' => ['id' => $productId],
    'return' => 'json'
];

/** @var array $productData */
$productData = json_decode($modx->runSnippet('msProducts', 
    array_merge($scriptProperties, $defaultConfig)), true)[0];

if (empty($productData)) {
    return "No such product #{$productId}";
}

$views = [
    'count' => 2,
    'day' => 1
];

$reviews = [
    'count' => 25
];

$questions = [
    'count' => 12
];

$orders = [
    'count' => 1
];

$rating = [
    'rate' => 4.5
];

$images = [];
for ($i = 0; $i < 9; $i++) {
    $tvKey = $i > 0 ? "img_{$i}" : 'img';
    $tvValue = $productData[$tvKey];
    if ($tvValue) {
        $url = strpos('assets', $tvValue) === false ? "https://309921.selcdn.ru/l-s-ru/" : "https://www.lateres.ru/";
        $images[] = $url . $tvValue;
    }
}

// echo print_r($images, true);

$pls = [
    'product' => $productData,
    'images' => $images,
    'rating' => $rating,
    'reviews' => $reviews,
    'views' => $views,
    'orders' => $orders,
    'questions' => $questions
];

$output = '';
if (!empty($scriptProperties['tpl'])) {
    $output = $pdoTools->getChunk($scriptProperties['tpl'], $pls);
}

return $output;