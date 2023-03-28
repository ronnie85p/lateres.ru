<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class GetList extends BaseProcessor
{
    public function initialize() 
    {
        $this->setDefaultProperties([
            'offset' => 0,
            'limit' => 20,
            'all' => false,
        ]);

        return parent::initialize();
    }

    public function process()
    {
        $where = [];
        if (empty($this->getProperty('all'))) {
            $where['checked'] = true;
        }

        $list = $this->handler->getList($where, 
            $this->getProperties());
        $results = [];
        foreach ($list as &$item) {
            $this->prepareItem($item);

            if (empty($where['checked']) || $item['published']) {
                $results[] = $item;
            }

            // if ($where['checked'] && !$item['published']) {
            //     unset($item);
            // } 
        }

        return $this->cleanup($results);
    }

    public function cleanup(array $array)
    {
        return [
            'success' => true,
            'message' => '',
            'results' => $array,
            'total' => count($array)
        ];
    }
}

return GetList::class;

