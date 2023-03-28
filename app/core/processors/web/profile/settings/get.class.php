<?php

namespace App\Processors\Web\Profile\Settings;
use MODX\Revolution\Processors\Processor;

class Get extends Processor
{
    public $app;
    public $user;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        $this->getUser();
        $this->getPhones();
        $this->getCompany();
        $this->getMenu();
        $this->getLoginMethods();
        $this->getLoginQuestions();

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function getUser()
    {
        $profile = $this->modx->user->getOne('Profile');
        $extended = $profile->get('extended') ?: [];
        
        $this->object = array_merge(
            $this->modx->user->toArray(), 
            $profile->toArray(),
            $extended,
        );
    }

    public function getPhones()
    {
        $q = $this->modx->newQuery(\App\Model\Profile\Phone::class);
        $q->select($this->modx->getSelectColumns(\App\Model\Profile\Phone::class));
        $q->where([
            'user_id' => $this->modx->user->get('id')
        ]);
        $q->sortby('createdon', 'ASC');

        $phones = [];
        $objects = $this->modx->getCollection(\App\Model\Profile\Phone::class, $q);
        foreach ($objects as $object) {
            $phones[] = array_merge($object->toArray(), [
                'is_default' => $this->object['mobilephone'] === $object->get('id')
            ]);
        }

        $this->object['phones'] = $phones;
    }

    public function getCompany()
    {
        $object = $this->modx->getObject(\App\Model\Profile\Company::class, [
            'user_id' => $this->modx->user->get('id')
        ]);

        $this->object['company'] = $object ? $object->toArray() : [];
    }

    public function getMenu()
    {
        $menu = $this->modx->runSnippet('pdoMenu', [
            'parents' => '61',
            'return' => 'data'
        ]);

        $this->object['menu'] = $menu;
    }

    public function getLoginMethods() 
    {
        $classKey = \App\Model\Auth\Login\Method::class;
        $q = $this->modx->newQuery($classKey);
        $q->select($this->modx->getSelectColumns($classKey));
        $q->where(['active' => 1]);
        $q->sortby('rank', 'ASC');

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        if (empty($this->object['login_settings'])) {
            $this->object['login_settings']['methods'] = [];
        }

        $this->object['login_settings']['methods'] = $results;
    }

    public function getLoginQuestions()
    {
        $classKey = \App\Model\Auth\Login\Question::class;
        $q = $this->modx->newQuery($classKey);
        $q->select($this->modx->getSelectColumns($classKey));
        $q->where(['active' => 1]);
        $q->sortby('rank', 'ASC');

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        $this->object['login_settings']['questions'] = $results;
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return Get::class;
