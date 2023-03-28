<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class SetCheckedAll extends BaseProcessor
{
    public function process()
    {
        $items = $this->handler->getList();
        foreach ($items as $item) {
            $result = $this->handler->setChecked(
                $item['id'], 
                $this->getProperty('checked')
            );
        }
        
        if ($result === false) {
            return $this->failure($this->modx->lexicon('app.cart_update_err'));
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.cart_item_updated'));
    }
}

return SetCheckedAll::class;

