<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class Get extends BaseProcessor
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process()
    {
        $data = $this->handler->get($this->getProperty('key'));

        return $this->cleanup($data);
    }

    public function cleanup($data)
    {
        $this->prepareItem($data);
        return $this->success('', $data);
    }
}

return Get::class;

