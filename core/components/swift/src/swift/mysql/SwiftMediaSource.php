<?php
namespace Swift\mysql;

use xPDO\xPDO;

class SwiftMediaSource extends \Swift\SwiftMediaSource
{

    public static $metaMap = array (
        'package' => 'Swift',
        'version' => '3.0',
        'extends' => 'MODX\\Revolution\\Sources\\modMediaSource',
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
