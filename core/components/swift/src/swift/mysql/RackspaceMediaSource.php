<?php
namespace Swift\mysql;

use xPDO\xPDO;

class RackspaceMediaSource extends \Swift\RackspaceMediaSource
{

    public static $metaMap = array (
        'package' => 'Swift',
        'version' => '3.0',
        'extends' => 'Swift\\SwiftMediaSource',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
        ),
        'fieldMeta' => 
        array (
        ),
    );

}
