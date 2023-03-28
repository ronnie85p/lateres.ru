<?php

namespace App\Processors\Profile\Contacts;
use MODX\Revolution\Processors\Processor;

class GetProcessor extends Processor
{
    public $object = [];

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        return true;
    }

    public function process()
    {
        $this->getPhones();
        $this->getEmail();
        $this->getMessengers();

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function getPhones()
    {
        $phones = $this->fetchRows(\App\Model\Profile\Phone::class);
        $this->object['phones'] = $phones;
    }

    public function getMessengers()
    {
        $messengers = $this->fetchRows(\App\Model\Profile\Messengers::class);
        $this->object['messengers'] = $messengers;
    }

    public function getEmail()
    {
        $this->object['email'] = $this->modx->user->Profile->get('email');
    }

    public function fetchRows(string $classKey)
    {
        $q = $this->modx->newQuery($classKey);
        $q->select($this->modx->getSelectColumns($classKey));
        $q->where(['user_id' => $this->user['id']]);

        $rows = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $rows = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        return $rows;
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return GetProcessor::class;
