<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class setRank extends BaseProcessor
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

        $this->setDefaultProperties([
            'rank' => 0,
        ]);

        return parent::initialize();
    }

    public function process()
    {
        $this->object->set('rank', $this->getProperty('rank'));

        if (!$this->saveObject()) {
            return $this->failure($this->modx->lexicon('app.unknow_err', ['code' => 1]));
        }

        return $this->cleanup();
    }

    public function saveObject()
    {   
        return $this->object->save();
    }

    public function cleanup()
    {
        return $this->success();
    }
}

return setRank::class;