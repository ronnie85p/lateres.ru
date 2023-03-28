<?php

namespace App\Processors\Profile\Company;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \App\Model\Profile\Company::class;

    public function initialize() 
    {
        $this->setDefaultProperties([
            'start' => 0,
            'limit' => 20,
            'sort' => 'createdon',
            'dir' => 'ASC',
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where(['user_id' => $this->modx->user->id]);

        return $c;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            if (empty($item['text'])) {
                $text = $item['name'];
                $text .= ', ИНН ' . $item['inn'];
                $text .= empty($item['kpp']) ? '' : ', KПП ' . $item['kpp'];
                $text .= empty($item['ogrn']) ? '' : ', ОГРН ' . $item['ogrn'];
                $text .= empty($item['phone']) ? '' : ', Тел. ' . $item['phone'];

                $item['text'] = $text;
            }

            if (empty($item['address_text'])) {
                $addressText = $item['country'];
                $addressText .= ', ' . $item['index'];
                $addressText .= ', ' . $item['region'];
                $addressText .= ', ' . $item['city'];
                $addressText .= ', ' . $item['street'];
                $addressText .= ', стр. ' . $item['building'];
                $addressText .= empty($item['kpp']) ? '' : ', корпус ' . $item['corpus'];
                $addressText .= empty($item['floor']) ? '' : ', этаж ' . $item['floor'];
                $addressText .= empty($item['premise']) ? '' : ', пом. ' . $item['premise'];
                $addressText .= empty($item['room']) ? '' : ', офис ' . $item['room'];

                $item['address_text'] = $addressText;
            }
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