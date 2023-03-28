<?php
namespace App\Processors\Mgr\Fabricator;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $classKey = \modResource::class;
    public $beforeSaveEvent = 'onAppTrademarkBeforeSave';
    public $afterSaveEvent = 'onAppTrademarkAfterSave';

    public $app;

    public function initialize() 
    {
        return parent::initialize();
    }
}

return Update::class;