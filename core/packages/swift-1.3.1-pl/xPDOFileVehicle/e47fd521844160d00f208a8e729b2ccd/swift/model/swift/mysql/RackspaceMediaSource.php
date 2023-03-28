<?php
namespace swift\mysql;

use xPDO\xPDO;

class RackspaceMediaSource extends \swift\RackspaceMediaSource
{

    public static $metaMap = array (
        'package' => 'swift',
        'version' => '3.0',
        'extends' => 'MODX\\Revolution\\sources\\SwiftMediaSource',
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
