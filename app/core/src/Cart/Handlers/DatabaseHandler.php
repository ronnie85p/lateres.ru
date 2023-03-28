<?php

namespace App\Cart\Handlers;
require_once __DIR__ . '/AbstractHandler.php';

use MODX\Revolution\modX;

class DatabaseHandler extends AbstractHandler 
{
    public $classKey = \App\Model\Cart\Item::class;

    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, array_merge(
            [],
            $config
        ));
    }

    /**
     * @param string $id
     * @param array $options
     * @return modResource
     */
    public function get(string $key, array $options = [])
    {
        return array_shift($this->getList(['id' => $key], $options));
    }

    /**
     * @param array $where
     * @param array $options
     * @return array <object|array>
     */
    public function getList(array $where = [], array $options = [])
    {
        $limit = $this->getOption($options, 'limit', 20); 
        $offset = $this->getOption($options, 'offset', 0); 
        $sortby = $this->getOption($options, 'sortby', 'createdon'); 
        $sortdir = $this->getOption($options, 'sortdir', 'ASC'); 

        $q = $this->modx->newQuery($this->classKey);
        $q->select($this->modx->getSelectColumns($this->classKey));
        $q->where(array_merge($where, [
            'user_id' => $this->modx->user->id,
        ]));

        $q->limit($limit, $offset);
        $q->sortby($sortby, $sortdir);

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        return $results;
    }

    /**
     * @param string $productId
     * @return boolean
     */
    public function isExists(string $productId)
    {
        $key = $this->generateHashKey($productId);

        return !empty($this->modx->getObject($this->classKey, $key));
    }

    public function setChecked(string $key, $checked)
    {
        $object = $this->modx->getObject($this->classKey, $key);
        if (empty($object)) {
            return false;
        }

        $object->set('checked', $checked);

        return $object->save();
    }

    public function create(\modResource $product, int $count)
    {
        $this->prepareCreateFields($product, $count);

        $this->key = $this->generateHashKey($product->id);
        $this->fields['id'] = $this->key;

        $object = $this->modx->newObject($this->classKey, $this->fields);
        return $object->save();
    }

    public function update(string $key, int $count)
    {
        $object = $this->modx->getObject($this->classKey, $key);
        if (empty($object)) {
            return $key;
        }

        $this->prepareUpdateFields($count);
        $object->fromArray($this->fields);

        return $object->save();
    }

    /**
     * @param string $id
     * @return boolean
     */
    public function remove(string $key)
    {
        $object = $this->modx->getObject($this->classKey, $key);
        if ($object) {
            return $object->remove();
        }

        return true;
    }

    /**
     * @return boolean
     */
    public function clear()
    {
        $objects = $this->modx->getCollection($this->classKey, 
            ['user_id' => $this->modx->user->id]);
        foreach ($objects as $object) {
            $object->remove();
        }

        return true;
    }
}