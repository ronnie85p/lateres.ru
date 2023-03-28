<?php

namespace App\Processors\File;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \App\Model\Resource\File::class;

    public function initialize() 
    {
        $this->setDefaultProperties([
            'sort' => 'rank',
            'dir' => 'ASC',
            'start' => 0,
            'limit' => 20,
        ]);

        return parent::initialize();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $path = trim($this->getProperty('path'), '/') . '/';
        $c->where([
            'path' => $path,
        ]);

        return $c;
    }

    public function afterIteration(array $list)
    {
        $fileHandler = $this->modx->getService('file', \App\Files\File::class);

        foreach ($list as &$item) {
            $object = $this->modx->newObject($this->classKey, $item);
            $item = $fileHandler->prepareArray($object);
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return [
            'results' => $array,
            'total' => count($array),
            'success' => true,
        ];
    }
}

return GetList::class;