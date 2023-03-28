<?php

namespace App\Processors\Web\Auth;
use MODX\Revolution\Processors\Security\Login;

class LoginProcessor extends Login
{
    /**@var App\Core $app */
    public $app;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $this->setProperties([
            'loginContext' => 'web',
            'username' => $this->getProperty('username'),
            'password' => $this->getProperty('password'),
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics()
    {
        return ['app:auth', 'login'];
    }

    public function afterLogin()
    {
        $this->getUserContexts();
        parent::afterLogin();

        $this->saveLogin();
        $this->sendNotificationEmail();
        
        return $this->cleanup($this->prepareResponse());
    }

    public function isNeedConfirmLogin()
    {
        $settings = $this->user->getSettings();

        return !empty($settings['login_auth_activate']) && !empty($settings['login_auth_method']);
    }

    public function getUserContexts()
    {
        $group = $this->user->getOne('PrimaryGroup');
        if (empty($group))
            return false;

        $q = $this->modx->newQuery(\modAccessContext::class);
        $q->select($this->modx->getSelectColumns(
            \modAccessContext::class)
        );

        $q->where([
            'target:!=' => 'mgr',
            'principal' => $group->get('id'),
            'principal_class' => \MODX\Revolution\modUserGroup::class
        ]);

        $acs = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $acs = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
            
        $this->addContexts = array_merge($this->addContexts, array_column($acs, 'target'));
    }

    public function saveLogin()
    {
        $this->login = $this->modx->newObject(\App\Model\Auth\Login::class);
        $this->login->fromArray([
            'id' => session_id(),
            'timestamp' => time(),
            'user_id' => $this->user->id,
            'ip' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        ]);

        $this->login->save();
    }

    public function sendNotificationEmail()
    {
        $client = $this->app->getClient();
        $browser = $client->getBrowser($this->login->get('user_agent'));

        $user = array_merge($this->user->toArray(), $this->user->Profile->toArray());
        $login = array_merge($this->login->toArray(), [
            'browser' => $client->getBrowserInfo($browser),
            'geolocation' => $client->getGeolocation($this->login->get('ip')),
        ]);

        $options = [
            'user' => $user,
            'login' => $login,
            'subject' => $this->modx->lexicon('app.auth_email_subj'),
            'message' => $this->modx->getOption('app.auth_login_email_tpl', null, 
                '@FILE chunks/app/auth/login/emails/message.tpl'),
        ];

        $this->app->sendEmail($user['email'], $options);
    }

    /**
     * @return bool|null|string
     */
    public function getUser()
    { 
        $criteria = [
            ['modUser.username' => $this->username],
            ['OR:Profile.email:=' => $this->username]
        ];

        /** @var $user modUser */
        $this->user = $this->modx->getObjectGraph(
            \modUser::class, 
            '{"Profile":{},"UserSettings":{}}', 
            $criteria
        );
        
        return $this->fireOnUserNotFoundEvent();
    }

    public function getReturnUrl()
    {
        $startPage = $this->getProperty('return_url', 
            $this->modx->getOption('app.auth_login_return_url'));
 
        if (empty($startPage)) {
            $userGroup = $this->user->getOne('PrimaryGroup');

            if ($userGroup) {
                $defaultCtx = 'web';
                $userGroupSetting = $this->modx->getObject(\modUserGroupSetting::class, [
                    'group' => $userGroup->get('id'),
                    'key' => 'default_context',
                ]);
        
                if ($userGroupSetting) {
                    $defaultCtx = $userGroupSetting->get('value');
                }
        
                $contextSetting = $this->modx->getObject(\modContextSetting::class, [
                    'context_key' => $defaultCtx,
                    'key' => 'index_page',
                ]);

                if ($contextSetting) {
                    $startPage = $contextSetting->get('value');
                }
            } 
        }

        $startPage = empty($startPage) ? $this->modx->getOption('site_start', null, 1) : $startPage;
        if (is_numeric($startPage)) {
            return $this->modx->makeUrl($startPage);
        }

        return $startPage;
    }

    public function prepareResponse()
    {
        $userToken = $this->user->getUserToken($this->modx->context->get('key'));
        $returnUrl = $this->getReturnUrl();

        return [
            'redirect' => $returnUrl,
            'token' => $userToken,
        ];
    }
}

return LoginProcessor::class;

