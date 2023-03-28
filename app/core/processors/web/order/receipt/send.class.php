<?php


namespace App\Processors\Web\Order\Receipt;

use MODX\Revolution\Processors\Processor;

class SendProcessor extends Processor
{
    public $app;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        $order = array_merge($this->formOrder(), ['id' => 409]);
        $path = trim('order/receipts/', '/') . '/';
        $file = $path . md5(json_encode($order)) . '.pdf';
        $lifetime = 0;

        $this->app->saveTempPage($order, $file, $lifetime);

        $this->receiptUrl = $this->modx->getOption('site_url') . $file;

        $this->email = 'romagifted@gmail.com';
        $this->sendEmail();

        return $this->cleanup($this->receiptUrl);
    }

    public function getLanguageTopics() {
        return ['app:order', 'app'];
    }

    public function formOrder()
    {
        $orderForm = $this->app->getService('orderForm', 
            \App\Order\CreateForm::class);

        $order = $orderForm->buildOrder($this->getProperties());
        return $orderForm->_toArray($order);
    }

    
    public function sendEmail()
    {
        $userEmailOptions = [
            'pdfUrl' => $this->receiptUrl,
            'subject' => $this->modx->lexicon('app.order_receipt_user_email_subject'),
            'message' => $this->modx->getOption('app.order_receipt_user_email_tpl', null, 
                '@FILE chunks/app/order/receipts/emails/user.tpl'), 
        ];

        if (!$this->app->sendEmail($this->email, $userEmailOptions)) {
            return $this->modx->lexicon('app.order_receipt_email_err');
        }
    }

    public function cleanup($url)
    {
        return $this->success('', [
            'url' => $url
        ]);
    }
}

return SendProcessor::class;