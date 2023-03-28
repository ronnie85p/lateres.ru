<?php


namespace App\Processors\Web\Order\Offer;
use MODX\Revolution\Processors\Processor;

class Send extends Processor
{
    public $app;
    public $emails;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');
        $this->emails = explode(',', $this->getProperty('email'));
        if (empty($this->emails)) {
            $this->addFieldError('email', $this->modx->lexicon('app.order_offer_email_is_empty'));
            return $this->modx->lexicon('app.order_offer_email_is_empty');
        }

        $this->setProperties([
            'validation' => [
                'email' => 'email'
            ]
        ]);

        return parent::initialize();
    }

    public function process()
    {
        $validated = $this->validate();
        if ($validated !== true) {
            return $this->failure($validated === false ? '' : $validated);
        }

        $prevent = $this->getOfferUrl();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->sendEmails();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }
 
        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:order', 'app'];
    }

    public function validate()
    {
        $validator = $this->app->getValidator();

        foreach ($this->emails as $email) {
            $validated = $validator->validate(['email' => trim($email)], 
                $this->getProperty('validation'));
            if ($validated !== true) {
                break;
            }
        }

        return !$validator->hasErrors();
    }

    public function getOfferUrl()
    {
        $response = $this->app->runProcessor('web/order/offer/get', 
            $this->getProperties());

        if ($response->isError()) {
            return $response->getMessage();
        }

        $this->offerUrl = $response->getObject()['url'];
    }

    public function sendEmails()
    {
        $userEmailOptions = [
            'pdfUrl' => $this->offerUrl,
            'subject' => $this->modx->lexicon('app.order_offer_user_email_subject'),
            'message' => $this->modx->getOption('app.order_offer_user_email_tpl', null, 
                '@FILE chunks/app/order/offers/emails/user.tpl'), 
        ];

        foreach ($this->emails as $email) {
            if (!$this->app->sendEmail(trim($email), $userEmailOptions)) {
                return $this->modx->lexicon('app.order_offer_email_err');
            }
        }

        $adminEmails = explode(',', $this->modx->getOption('app.admin_emails'));
        $adminEmailOptions = [
            'offerUrl' => $this->offerUrl,
            'emails' => $this->emails,
            'subject' => $this->modx->lexicon('app.order_offer_admin_email_subject'),
            'message' => $this->modx->getOption('app.order_offer_admin_email_tpl', null, 
                '@FILE chunks/app/order/offers/emails/admin.tpl'),
        ];

        foreach ($adminEmails as $email) {
            $this->app->sendEmail(trim($email), $adminEmailOptions);
        }
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.order_offer_email_was_sent'));
    }
}

return Send::class;