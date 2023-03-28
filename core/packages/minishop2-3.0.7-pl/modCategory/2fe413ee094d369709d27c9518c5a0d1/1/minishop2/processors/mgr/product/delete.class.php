<?php

use MODX\Revolution\Processors\Resource\Delete;

class msProductDeleteProcessor extends Delete
{
    public $permission = 'msproduct_delete';

    /**
    * @return bool
    */
    public function checkPermissions()
    {
        return empty($this->permission) || $this->modx->hasPermission($this->permission);
    }
}

return 'msProductDeleteProcessor';
