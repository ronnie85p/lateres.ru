<?php
namespace App\Processors\Mgr\Category;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = \modResource::class;
    public $beforeSaveEvent = 'onAppCategoryBeforeSave';
    public $afterSaveEvent = 'onAppCategoryAfterSave';

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