<?php
namespace App\Processors\Mgr\Fabricator;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = \modResource::class;
    public $beforeSaveEvent = 'onAppTrademarkBeforeSave';
    public $afterSaveEvent = 'onAppTrademarkAfterSave';

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