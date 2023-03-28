<?php

use MODX\Revolution\Processors\Model\UpdateProcessor;

class msProductShowInTreeProcessor extends UpdateProcessor
{
    public $classKey = 'msProduct';

    /**
    * @return bool
    */
    public function beforeSet()
    {
        $this->properties = array(
            'show_in_tree' => true
        );

        return true;
    }
}

return 'msProductShowInTreeProcessor';
