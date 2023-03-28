<?php


namespace App\Processors\Web\Order\Action;
use MODX\Revolution\Processors\Processor;

class Status extends Processor
{
    public $app;
    public $order;
    public $status;
    public $object;

    public $STATUS_CANCELED = 4;
    public $STATUS_NEW = 1;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');
        $this->order = $this->app->getService('order', \App\Order::class);

        $this->status = (int) $this->getProperty('status');
        if (empty($this->status)) {
            return $this->modx->lexicon('no_status');
        }

        $this->object = $this->modx->getObject(\msOrder::class, [
            'user_id' => $this->modx->user->get('id'),
            'id' => $this->getProperty('id')
        ]);

        if (empty($this->object)) {
            return $this->modx->lexicon('no_object');
        }

        return parent::initialize();
    }

    public function process()
    {
        // return $this->success();
        if ($this->status === $this->STATUS_CANCELED) {
            if ($this->object->get('status') === $this->STATUS_NEW) {
                if (($response = $this->changeStatus()) !== true) {
                    return $response;
                }
            } else {
                return $this->failure('access_denied');
            }
        }

        return $this->success();   
    }

    public function changeStatus()
    {
        $miniShop2 = $this->modx->getService('miniShop2');
        if ($miniShop2) {
            return $miniShop2->changeOrderStatus($this->object->get('id'), $this->status);
        }
    }
}

return Status::class;