<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class Prepare extends BaseProcessor
{
    public function initialize() 
    {
        $total = $this->app->runProcessor('web/cart/getTotal')->getObject();
        if (empty($total['cost'])) {
            return $this->modx->lexicon('app.order_validate_empty_items');
        }

        $minCost = (int) $this->modx->getOption('app.ordering_cost_from');
        if ($minCost > 0 && $total['cost'] < $minCost) {
            return $this->modx->lexicon('app.ordering_less_min_cost');
        }

        return parent::initialize();
    }

    public function process()
    {
        return $this->cleanup();
    }

    public function getReturnUrl()
    {
        $resourceId = $this->modx->getOption('app.ordering_page');
        $params = ['from' => 'cart'];
        if (!$this->modx->user->isAuthenticated('web')) {
            $resourceId = $this->modx->getOption('app.login_page');
            $params['return_url'] = $this->modx->makeUrl($this->modx->getOption('app.ordering_page'));
        }

        return $this->modx->makeUrl($resourceId, null, $params);
    }

    public function cleanup(array $data =[])
    {
        return $this->success(
            $this->modx->lexicon('app.order_created'),
            [ 'redirect' => $this->getReturnUrl() ]
        );
    }
}

return Prepare::class;
