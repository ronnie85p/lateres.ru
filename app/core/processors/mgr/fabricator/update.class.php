<?php
namespace App\Processors\Mgr\Fabricator;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $classKey = \modResource::class;
    public $beforeSaveEvent = 'onAppCategoryBeforeSave';
    public $afterSaveEvent = 'onAppCategoryAfterSave';

    public $app;

    public function initialize() 
    {
        return parent::initialize();
    }
}

return Update::class;