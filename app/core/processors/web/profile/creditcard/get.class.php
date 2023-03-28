<?php

namespace App\Processors\Profile\CreditCard;

use MODX\Revolution\Processors\Model\GetProcessor as _GetProcessor;

class GetProcessor extends _GetProcessor
{
    public $classKey = \App\Model\Profile\CreditCard::class;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            // return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }
        
        $primaryKey = $this->getProperty($this->primaryKeyField, false);
        $criteria = [
            'user_id' => $this->modx->user->id,
        ];

        if (empty($primaryKey)) {
            $criteria['rank'] = 0;
        } else {
            $criteria[$this->primaryKeyField] = $primaryKey;           
        }

        $this->object = $this->modx->getObject($this->classKey, $criteria);
        if (empty($this->object)) {
            return $this->modx->lexicon('app.profile_creditcard_not_found');
        }

        if ($this->checkViewPermission && $this->object instanceof modAccessibleObject && !$this->object->checkPolicy('view')) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return GetProcessor::class;
