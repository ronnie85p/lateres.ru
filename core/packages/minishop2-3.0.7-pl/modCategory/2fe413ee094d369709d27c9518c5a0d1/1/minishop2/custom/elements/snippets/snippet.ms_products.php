<?php

/** @var modX $modx */
/** @var array $scriptProperties */
/** @var miniShop2 $miniShop2 */
$miniShop2 = $modx->services->get('minishop2');
$miniShop2->initialize($modx->context->key);
$miniShop2->pdoTools->addTime('pdoTools loaded.');

if (isset($parents) && $parents === '') {
    $scriptProperties['parents'] = $modx->resource->id;
}

if (!empty($returnIds)) {
    $scriptProperties['return'] = 'ids';
}

if ($scriptProperties['return'] === 'ids') {
    $scriptProperties['returnIds'] = true;
}

// Start build "where" expression
$where = [
    'class_key' => 'msProduct',
];
if (empty($showZeroPrice)) {
    $where['Data.price:>'] = 0;
}
// Add grouping
$groupby = [
    'msProduct.id',
];

// Join tables
$leftJoin = [
    'Data' => ['class' => 'msProductData'],
    'Vendor' => ['class' => 'msVendor', 'on' => 'Data.vendor=Vendor.id'],
];

$select = [
    'msProduct' => !empty($includeContent)
        ? $modx->getSelectColumns('msProduct', 'msProduct')
        : $modx->getSelectColumns('msProduct', 'msProduct', '', ['content'], true),
    'Data' => $modx->getSelectColumns('msProductData', 'Data', '', ['id'], true),
    'Vendor' => $modx->getSelectColumns('msVendor', 'Vendor', 'vendor.', ['id'], true),
];

// Include thumbnails
if (!empty($includeThumbs)) {
    $thumbs = array_map('trim', explode(',', $includeThumbs));
    foreach ($thumbs as $thumb) {
        if (empty($thumb)) {
            continue;
        }
        $leftJoin[$thumb] = [
            'class' => 'msProductFile',
            'on' => "`{$thumb}`.product_id = msProduct.id AND `{$thumb}`.`rank` = 0 AND `{$thumb}`.path LIKE '%/{$thumb}/%'",
        ];
        $select[$thumb] = "`{$thumb}`.url as `{$thumb}`";
        $groupby[] = "`{$thumb}`.url";
    }
}

// Include linked products
$innerJoin = [];
if (!empty($link) && !empty($master)) {
    $innerJoin['Link'] = [
        'class' => 'msProductLink',
        'on' => 'msProduct.id = Link.slave AND Link.link = ' . $link,
    ];
    $where['Link.master'] = $master;
} elseif (!empty($link) && !empty($slave)) {
    $innerJoin['Link'] = [
        'class' => 'msProductLink',
        'on' => 'msProduct.id = Link.master AND Link.link = ' . $link,
    ];
    $where['Link.slave'] = $slave;
}

// Add user parameters
foreach (['where', 'leftJoin', 'innerJoin', 'select', 'groupby'] as $v) {
    if (!empty($scriptProperties[$v])) {
        $tmp = $scriptProperties[$v];
        if (!is_array($tmp)) {
            $tmp = json_decode($tmp, true);
        }
        if (is_array($tmp)) {
            $$v = array_merge($$v, $tmp);
        }
    }
    unset($scriptProperties[$v]);
}
$$miniShop2->pdoTools->addTime('Conditions prepared');

// Add filters by options
$joinedOptions = [];
if (!empty($scriptProperties['optionFilters'])) {
    $filters = json_decode($scriptProperties['optionFilters'], true);
    foreach ($filters as $key => $value) {
        $components = explode(':', $key, 2);

        if (count($components) === 2) {
            if (in_array(strtolower($components[0]), ['or', 'and'])) {
                list($operator, $key) = $components;
            }
        }

        $option = preg_replace('#\:.*#', '', $key);
        $key = str_replace($option, $option . '.value', $key);

        if (!in_array($option, $joinedOptions)) {
            $leftJoin[$option] = [
                'class' => 'msProductOption',
                'on' => "`{$option}`.product_id = Data.id AND `{$option}`.key = '{$option}'",
            ];
            $joinedOptions[] = $option;
        }

        $index = isset($operator) && in_array(strtolower($operator), ['or', 'and'], true)
            ? sprintf('%s:%s', strtoupper($operator), $key)
            : $key;
        $where[$index] = $value;
    }
}

// Add sort by options
if (!empty($scriptProperties['sortbyOptions'])) {
    $sorts = array_map('trim', explode(',', $scriptProperties['sortbyOptions']));
    foreach ($sorts as $sort) {
        $sort = explode(':', $sort);
        $option = $sort[0];
        if (preg_match("#\b{$option}\b#", $scriptProperties['sortby'], $matches)) {
            $type = 'string';
            if (isset($sort[1])) {
                $type = $sort[1];
            }
            switch ($type) {
                case 'number':
                case 'decimal':
                    $sortbyOptions = "CAST(`{$option}`.`value` AS DECIMAL(13,3))";
                    break;
                case 'int':
                case 'integer':
                    $sortbyOptions = "CAST(`{$option}`.`value` AS UNSIGNED INTEGER)";
                    break;
                case 'date':
                case 'datetime':
                    $sortbyOptions = "CAST(`{$option}`.`value` AS DATETIME)";
                    break;
                default:
                    $sortbyOptions = "`{$option}`.`value`";
                    break;
            }
            $scriptProperties['sortby'] = preg_replace("#\b{$option}\b#", $sortbyOptions, $scriptProperties['sortby']);
            $groupby[] = "`{$option}`.value";
        }

        if (!in_array($option, $joinedOptions)) {
            $leftJoin[$option] = [
                'class' => 'msProductOption',
                'on' => "`{$option}`.product_id = Data.id AND `{$option}`.key = '{$option}'",
            ];
            $joinedOptions[] = $option;
        }
    }
}

$default = [
    'class' => 'msProduct',
    'where' => $where,
    'leftJoin' => $leftJoin,
    'innerJoin' => $innerJoin,
    'select' => $select,
    'sortby' => 'msProduct.id',
    'sortdir' => 'ASC',
    'groupby' => implode(', ', $groupby),
    'return' => 'data',
    'nestedChunkPrefix' => 'minishop2_',
];
// Merge all properties and run!
$miniShop2->pdoTools->setConfig(array_merge($default, $scriptProperties), false);
$rows = $miniShop2->pdoTools->run();

// Process rows
$output = [];
if (!empty($rows) && is_array($rows)) {
    $c = $modx->newQuery('modPluginEvent', ['event:IN' => ['msOnGetProductPrice', 'msOnGetProductWeight', 'msOnGetProductFields']]);
    $c->innerJoin('modPlugin', 'modPlugin', 'modPlugin.id = modPluginEvent.pluginid');
    $c->where('modPlugin.disabled = 0');

    $modifications = $modx->getOption('ms2_price_snippet', null, false, true) ||
        $modx->getOption('ms2_weight_snippet', null, false, true) || $modx->getCount('modPluginEvent', $c);
    if ($modifications) {
        /** @var msProductData $product */
        $product = $modx->newObject('msProductData');
    }
    $miniShop2->pdoTools->addTime('Checked the active modifiers');

    $opt_time = 0;
    foreach ($rows as $k => $row) {
        if ($modifications) {
            $product->fromArray($row, '', true, true);
            $tmp = $row['price'];
            $row['price'] = $product->getPrice($row);
            $row['weight'] = $product->getWeight($row);
            // A discount here, so we should replace old price
            if ($row['price'] < $tmp) {
                $row['old_price'] = $tmp;
            }
            $row = $product->modifyFields($row);
        }
        $row['price'] = $miniShop2->formatPrice($row['price']);
        $row['old_price'] = $miniShop2->formatPrice($row['old_price']);
        $row['weight'] = $miniShop2->formatWeight($row['weight']);
        $row['idx'] = $miniShop2->pdoTools->idx++;

        $opt_time_start = microtime(true);
        $options = $modx->call('msProductData', 'loadOptions', [$modx, $row['id']]);
        $row = array_merge($row, $options);
        $opt_time += microtime(true) - $opt_time_start;

        $tpl = $miniShop2->pdoTools->defineChunk($row);
        $output[] = $miniShop2->pdoTools->getChunk($tpl, $row);
    }
    $miniShop2->pdoTools->addTime('Time to load products options', $opt_time);
}

$log = '';
if ($modx->user->hasSessionContext('mgr') && !empty($showLog)) {
    $log .= '<pre class="msProductsLog">' . print_r($miniShop2->pdoTools->getTime(), 1) . '</pre>';
}

// Return output
if (is_string($rows)) {
    $modx->setPlaceholder('msProducts.log', $log);
    if (!empty($toPlaceholder)) {
        $modx->setPlaceholder($toPlaceholder, $rows);
    } else {
        return $rows;
    }
} elseif (!empty($toSeparatePlaceholders)) {
    $output['log'] = $log;
    $modx->setPlaceholders($output, $toSeparatePlaceholders);
} else {
    if (empty($outputSeparator)) {
        $outputSeparator = "\n";
    }
    $output['log'] = $log;
    $output = implode($outputSeparator, $output);

    if (!empty($tplWrapper) && (!empty($wrapIfEmpty) || !empty($output))) {
        $output = $miniShop2->pdoTools->getChunk($tplWrapper, [
            'output' => $output,
            'scriptProperties' => $scriptProperties
        ]);
    }

    if (!empty($toPlaceholder)) {
        $modx->setPlaceholder($toPlaceholder, $output);
    } else {
        return $output;
    }
}
