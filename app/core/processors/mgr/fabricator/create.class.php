<?php
namespace App\Processors\Mgr\Fabricator;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = \modResource::class;
    public $beforeSaveEvent = 'onAppFabricatorBeforeSave';
    public $afterSaveEvent = 'onAppFabricatorAfterSave';

    public $app;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function beforeSet()
    {
        return parent::beforeSet(); // -> return !$this->hasErrors();
    }
}

return Create::class;