<?php

use MODX\Revolution\Processors\Resource\UnPublish;

class msProductUnPublishProcessor extends UnPublish
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

return 'msProductUnPublishProcessor';
