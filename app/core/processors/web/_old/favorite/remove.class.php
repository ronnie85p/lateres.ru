<?php

namespace WF\Shop\Processors\Favorite;

class RemoveProcessor extends \MODX\Revolution\Processors\Model\RemoveProcessor
{
    public $classKey = 'WF\\Shop\\Model\\Favorite';

    public function initialize()
    {
        if ($this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('access_denied');
        }

        $criteria = [
            'user_id' => $this->modx->user->id,
            'product_id' => $this->getProperty('product_id')
        ];

        $this->object = $this->modx->getObject($this->classKey, $criteria);
        if (empty($this->object)) {
            return $this->modx->lexicon($this->modx->lexicon('wf_shop.favorite_not_exists'));
        }

        return true;
    }
}

return 'WF\\Shop\\Processors\\Favorite\\RemoveProcessor';