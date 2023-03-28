<?php

namespace App\Processors\Category\Products;

class GetListProcessor extends \MODX\Revolution\Processors\Processor 
{
    public function initialize() 
    {
        if (!empty($_REQUEST['page']) && $_REQUEST['page'] == 1) {
            unset($_REQUEST['page']);
        }

        if (!empty($this->getProperty('id'))) {
            $this->setProperty('parents', [$this->getProperty('id')]);
        }

        return parent::initialize();
    }

    public function process() 
    {   
        $this->prepareProperties(); 

        $results = $this->getResults();
        $pagination = $this->getPagination();

        return $this->cleanup($results, $pagination);
    }

    public function cleanup(array $results, array $pagination)
    {
        return [
            'results' => $results,
            'pagination' => $pagination,
            'total' => count($results),
            'success' => true
        ];
    }

    public function prepareProperties()
    {
        $properties = $this->getProperties();

        $classKey = 'modResource';
        $template = $this->getProperty('template', 
            $this->modx->getOption('app.product.template_default', null, 10));

        $parent = $this->getProperty('parent', 
            $this->modx->getOption('app.product.category_parent', null, 0));

        $properties['return'] = 'data';
        $properties['class'] = $classKey;
        $properties['templates'] = implode(',', array_merge($properties['templates'] ?? [], [$template]));
        $properties['parents'] = implode(',', array_merge($properties['parents'] ?? [], [$parent]));

        $properties['includeTVs'] = 'price, old_cost, discount, img';
        $properties['tvPrefix'] = '';

        $properties['select'] = $this->getProperty('sortdir', 
            $this->modx->getOption('app.product.list_select', null, 'id, pagetitle, description'));

        $properties['limit'] = $this->getProperty('limit', 
            $this->modx->getOption('app.product.list_limit', null, 15));

        $properties['offset'] = $this->getProperty('offset', 
            $this->modx->getOption('app.product.list_offset', null, 0));

        $properties['sortby'] = $this->getProperty('sortby', 
            $this->modx->getOption('app.product.list_sortby', null, 'parent'));

        $properties['sortdir'] = $this->getProperty('sortdir', 
            $this->modx->getOption('app.product.list_sortdir', null, 'ASC'));

        $properties['level'] = $this->getProperty('level', 
            $this->modx->getOption('app.product.list_level', null, 10));

        $this->setProperties($properties);
    }

    public function getResults()
    {
        $cart = null;
        if ($this->modx->services->has('app.cart')) {
            $cart = $this->modx->services->get('app.cart');
        }

        $pdoTools = $this->modx->services->get('pdofetch');
        $pdoTools->setConfig($this->getProperties());

        // $rows = $pdoTools->run();
        $rows = $this->modx->runSnippet('pdoPage', $this->getProperties());
        foreach ($rows as &$row) {
            $row['url'] = $this->modx->makeUrl($row['id'], '', '', 'full');

            if (!empty($row['img'])) {
                $url = strpos($row['img'], "assets") === false ? 
                    "https://309921.selcdn.ru/l-s-ru/" : 
                    "https://www.lateres.ru/";

                $row['image'] = $url . $row['img'];
            } else {
                $row['image'] = $this->modx->getOption('app.product.default_img', null, 'assets/imgs/lateres_no.jpg');
            }

            if ($cart) {
                $row['cart'] = $cart->getItem($cart->generateKey($row['id']));
            }
        }

        return $rows;
    }

    public function getPagination()
    {
        return [
            'current' => (int)$this->modx->placeholders['page'],
            'total' => (int)$this->modx->placeholders['page.total'],
            'count' => (int)$this->modx->placeholders['pageCount']
        ];
    }
}

return 'App\\Processors\\Category\\Products\\GetListProcessor';

