<?php

namespace App\Processors\Call;
use MODX\Revolution\Processors\Processor;

class SendOrderProcessor extends Processor
{
    public $app;

    public $fullname;
    public $phone;
    public $datetime;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $this->fullname = $this->getProperty('fullname');
        $this->phone = $this->getProperty('phone');
        $this->datetime = $this->getProperty('datetime');

        if (empty($this->fullname)) {
            $this->addFieldError('fullname', 'Enter fullname');
            return false;
        }

        if (empty($this->phone)) {
            $this->addFieldError('phone', 'Enter phone');
            return false;
        }

        if (empty($this->datetime)) {
            $this->addFieldError('datetime', 'Choose datetime');
            return false;
        }

        $this->phone = preg_replace('/[^0-9\+]/', '', $this->phone);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:call', 'app'];
    }

    public function process()
    {
        $prevent = $this->sendEmail();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        return $this->success();
    }

    public function sendEmail()
    {
        $sentError = false;
        $data = [
            'fullname' => $this->fullname,
            'phone' => $this->phone,
            'datetime' => $this->datetime,
        ];

        $emailOptions = [
            'data' => $data,
            'subject' => $this->modx->lexicon('app.call_send_email_subject', $data),
            'message' => $this->modx->getOption('app.call_send_email_message_tpl', null, 
                '@FILE chunks/app/call/emails/message.tpl'),
        ];

        $managerEmails = explode(',', $this->modx->getOption('ms2_email_manager'));
        foreach ($managerEmails as $email) {
            $email = trim($email);
            if (empty($email)) continue;
            if (!$this->app->sendEmail($email, $emailOptions)) {
                $sentError = true;
            }
        }

        if ($sentError) {
            return $this->modx->lexicon('app.call_send_order_err');
        }
    }
}

return SendOrderProcessor::class;

