<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \App\Model\Profile\Address::class;

    public function initialize() 
    {
        $this->setDefaultProperties([
            'sort' => 'createdon',
            'dir' => 'ASC',
            'start' => 0,
            'limit' => 20,
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where(['user_id' => $this->modx->user->get('id')]);

        return $c;
    }

    public function afterIteration(array $list)
    {
        $extended = $this->modx->user->Profile->get('extended')?:[];
        foreach ($list as &$item) {
            $item['is_default'] = (int)$extended['delivery_address'] === $item['id'];
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return json_decode(
            parent::outputArray($array, $count)
            , true
        );
    }
}

return GetList::class;