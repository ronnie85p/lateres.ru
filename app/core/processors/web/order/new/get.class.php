<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

require_once __DIR__ . '/base.class.php';

class GetProcessor extends BaseProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $this->getSettings();

        $this->getDeliveries();
        $this->getCustomer();

        return $this->cleanup();
    }

    public function getSettings()
    {
        $cachePath = trim($this->modx->getOption('app.preorder_cache_path', null, 'app/order/'), '/') . '/';
        $settings = $this->app->getCache($cachePath . md5($this->modx->user->get('id')));

        $this->settings = array_merge([
            'delivery' => 1,
            'payment' => 1,
            'delivery_car' => 1,
        ], $settings ?: []);
    }

    public function getDeliveries()
    {
        $response = $this->app->runProcessor('web/delivery/getList');
        $response = $response->getResponse();

        $this->deliveries = $response['results'];
    }

    public function getDeliveryCars()
    {
        $response = $this->app->runProcessor('web/delivery/car/getList');
        $response = $response->getResponse();

        $this->deliveryCars = $response['results'];
    }

    public function getPayments()
    {
        $response = $this->app->runProcessor('web/delivery/payment/getList', [
            'delivery_id' => $this->settings['delivery'],
        ]);

        $response = $response->getResponse();
        $this->payments = $response['results'];
    }

    public function getCustomer()
    {
        $response = $this->app->runProcessor('web/profile/company/get');
        $company = $response->getObject();

        $response = $this->app->runProcessor('web/profile/address/get');
        $address = $response->getObject();

        $profile = $this->modx->user->getOne('Profile');
        $settings = $this->modx->user->getSettings();

        $this->customer = [
            'user_id' => $this->modx->user->get('id'),
            'fullname' => $profile->get('fullname'),
            'mobilephone' => $profile->get('mobilephone'),
            'email' => $profile->get('email'),
            'company' => $company,
            'address' => $address,
            'settings' => $settings,
        ];
    }

    public function cleanup()
    {
        return $this->success('', [
            'settings' => $this->settings,
            'deliveries' => $this->deliveries,
            'delivery_cars' => $this->deliveryCars,
            'payments' => $this->payments,
            'customer' => $this->customer,
        ]);
    }
}

return GetProcessor::class;