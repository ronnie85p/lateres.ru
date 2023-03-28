<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class Update extends BaseProcessor
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process()
    {
        $result = $this->handler->update(
            $this->getProperty('key'), 
            $this->getProperty('count')
        );
        
        if ($result === false) {
            return $this->failure($this->modx->lexicon('app.cart_update_err'));
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        $item = $this->app->runProcessor('web/cart/get', $this->getProperties())->getObject();
        return $this->success($this->modx->lexicon('app.cart_item_updated'), $item);
    }
}

return Update::class;

