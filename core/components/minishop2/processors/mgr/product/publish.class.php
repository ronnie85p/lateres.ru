<?php

use MODX\Revolution\Processors\Resource\Publish;

class msProductPublishProcessor extends Publish
{
    public $permission = 'msproduct_publish';

    /**
    * @return bool
    */
    public function checkPermissions()
    {
        return empty($this->permission) || $this->modx->hasPermission($this->permission);
    }
}

return 'msProductPublishProcessor';
