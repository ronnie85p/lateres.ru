<?php

namespace WF\Resources\Processors\Adv;

use WF\Resources\Processors\Object\UpdateProcessor;

require_once dirname(__DIR__) . '/object/update.class.php';

class Update extends UpdateProcessor
{   
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
        return parent::beforeSave();
    }
}

return 'WF\\Resources\\Processors\\Adv\\Update';