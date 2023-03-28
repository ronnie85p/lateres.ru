<?php

use MODX\Revolution\Processors\Model\UpdateProcessor;

class msProductHideInTreeProcessor extends UpdateProcessor
{
    public $classKey = 'msProduct';

    /**
    * @return bool
    */
    public function beforeSet()
    {
        $this->properties = array(
            'show_in_tree' => false,
        );

        return true;
    }
}

return 'msProductHideInTreeProcessor';
