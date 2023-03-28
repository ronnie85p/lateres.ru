<?php

namespace App\Processors\Web\Auth\Session;
use MODX\Revolution\Processors\Processor;

class DestroyAll extends Processor
{
    public $session;

    public function initialize()
    {
        $this->session = $this->modx->getService('session', \App\Auth\Session::class);

        return parent::initialize();
    }

    public function process()
    {
        $sessionId = session_id();
        $sessions = $this->session->getList(null, [
            'user' => $this->modx->user->id,
        ]);

        $destroyed = [];
        foreach ($sessions as $session) {
            if ($session['id'] !== $sessionId) {
                $destroyed[] = $session;
                $this->session->destroy($session['id']);
            }
        }

        return $this->success($this->modx->lexicon('app.auth_sessions_destroyed'), [
            'sessions' => $sessions,
            'destroyed' => $destroyed,
        ]);
    }

    public function test_login()
    {
        $app = $this->modx->services->get('app');
        $response = $app->runProcessor('web/auth/login', [
            'username' => 'test', //'lateres_ru',
            'password' => '12345678'
        ]);

        return $response->getResponse();
    }
}

return DestroyAll::class;