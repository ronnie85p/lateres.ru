<?php

namespace App\Processors\Web\Profile\Phone;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \App\Model\Profile\Phone::class;

    public function initialize() 
    {
        $this->setDefaultProperties([
            'start' => 0,
            'limit' => 20,
            'sort' => 'id',
            'dir' => 'ASC',
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
        $mobilephone = $this->modx->user->Profile->get('mobilephone');
        foreach ($list as $idx => &$item) {
            $item['rank'] = $item['id'] == $mobilephone ? 0 : $idx;
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