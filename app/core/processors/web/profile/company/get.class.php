<?php

namespace App\Processors\Profile\Company;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \App\Model\Profile\Company::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
            ],
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function beforeOutput() 
    {
        $this->object = $this->object->toArray();

        if (empty($this->object['text'])) {
            $this->getText();
        }

        if (empty($this->object['address_text']) && !empty($this->object['address_country'])) {
            $this->getAddressText();
        }
    }

    public function getText()
    {
        $requisites = [];
        $requisites[] = $this->object['name'];
        $requisites[] = 'ИНН ' . $this->object['inn'];
        $requisites[] = 'КПП ' . $this->object['kpp'];

        if (!empty($this->object['ogrn'])) {
            $requisites[] = 'ОГРН (ИП) ' . $this->object['ogrn'];
        }

        if (!empty($this->object['phone'])) {
            $requisites[] = 'тел. ' . $this->object['phone'];
        }

        $this->object['text'] = implode(', ', $requisites);
    }

    public function getAddressText()
    {
        $address = [];
        $address[] = $this->object['address_country'];
        $address[] = $this->object['address_index'];
        $address[] = $this->object['address_region'];
        $address[] = $this->object['address_city'];
        $address[] = $this->object['address_street'];

        if (!empty($this->object['address_building'])) {
            $address[] = 'строение ' . $this->object['address_bulding'];
        }

        if (!empty($this->object['address_corpus'])) {
            $address[] = 'корп. ' . $this->object['address_corpus'];
        }

        if (!empty($this->object['address_premise'])) {
            $address[] = 'пом. ' . $this->object['address_premise'];
        }

        if (!empty($this->object['address_floor'])) {
            $address[] = 'этаж ' . $this->object['address_floor'];
        }

        if (!empty($this->object['address_room'])) {
            $address[] = 'офис ' . $this->object['address_room'];
        }

        $this->object['address_text'] = implode(', ', $address);
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return Get::class;
