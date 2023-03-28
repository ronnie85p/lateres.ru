<?php
namespace App\Model\Profile\mysql;

use xPDO\xPDO;

class Messenger extends \App\Model\Profile\Messenger
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Profile',
        'version' => '3.0',
        'table' => 'profile_messengers',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'phone_id' => NULL,
            'name' => '',
            'icon' => '',
            'url' => '',
            'properties' => '{}',
        ),
        'fieldMeta' => 
        array (
            'phone_id' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '15',
                'phptype' => 'string',
                'null' => false,
            ),
            'name' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '15',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'icon' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'url' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'properties' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'json',
                'null' => true,
                'default' => '{}',
            ),
        ),
        'indexes' => 
        array (
            'phone_id' => 
            array (
                'alias' => 'phone_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'phone_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
        'composites' => 
        array (
            'Phone' => 
            array (
                'class' => 'App\\Model\\Profile\\Phone',
                'local' => 'phone_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'local',
            ),
        ),
    );

}
