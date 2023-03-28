<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class Create extends BaseProcessor
{
    public function process()
    {
        $validated = $this->validate();
        if ($validated !== true) {
            return $this->failure($validated === false ? '' : $validated);
        }

        $this->items = $this->getItems();
        $this->prepare();

        $this->object = $this->order->build($this->getProperties());
        if (!$this->object->save()) {
            return $this->failure($this->modx->lexicon('app.ordering_create_err'));
        }

        $this->removeItems();
        $this->changeStatus();

        // return $this->success('', [$this->object, $this->getProperties(), $this->getTotal(), $this->object->Address->toArray()]);
        return $this->cleanup();
    }

    public function validate()
    {
        $response = $this->app->runProcessor('web/ordering/validate', 
            $this->getProperties());

        if ($response->isError()) {
            return $response->getMessage();
        }

        return true;
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $properties['items'] = $this->items;

        $data = $this->order->prepare($properties);
        $this->setProperties($data);
    }

    public function changeStatus()
    {
        $miniShop2 = $this->modx->getService('miniShop2');
        if ($miniShop2) {
            $miniShop2->changeOrderStatus($this->object->get('id'), 
                $this->modx->getOption('app.order_status_new', null, 1)); 
        }
    }

    public function removeItems()
    {
        $keys = array_map(function ($item) { return $item['id']; }, $this->items);

        $this->app->runProcessor('web/cart/remove', ['keys' => $keys]);
    }

    public function cleanup(array $data = [])
    {
        return $this->success(
            $this->modx->lexicon('app.order_created'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Create::class;
