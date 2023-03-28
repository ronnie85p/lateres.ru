<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class Remove extends BaseProcessor
{
    public $classKey = \App\Model\Resource\File::class;

    public function initialize() 
    {
        $this->object = $this->modx->getObject($this->classKey, [
            'file' => $this->getProperty('file'),
            'createdby' => $this->modx->user->get('id'),
        ]);
        if (empty($this->object)) {
            return $this->modx->lexicon('app.file_not_found');
        }

        $this->setProperties([
            'fully' => $this->getProperty('fully', 1),
            'source' => $this->object->get('source_id'),
            'file' => $this->object->get('file'),
        ]);

        $this->loadFileHandler();

        return parent::initialize();
    }

    public function process()
    {
        if ($this->removeObject() === false) {
            return $this->failure($this->modx->lexicon('app.file_not_removed'));
        }

        if (!empty($this->getProperty('fully'))) {
            $this->removeFile();
        }

        return $this->cleanup();
    }

    public function removeFile()
    {
        return $this->fileHandler->remove($this->getProperty('file'));
    }

    public function removeObject()
    {
        if (empty($this->getProperty('fully'))) {
            $this->object->set('deleted', 1);
            return $this->object->save();
        }
        
        return $this->object->remove();
    }

    public function cleanup()
    {
        $array = $this->fileHandler->prepareArray($this->object);
        return $this->success('', $array);
    }
}

return Remove::class;