<?php

namespace WF\Shop\Processors\Favorite;

class AddProcessor extends \MODX\Revolution\Processors\Model\CreateProcessor
{
    public $classKey = 'WF\\Shop\\Model\\Favorite';

    public function initialize()
    {
        if ($this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('access_denied');
        }

        if (!$this->getProperty('product_id')) {
            return $this->modx->lexicon('wf_shop.undef');
        }

        $criteria = [
            'user_id' => $this->modx->user->id,
            'product_id' => $this->getProperty('product_id')
        ];

        if ($this->doesAlreadyExist($criteria)) {
            return $this->modx->lexicon('wf_shop.favorite_already_exists');
        }

        return parent::initialize();
    }

    public function beforeSet()
    {
        $properties = $this->getProperties();

        $properties['user_id'] = $this->modx->user->id;
        $properties['timestamp'] = time();

        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Processors\\Favorite\\AddProcessor';