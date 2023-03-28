<?php


namespace App\Processors\Web\Order\Reciept;

use MODX\Revolution\Processors\Processor;

class GetProcessor extends Processor
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

        return $this->cleanup($this->modx->getOption('site_url') . $file);
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

    public function cleanup($url)
    {
        return $this->success('', [
            'url' => $url
        ]);
    }
}

return GetProcessor::class;