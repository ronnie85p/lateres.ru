<?php

namespace App\Processors\Web\Payment;

use MODX\Revolution\Processors\Model\GetProcessor as _GetProcessor;

class GetProcessor extends _GetProcessor
{
    public $classKey = \msPayment::class;

    public function initialize() 
    {
        $criteria = [
            'active' => 1,
            $this->primaryKeyField => $this->getProperty($this->primaryKeyField, false)
        ];

        if (!$this->modx->getCount($this->classKey, $criteria)) {
            return $this->modx->lexicon('app.payment_not_found');
        }

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:payment', 'app'];
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return GetProcessor::class;
