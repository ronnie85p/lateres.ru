<?php

use MODX\Revolution\Processors\Model\RemoveProcessor;

class msDeliveryRemoveProcessor extends RemoveProcessor
{
    public $classKey = 'msDelivery';
    public $languageTopics = ['minishop2'];
    public $permission = 'mssetting_save';


    /**
    * @return bool|null|string
    */
    public function initialize()
    {
        if (!$this->modx->hasPermission($this->permission)) {
            return $this->modx->lexicon('access_denied');
        }

        return parent::initialize();
    }
}

return 'msDeliveryRemoveProcessor';
