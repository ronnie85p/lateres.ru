<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class Remove extends BaseProcessor
{
    public $keys = [];
    public $removedKeys = [];

    public function initialize() 
    {
        $this->keys = $this->getProperty('keys', []);

        return parent::initialize();
    }

    public function process()
    {
        $this->removedKeys = [];
        foreach ($this->keys as $key) {
            $result = $this->handler->remove($key);
            if ($result === false) {
                $this->addFieldError($key, $this->modx->lexicon('app.cart_remove_err', ['key' => $key]));
                continue;
            }

            $this->removedKeys[] = $key;
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        $count = count($this->removedKeys);
        if ($count > 0) {
            $lexiconKey = $count > 1 ? 'app.cart_items_removed' : 'app.cart_item_removed';
        } else {
            $lexiconKey = 'app.cart_items_removed_err';
        }

        return $this->success($this->modx->lexicon($lexiconKey), 
            ['keys' => $this->removedKeys]);
    }
}

return Remove::class;

