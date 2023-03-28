<?php


namespace App\Processors\Product;
use \MODX\Revolution\Processors\Model\GetProcessor; 

class Get extends GetProcessor
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $this->setDefaultProperties([
            'published' => 1,
            'deleted' => 0,
        ]);

        $properties = $this->getProperties();
        $properties[$this->primaryKeyField] = [
            'id' => $properties['id'],
            'published' => $properties['published'],
            'deleted' => $properties['deleted'],
            'template' => $this->modx->getOption('app.fabricator_template'),
        ];

        $this->setProperties($properties);

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
