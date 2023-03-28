<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class Add extends BaseProcessor
{
    public $product;
    public $count;

    public function initialize() 
    {
        $this->product = $this->getProduct($this->getProperty('product_id'));
        if (empty($this->product)) {
            return $this->modx->lexicon('app.product_not_found', ['id' => $this->getProperty('product_id')]);
        }

        $this->count = abs($this->getProperty('count', 1));
        if (empty($this->count)) {
            return $this->modx->lexicon('app.cart_count_is_empty');
        }

        return parent::initialize();
    }

    public function process()
    {
        if (!$this->handler->isExists($this->product->id)) {
            $result = $this->handler->create($this->product, $this->count);
            if ($result === false) {
                return $this->failure('app.cart_product_not_added');
            }
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.cart_product_added'), [
            'id' => $this->handler->key
        ]);
    }
}

return Add::class;

