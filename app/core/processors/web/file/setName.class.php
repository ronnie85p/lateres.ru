<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class setName extends BaseProcessor
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
            'validation' => [
                'name' => 'required'
            ]
        ]);

        return parent::initialize();
    }

    public function process()
    {
        if (!$this->validate()) {
            return $this->failure();
        }

        $this->prepare();
        $this->object->set('name', $this->getProperty('name'));

        if (!$this->saveObject()) {
            return $this->failure($this->modx->lexicon('app.unknow_err', ['code' => 1]));
        }

        return $this->cleanup();
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $properties['name'] = trim($properties['name']);

        $this->setProperties($properties);
    }

    public function validate()
    {
        $validator = $this->app->getValidator();
        $validator->validate($this->getProperties(), $this->getProperty('validation'));

        return !$this->hasErrors();
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

return setName::class;