<?php

use MODX\Revolution\Processors\Processor;

class mShopProductFormGet extends Processor 
{
    public function initialize()
    {
        $this->mShop = $this->modx->services->get('mshop');

        $this->resource = $this->modx->getObject('modResource', [
            'alias' => $this->getProperty('type'),
            'parent' => 224
        ]);

        if (!$this->resource) {
            return 'Ошибка. Неверный запрос.';
        }

        return true;
    }

    public function process()
    {
        // return $this->test();

        $content = $this->resource->parseContent();

        return $this->success('', [
            'html' => $content
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }
}

return 'mShopProductFormGet';