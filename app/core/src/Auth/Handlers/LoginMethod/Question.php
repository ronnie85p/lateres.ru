<?php

namespace App\Auth\Handlers\LoginMethod;
use MODX\Revolution\modX;

class Question 
{
    public $classKey = \App\Model\Auth\Login\Question::class;
    public $modx = null;
    public $config = [];

    function __construct(modX &$modx, array $config = []) 
    {
        $this->modx =&$modx;
        $this->config = $config;
        
        $this->modx->getService('error', \modError::class);
        $this->modx->lexicon('app:auth');
    }

    public function validate($data)
    {
        $question = $this->modx->getObject($this->classKey, $data['login_question']);

        if (empty($question)) {
            $this->modx->error->addField('login_question', $this->modx->lexicon('app.auth_login_question_required'));
            return false;
        }

        if (empty($data['login_answer'])) {
            $this->modx->error->addField('login_answer', $this->modx->lexicon('app.auth_login_question_answer_required'));
            return false;
        }

        return true;
    }
}