<?php

use MODX\Revolution\Processors\Processor;

class mShopProductCheckExists extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        if ($this->isExists()) {
            return $this->failure('Такой товар уже существует.');
        }

        return $this->test();
    }

    public function isExists() 
    {
        $q = $this->modx->newQuery('msProduct');
        $q->where([
            'parent' => (int) $this->getProperty('parent'),
            'pagetitle' => trim($this->getProperty('query'))
        ]);

        return $this->modx->getCount('msProduct', $q) > 0;
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }
}

return 'mShopProductCheckExists';