<?php

namespace App\Processors\Web\Resource;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize()
    {
        $uri = trim($this->getProperty('uri'), '/');

        $this->setProperties([
            'where' => [
                'uri:=' => $uri,
                'OR:uri:=' => $uri . '/',
                'published' => 1,
                'deleted' => 0,
            ],
        ]);
        
        return parent::initialize();
    }
}

return Get::class;