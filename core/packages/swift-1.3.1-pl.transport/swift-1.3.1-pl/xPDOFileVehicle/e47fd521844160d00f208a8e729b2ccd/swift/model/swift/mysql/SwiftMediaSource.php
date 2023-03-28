<?php
namespace swift\mysql;

use xPDO\xPDO;

class SwiftMediaSource extends \swift\SwiftMediaSource
{

    public static $metaMap = array (
        'package' => 'swift',
        'version' => '3.0',
        'extends' => 'MODX\\Revolution\\sources\\modMediaSource',
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
