<?php

namespace App\Cart\Handlers;
require_once __DIR__ . '/AbstractHandler.php';

use MODX\Revolution\modX;

class SessionHandler extends AbstractHandler 
{
    /**@var array $data */
    private $data;

    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, array_merge(
            [],
            $config
        ));

        $this->data = &$_SESSION['app.shop_cart'];

        if (empty($this->data) || !is_array($this->data)) {
            $this->data = [];
        }
    }

    /**
     * @param array $array
     * @param array $criteria
     * @return array
     */
    public function filterBy(array $array, $criteria)
    {
        $array = array_filter($array, function ($item) use ($criteria) {
            foreach ($criteria as $k => $v) {
                if (strcmp($item[$k], $v) != 0) {
                    return false;
                }
            }

            return true;
        });

        return $array;
    }

    /**
     * @param array &$array
     * @param string $field
     * @param string $dir
     */
    public function sortBy(array &$array, $field, $dir)
    {
        $dir = strtolower($dir);

        usort($array, function ($a, $b) use ($field, $dir) {
            if (isset($a[$field])) {

                $a = $a[$field];
                $b = $b[$field];

                if ($a == $b) {
                    return 0;
                }

                switch ($dir) {
                    case 'asc':
                        return ($a < $b) ? -1 : 1;
                    case 'desc':
                        return ($a > $b) ? -1 : 1;
                }

            }
        });
    }

    /**
     * @param string $key
     * @return array|null
     */
    public function get(string $key)
    {
        return $this->data[$key];
    }

    /**
     * @param array $where
     * @param array $options
     * @return array
     */
    public function getList(array $where = [], array $options = [])
    {
        $limit = $this->getOption($options, 'limit', 20); 
        $offset = $this->getOption($options, 'offset', 0); 
        $sortby = $this->getOption($options, 'sortby', 'createdon'); 
        $sortdir = $this->getOption($options, 'sortdir', 'ASC'); 
 
        $data = $this->filterBy(
            array_values($this->data), 
            $where
        );

        $this->sortBy($data, $sortby, $sortdir);
        return array_slice($data, $offset, $limit);
    }

    /**
     * @param int $productId
     * @return boolean
     */
    public function isExists(int $productId)
    {
        $key = $this->generateHashKey($productId);

        return !empty($this->data[$key]);
    }
    
    public function setChecked(string $key, $checked)
    {
        $data = $this->get($key);
        if (empty($data)) {
            return false;
        }

        $this->data[$key] = array_merge($data, ['checked' => $checked]);

        return true;
    }

    public function create(\modResource $product, int $count)
    {
        $this->prepareCreateFields($product, $count);

        $this->key = $this->generateHashKey($product->id);
        $this->fields['id'] = $this->key;
        $this->data[$this->key] = $this->fields;

        return true;
    }

    /**
     * @param string $key
     * @param int $count
     */
    public function update(string $key, int $count)
    {
        $data = $this->get($key);
        if (empty($data)) {
            return false;
        }

        $this->prepareUpdateFields($count);
        $this->data[$key] = array_merge($data, $this->fields);

        return true;
    }

    /**
     * @param string $key
     * @return boolean
     */
    public function remove(string $key)
    {
        unset($this->data[$key]);

        return true;
    }

    /**
     * @return boolean
     */
    public function clear()
    {
        $this->data = [];

        return true;
    }
}