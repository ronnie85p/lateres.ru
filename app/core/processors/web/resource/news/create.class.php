<?php

namespace WF\Resources\Processors\News;

use WF\Resources\Processors\Object\CreateProcessor;

require_once dirname(__DIR__) . '/object/create.class.php';

class Create extends CreateProcessor
{   
    public function initialize() {
        return parent::initialize();
    }

    public function setFieldDefaults()
    {   
        $tvs = [];
        $tvs['tags'] = $this->properties['introtext'];
        $tvs['subject'] = (int)$this->properties['subject'];
        $tvs['products_category'] = (int) $this->properties['products_category'];
        $tvs['fbPost'] = isset($fields['fbPost']) ? 1: 0;
        $tvs['twPost'] = isset($fields['twPost']) ? 1: 0;
        $tvs['vkPost'] = isset($fields['vkPost']) ? 1: 0;

        return parent::setFieldDefaults();
    }

    public function beforeSet() 
    {
        // return '[beforeSet] prevent action';
        return parent::beforeSet();
    }

    public function beforeSave()
    {
        // $this->addFieldError('properties', $this->properties);
        // return '[beforeSave] prevent action';
        return parent::beforeSave();
    }
}

return 'WF\\Resources\\Processors\\News\\Create';