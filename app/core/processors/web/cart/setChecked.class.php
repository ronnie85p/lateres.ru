<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class setChecked extends BaseProcessor
{
    public $keys = [];
    public $checked;

    public function initialize() 
    {
        $this->checked = $this->getProperty('checked');
        $this->keys = $this->getProperty('keys', []);
        if (empty($this->keys)) {
            return false;
        }

        return parent::initialize();
    }

    public function process()
    {
        $this->checkedKeys = [];
        foreach ($this->keys as $key) {
            $result = $this->handler->setChecked($key, $this->checked);
            if ($result !== false) {
                $this->checkedKeys[] = $key;
            }
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.cart_item_updated'), [
            'keys' => $this->checkedKeys,
            'checked' => $this->checked,
        ]);
    }
}

return SetChecked::class;

