<?php

namespace WF\Shop\Cart\Handlers;

require_once __DIR__ . '/CartHandler.php';

use WF\Shop\Cart\Handlers\CartHandler;
use MODX\Revolution\modX;

class CartDBHandler extends CartHandler
{
    /** @var $object CartItem */
    public $object;

    public $classKey = 'WF\\Shop\\Model\\CartItem';

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function getObject($id)
    {   
        if (!$this->object) {
            $this->object = $this->modx->getObject($this->classKey, [
                'id' => $id, 
                'user_id' => $this->modx->user->id
            ]);
        }

        return $this->object;
    }

    public function get($id = null, array $options = [])
    {
        $this->prepareOptions($options);

        $where = array_merge($options['where'], 
            [ 'user_id' => $this->modx->user->id ]);

        if ($id) {
            $where['id'] = $id;
        }

        $q = $this->modx->newQuery($this->classKey);
        $q->select($this->modx->getSelectColumns($this->classKey));
        $q->where($where);

        if (!empty($options['limit'])) {
            $q->limit($options['limit']);
        }

        if (!empty($options['sortby'])) {
            $q->sortby($options['sortby'], $options['sortdir']);
        }

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $id 
                ? $q->stmt->fetch(\PDO::FETCH_ASSOC) 
                : $q->stmt->fetchAll(\PDO::FETCH_ASSOC)
            ;
        }

        return $results;
    }

    public function add(string $id, int $count = 1, array $data = [])
    {
        $this->object = $this->modx->newObject($this->classKey);
        $this->object->fromArray(array_merge($data, [
            'id' => $id,
            'count' => $count,
            'user_id' => $this->modx->user->id,
            'createdon' => time()
        ]));

        return $this->object->save();
    }

    public function change(string $id, int $count = 1, array $data = [])
    {
        if (!$this->getObject($id)) {
            return false;
        }

        $this->object->fromArray(array_merge($data, [
            'count' => $count,
            'updatedon' => time()
        ]));

        return $this->object->save();
    }

    public function remove(string $id)
    {
        if (!$this->getObject($id)) {
            return false;
        }

        return $this->object->remove();
    }

    public function clear()
    {
        $rows = $this->get();
        foreach ($rows as $row) {
            $object = $this->modx->newObject($this->classKey, $row);
            if (!$object->remove()) {
                $this->addFieldError($object->id, 'Was not removed.');
            }
        }

        return !$this->hasErrors();
    }
}