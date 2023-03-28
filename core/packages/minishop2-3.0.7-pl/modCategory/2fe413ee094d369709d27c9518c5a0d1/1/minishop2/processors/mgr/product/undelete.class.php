<?php

use MODX\Revolution\Processors\Resource\Undelete;

class msProductUnDeleteProcessor extends UnDelete
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

return 'msProductUnDeleteProcessor';
