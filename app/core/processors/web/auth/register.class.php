<?php

namespace App\Processors\Web\Auth;

use MODX\Revolution\modX;
use MODX\Revolution\Processors\Security\User\Create; 

class RegisterProcessor extends Create
{
    /**@var App\Core $app */
    public $app;

    public $languageTopics = ['user', 'login', 'app:auth'];

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->app->getService('auth', \App\Auth::class);

        $this->setDefaultProperties([
            'active' => $this->modx->getOption('app.auth_register_active', null, 0),
            'autoLogin' => $this->modx->getOption('app.auth_register_autologin', null, 1),
            'generatePassword' => $this->modx->getOption('app.auth_register_generate_password', null, 0),
            'generateEmailIfEmpty' => $this->modx->getOption('app.auth_register_generate_email_ifempty', null, 0),
            'generateUsernameIfEmpty' => $this->modx->getOption('app.auth_register_generate_username_ifempty', null, 1),
            'groups' => $this->modx->getOption('app.auth_register_groups', null, '[{"usergroup": 3, "role": 1}]'),
            'checkUserFields' => $this->modx->getOption('app.auth_register_check_user_fields', null, '{
                "username": "modUser.username",
                "email": "Profile.email"
            }'),
        ]);

        return parent::initialize();
    }

    public function beforeSet()
    {   
        $formater = $this->app->getFormater();

        $properties = $this->getProperties();
        $properties['passwordnotifymethod'] = 's';

        $groups = is_array($properties['groups']) 
            ? $properties['groups'] 
            : json_decode($properties['groups'], true);
        $properties['groups'] = empty($groups) ? [] : $groups;

        $checkUserFields = is_array($properties['checkUserFields']) 
            ? $properties['checkUserFields'] 
            : json_decode($properties['checkUserFields'], true);
        $properties['checkUserFields'] = empty($checkUserFields) ? [] : $checkUserFields;

        $fullname = array_slice(array_map('ucfirst', explode(' ', 
            $formater->trimSpaces($properties['fullname']))), 0, 3);
        $properties['fullname'] = implode(' ', $fullname);

        $uniqId = time();
        $username = empty($properties['username']) ? '' : trim($properties['username']);
        $username = empty($username) && !empty($this->getProperty('generateUsernameIfEmpty')) 
            ? $uniqId : $username;
        $properties['username'] = $username;

        $email = empty($properties['email']) ? '' : trim($properties['email']);
        $properties['email'] = empty($email) && !empty($this->getProperty('generateEmailIfEmpty')) 
            ? $uniqId . '@' . $this->modx->getOption('http_host') : $email;

        $mobilephone = empty($properties['mobilephone']) ? '' : trim($properties['mobilephone']);
        $properties['mobilephone_text'] = $mobilephone;
        $properties['mobilephone'] = $formater->trimPhone($mobilephone);
        $properties['agreed'] = (int) $properties['agreed'];

        $properties['password'] = $properties['generatePassword']
            ? $this->modx->user->generatePassword(
                $this->modx->getOption('password_generated_length'))
            : $properties['password'];

        $properties['extended'] = [
            'firstname' => empty($fullname[0]) ? '' : $fullname[0],
            'midname' => empty($fullname[1]) ? '' : $fullname[1],
            'lastname' => empty($fullname[2]) ? '' : $fullname[2],
        ];

        $properties['settings'] = [
            'user_type' => (int) $properties['user_type'],
        ];

        if (!empty($properties['user_type'])) {
            $properties['company_name'] = $formater->trimSpaces($properties['company_name']);
            $properties['company_phone'] = $formater->trimPhone($properties['company_phone']);
            $properties['company_inn'] = empty($properties['company_inn']) ? '' : (int) $properties['company_inn'];
            $properties['company_kpp'] =  empty($properties['company_kpp']) ? '' : (int) $properties['company_kpp'];
            $properties['company_ogrn'] =  empty($properties['company_ogrn']) ? '' : (int) $properties['company_ogrn'];

            if (!empty($properties['company_address_required'])) {
                $properties['company_address_country'] = $formater->trimSpaces(
                    $properties['company_address_country']);
                $properties['company_address_index'] =  empty($properties['company_address_index']) ? '' : 
                    (int) $properties['company_address_index'];
                $properties['company_address_region'] = $formater->trimSpaces(
                    $properties['company_address_region']);
                $properties['company_address_city'] = $formater->trimSpaces(
                    $properties['company_address_city']);
                $properties['company_address_street'] = $formater->trimSpaces(
                    $properties['company_address_street']);
                $properties['company_address_building'] = $formater->trimSpaces(
                    $properties['company_address_building']);
                $properties['company_address_corpus'] = $formater->trimSpaces(
                    $properties['company_address_corpus']);
                $properties['company_address_premise'] = $formater->trimSpaces(
                    $properties['company_address_premise']);
                $properties['company_address_room'] = $formater->trimSpaces(
                    $properties['company_address_room']);
                $properties['company_address_floor'] =  empty($properties['company_address_floor']) ? '' :  
                    (int) $properties['company_address_floor'];
            }
        }

        $this->setProperties($properties);

        // $this->addFieldError('props', $properties);
        // return 'beforeSet';
        return parent::beforeSet();
    }

    public function beforeSave()
    {   
        if ($this->checkAgreed() !== true) {
            return false;
        }

        if ($this->validateFields() !== true) {
            return false;
        }
        
        if ($this->checkUserExists() !== true) {
            return false;
        }
   
        if ($this->checkUserExistsByPhone() !== true) {
            return false;
        }

        if ($this->checkPasswords() !== true) {
            return false;
        }

        // $this->addFieldError('props', $this->getProperties());
        // return 'beforeSave';
        return parent::beforeSave();
    }

    public function afterSave() 
    {   
        $this->setSettings();
        $this->setUserGroups();
        $this->setUsername();
        $this->setEmail();
        $this->saveMobilephone();
        $this->saveCompany();
        $this->createWebPage();
        

        // if (!$this->object->get('active') && $this->getProperty('sendEmailForActivation', 0)) {
        //     if (!$this->sendActivationEmail()) {
        //         return $this->modx->lexicon('app.email_err');
        //     }

        //     return false;
        // }

        if ($this->object->get('active')) {
            $this->autoLogin();
        }

        return parent::afterSave();
    }
    /**
     * @return boolean
     */
    public function validateFields() 
    {
        if (!$validator = $this->app->getValidator()) {
            return false;
        }

        $properties = $this->getProperties();
        $validation = [
            'fullname' => 'required',
            'mobilephone' => 'mobilephone',
        ];

        if (empty($this->getProperty('generateUsernameIfEmpty'))) {
            $validation = array_merge($validation, [
                'username' => 'required',
            ]);
        }

        if (empty($this->getProperty('generateEmailIfEmpty'))) {
            $validation = array_merge($validation, [
                'email' => 'required:email',
            ]);
        }

        if (!empty($this->getProperty('user_type'))) {
            $validation = array_merge($validation, [
                'company_name' => 'required="this field"',
                'company_inn' => 'required',
                'company_kpp' => 'required',
                'company_ogrn' => 'required',
                'company_phone' => 'required:mobilephone',
            ]);

            if (!empty($this->getProperty('company_address_required'))) {
                $validation = array_merge($validation, [
                    'company_address_country' => 'required',
                    'company_address_index' => 'required',
                    'company_address_region' => 'required',
                    'company_address_region' => 'required',
                    'company_address_city' => 'required',
                    'company_address_street' => 'required',
                    'company_address_building' => 'required',
                ]);
            }
        }

        $validator->validate($properties, $validation);
        return !$this->hasErrors();
    }

    /**
     * @return bool
     */
    public function checkUserExists() 
    {
        foreach ($this->getProperty('checkUserFields') as $key => $field) {
            $value = $this->getProperty($key);
            if (empty($value)) continue;

            if ($this->modx->getObjectGraph(
                \modUser::class, 
                '{"Profile":{},"UserSettings":{}}', 
                [ $field => $value ]
            )) {
                $this->addFieldError($key, 
                    $this->modx->lexicon('app.auth_user_already_exists')); break;
            }
        }

        return !$this->hasErrors();
    }

    /**
     * @return bool
     */
    public function checkUserExistsByPhone()
    {
        if (!empty($this->getProperty('mobilephone', null))) {
            if ($this->app->auth->checkUserExistsByPhone($this->getProperty('mobilephone'))) {
                $this->addFieldError('mobilephone', 
                    $this->modx->lexicon('app.auth_user_already_phone_exists'));
            }
        }

        return !$this->hasErrors();
    }

    /**
     * @return bool
     */
    public function checkPasswords()
    {
        if ($this->getProperty('generatePassword')) 
            return true;

        return $this->app->auth->checkPasswords($this->getProperty('password'), 
            $this->getProperty('password_again'));
    }
  
    /**
     * @return bool
     */
    public function checkAgreed()
    {
        if (empty($this->getProperty('agreed'))) {
            $this->addFieldError('agreed', 
                $this->modx->lexicon('app.auth_register_not_agreed'));
        }

        return !$this->hasErrors();
    }

    public function setSettings()
    {
        if (!empty($this->getProperty('settings'))) {
            $settings = [];
            foreach ($this->getProperty('settings') as $key => $value) {
                $setting = $this->modx->newObject(\modUserSetting::class);
                $setting->set('user', $this->object->get('id'));
                $setting->set('key', $key);
                $setting->set('value', $value);
    
                $settings[] = $setting;
            }
    
            $this->object->addMany($settings);
            $this->object->save();
        }
    }

    public function setUserGroups()
    {
        parent::setUserGroups();

        $this->setProperty('groups', null);
    }

    public function setUsername()
    {
        if (empty($this->getProperty('generateUsernameIfEmpty'))) {
            return false;
        }

        $usergroup = ($tmp = $this->object->getOne('PrimaryGroup')) ? $tmp->toArray() : [];
        $firstCharGroupName = substr(ucfirst($usergroup['name']), 0, 1);

        $date = date('ymd', $this->object->createdon);
        $username = $firstCharGroupName . $date . $this->object->id;

        $this->object->set('username', $username);
        $this->object->save();

        $this->setProperty('usernameGenerated', true);
    }
    
    public function setEmail()
    {
        if (empty($this->getProperty('generateEmailIfEmpty'))) {
            return false;
        }

        $email = $this->modx->getOption('app.auth_register_email_default', null, 
            'user-[[+user.id]]@[[+http_host]]');

        $this->app->parseContent($email, ['user' => $this->object]);
        $this->profile->set('email', $email);
        $this->profile->save();

        $this->setProperty('emailGenerated', true);
    }

    public function saveMobilephone()
    {
        $object = $this->modx->newObject(\App\Model\Profile\Phone::class);
        $object->set('user_id', $this->object->get('id'));
        $object->set('id', $this->profile->get('mobilephone'));
        $object->set('text', $this->getProperty('mobilephone_text'));
        $object->save();
    }

    public function saveCompany()
    {
        if (empty($this->getProperty('user_type'))) 
            return false;

        $object = $this->modx->newObject(\App\Model\Profile\Company::class);
        $object->set('user_id', $this->object->id);
        $object->set('createdon', time());

        foreach ($this->getProperties() as $key => $value) {
            if (strpos($key, 'company_') == 0) {
                $object->set(str_replace('company_', '', $key), $value);
            }
        }

        $object->save();
    }

    public function createWebPage()
    {
        $parent = $this->modx->getOption('app.profile_pages_parent');
        if (empty($parent)) return false;

        $template = $this->modx->getOption('app.profile_page_template');
        $properties = [
            'parent' => $parent,
            'template' => $template,
            'alias' => $this->object->get('username'),
            'pagetitle' => $this->object->get('username'),
            'longtitle' => $this->object->get('username'),
            'createdby' => $this->object->get('id'),
            'publishedby' => $this->object->get('id'),
            'published' => 1,
            'richtext' => 0,
        ];

        $response = $this->modx->runProcessor('Resource/Create', $properties);
        if (!$response->isError()) {
            $this->profile->set('website', $response->getObject()['id']);
            $this->profile->save();
        }
    }

    public function autoLogin()
    {
        if (!empty($this->getProperty('autoLogin'))) {
            $this->app->runProcessor('web/auth/login', [
                'username' => $this->object->get('username'),
                'password' => $this->getProperty('password'),
            ]);
        }
    }

    public function sendNotificationEmail() 
    {
        $user = array_merge($this->object->toArray(), $this->profile->toArray());

        if ($this->modx->getOption('app.auth_register_notify_new_user', null, 1)) {
            $email = $this->profile->get('email');

            if (!empty($email) && empty($this->getProperty('emailGenerated'))) {
                $profileUrl = '';

                $this->app->sendEmail($email, [
                    'user' => $user,
                    'profile_url' => $profileUrl,
                    'password' => $this->getProperty('password'),
                    'subject' => $this->modx->lexicon('app.auth_register_new_user_email_subject', ['user' => $user]),
                    'message' => $this->modx->getOption('app.auth_register_notify_new_user_email_message', null, 
                        '@FILE chunks/app/auth/register/emails/new_user_email.tpl'),
                ]);
            }
        }

        $profileUrl = $this->modx->makeUrl($this->profile->get('website'), '', '', 'full');
        $adminEmails = explode(',', $this->modx->getOption('app.admin_emails', null, ''));
        foreach ($adminEmails as $email) {
            $email = trim($email);
            if (empty($email)) continue;

            $this->app->sendEmail($email, [
                'user' => $user,
                'profile_url' => $profileUrl,
                'subject' => $this->modx->lexicon('app.auth_register_new_user_admin_email_subject', ['user' => $user]),
                'message' => $this->modx->getOption('app.auth_register_new_user_admin_email_message', null, 
                    '@FILE chunks/app/auth/register/emails/new_user_admin_email.tpl'),
            ]);
        }
    }

    public function sendActivationEmail()
    {
        $email = $this->profile->get('email');
        if (empty($email) || $this->getProperty('emailGenerated')) 
            return false;

        $activationUrl = $this->modx->getOption('app.auth_register_activation_url');
        if (is_numeric($activationUrl)) {
            $activationUrl = $this->modx->makeUrl($activationUrl, '', '', 'full');
        }

        if (empty($activationUrl))
            return false;

        $user = array_merge($this->object->toArray(), $this->profile->toArray());
        $sent = $this->app->sendEmail($email, [
            'user' => $user,
            'activation_url' => $activationUrl,
            'subject' => $this->modx->lexicon('app.auth_register_activation_email_subject', ['user' => $user]),
            'message' => $this->modx->getOption('app.auth_register_activation_email_message', null, 
                '@FILE chunks/app/auth/register/emails/activation_email.tpl'),
        ]);

        return $sent;
    }

    public function cleanup() {
        $returnUrl = $this->getProperty('returnUrl', 
            $this->modx->getOption('app.auth_register_return_url'));

        if (!empty($returnUrl)) {
            if (is_numeric($returnUrl)) {
                $returnUrl = $this->modx->makeUrl($returnUrl, '', '', 'full');
            }
        }

        return $this->success(
            $this->modx->lexicon('app.auth_register_success'), [
                'returnUrl' => $returnUrl,
            ]);
    }
}

return RegisterProcessor::class;