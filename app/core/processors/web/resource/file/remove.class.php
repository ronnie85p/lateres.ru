<?php

use MODX\Revolution\Processors\Processor;

class flsFilesFilesRemove extends Processor 
{
    public $ids;
    public $container;

    public $pdoClass;

    public function initialize()
    {
        $this->ids = (array) array_map('trim', explode(',', $this->getProperty('ids', '')));
        $this->container = (string) $this->getProperty('container');

        $this->pdoClass = 'wfFiles\\flsFile';

        return true;
    }

    public function process()
    {
        // return $this->test();
        $objects = $this->modx->getCollection($this->pdoClass, [
            'path' => $this->container,
            'file:IN' => $this->ids
        ]);

        if (empty($objects)) {
            return $this->failure('No files for removed', [
                'path' => $this->container,
                'file:IN' => $this->ids
            ]);
        }

        foreach ($objects as $object) {
            if (!$object->remove()) {
                $this->modx->error->addField('', '');
            }
        }

        // return $this->test($objects);
        if ($this->modx->error->hasError()) {
            return $this->failure('Ошибка при удалении файлов.');
        }
    
        $total = $this->modx->getCount($this->pdoClass, [
            'path' => $this->container,
        ]);

        // return $this->test();
        return $this->success('Файлы успешно удалены.', [
            'total' => $total
        ]);
    }

    public function test(/** many args */)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'properties' => $this->getProperties(),
            'container' => $this->container,
            'ids' => $this->ids,
            'args' => func_get_args()
        ]);
    }
}

return 'flsFilesFilesRemove';