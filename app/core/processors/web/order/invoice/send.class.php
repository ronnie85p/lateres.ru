<?php


namespace App\Processors\Web\Order\Invoice;

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
        $path = trim('order/invoices/', '/') . '/';
        $file = $path . md5(json_encode($order)) . '.pdf';
        $lifetime = 0;

        $this->app->saveTempPage($order, $file, $lifetime);

        $this->invoiceUrl = $this->modx->getOption('site_url') . $file;

        $this->email = 'romagifted@gmail.com';
        $this->sendEmail();

        return $this->cleanup($this->invoiceUrl);
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
            'pdfUrl' => $this->invoiceUrl,
            'subject' => $this->modx->lexicon('app.order_invoice_user_email_subject'),
            'message' => $this->modx->getOption('app.order_invoice_user_email_tpl', null, 
                '@FILE chunks/app/order/invoices/emails/user.tpl'), 
        ];

        if (!$this->app->sendEmail($this->email, $userEmailOptions)) {
            return $this->modx->lexicon('app.order_invoice_email_err');
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