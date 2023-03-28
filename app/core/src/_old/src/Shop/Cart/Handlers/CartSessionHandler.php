<?php

namespace WF\Shop\Cart\Handlers;

require_once __DIR__ . '/CartHandler.php';

use MODX\Revolution\modX;
use WF\Shop\Cart\Handlers\CartHandler;

class CartSessionHandler extends CartHandler
{
    public $data;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        if (!isset($_SESSION['wf_shop'])) {
            $_SESSION['wf_shop'] = [];
        }

        $this->data = &$_SESSION['wf_shop']['cart'] ?? [];

        if (empty($this->data)) {
          $this->data = [];
        }
    }

    public function get($id = null, array $options = [])
    {
        if ($id) {
            return $this->data[$id];
        }

        $this->prepareOptions($options);

        $where = $options['where'];
        $sortby = $options['sortby'];
        $sortdir = $options['sortdir'];
 
        $data = array_values($this->data);

        if (!empty($where)) {
            $data = array_filter($data, function ($item) use ($where) {
                foreach ($where as $k => $v) {
                    if (strcmp($item[$k], $v) != 0) {
                        return false;
                    }
                }

                return true;
            });
        }
        
        if (!empty($sortby)) {

            usort($data, function ($a, $b) use ($sortby, $sortdir) {

                if (isset($a[$sortby])) {

                    $a = $a[$sortby];
                    $b = $b[$sortby];

                    if ($a == $b) {
                        return 0;
                    }

                    switch ($sortdir) {
                        case 'asc':
                            return ($a < $b) ? -1 : 1;
                        case 'desc':
                            return ($a > $b) ? -1 : 1;
                    }

                }

            });

        }
      
        if ($options['limit'] > 0) {
            $data = array_slice($data, $options['offset'], $options['limit']);
        }

        return $data;
    }
    
    public function add(string $id, int $count = 1, array $data)
    {
        $this->data[$id] = array_merge($data, [
            'id' => $id,
            'count' => $count,
            'createdon' => time()
        ]);

        return true;
    }

    public function change(string $id, int $count = 1, array $data)
    {
        $_data = $this->data[$id] ?? [];
        if (empty($_data)) {
            return false;
        }

        $this->data[$id] = array_merge($_data, $data, [
            'count' => $count,
            'updatedon' => time()
        ]);

        return true;
    }

    public function remove(string $id)
    {
        unset($this->data[$id]);

        return true;
    }
    
    public function clear()
    {
        $this->data = [];

        return true;
    }

}