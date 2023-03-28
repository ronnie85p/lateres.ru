<?php

use MODX\Revolution\Processors\Processor;

class wfShopResourceCheck extends Processor 
{
    public $parent;
    public $query;

    public function initialize()
    {
        $this->parent = (int)$this->getProperty('parent');
        $this->query = preg_replace('/\s{2,}/', ' ', $this->getProperty('query'));
        return true;
    }

    public function process()
    {
        // return $this->test(); 
        $where = [
            'parent:=' => $this->parent,
            'pagetitle:=' => trim($this->query)
        ];

        $count = $this->modx->getCount('modResource', $where);
        if ($count > 0) {
            return $this->failure('Такой ресурс уже существует.');
        }

        return $this->success();
    }

    public function test($vendorList)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
        ]);
    }
}

return 'wfShopResourceCheck';