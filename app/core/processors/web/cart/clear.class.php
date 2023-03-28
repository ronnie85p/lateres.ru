<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class Clear extends BaseProcessor
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process()
    {
        $result = $this->handler->clear();
        if ($result === false) {
            return $this->failure('err');
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.cart_item_cleared'));
    }
}

return Clear::class;

