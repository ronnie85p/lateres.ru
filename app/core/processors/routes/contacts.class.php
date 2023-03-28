<?php

namespace App\Processors\Routes;
use MODX\Revolution\Processors\Processor;

class Contacts extends Processor
{
    public $app;
    public $parent;
    public $menu = [];

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        $this->parent = $this->getMenuParent();
        if (!empty($this->parent)) {
            $this->menu = $this->getMenuItems();
        }

        return $this->cleanup();
    }

    public function getMenuParent()
    {
        $object = $this->modx->getObject(\modResource::class, [ 
            'id' => $this->modx->getOption('app.contacts_parent', null, 10),
            'published' => 1,
            'deleted' => 0,
        ]);
        
        return $object;
    }

    public function getMenuItems()
    {
        $q = $this->modx->newQuery(\modResource::class);
        $q->select($this->modx->getSelectColumns(\modResource::class));
        $q->where([
            'parent' => $this->parent->get('id'),
            'published' => 1,
            'deleted' => 0,
        ]);
        
        $q->sortby('menuindex', 'ASC');

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        return $results;
    }

    public function cleanup()
    {
        $parent = $this->parent ? $this->parent->toArray() : null;
        return [
            'success' => true,
            'parent' => $parent,
            'menu' => $this->menu,
        ];
    }
}

return Contacts::class;

