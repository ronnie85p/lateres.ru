<?php


namespace App\Processors\Web\Favorite;
use \MODX\Revolution\Processors\Model\GetProcessor; 

class Get extends GetProcessor
{
    public $classKey = \App\Model\Resource\Favorite::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    { 
        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
                'resource_id' => (int)$this->getProperty('product_id'),
            ],
        ]);

        return parent::initialize();
    }

    public function beforeOutput()
    {

    }

    public function cleanup(array $data = [])
    {
        return $this->success('', $this->object);
    }
}

return Get::class;
