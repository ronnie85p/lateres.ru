<?php
namespace App\Model\Profile\mysql;

use xPDO\xPDO;

class Address extends \App\Model\Profile\Address
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Profile',
        'version' => '3.0',
        'table' => 'profile_addresses',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'user_id' => NULL,
            'rank' => 0,
            'title' => '',
            'text' => '',
            'country' => '',
            'index' => '',
            'region' => '',
            'district' => '',
            'city' => '',
            'metro' => '',
            'street' => '',
            'building' => '',
            'room' => '',
            'corpus' => '',
            'floor' => 0,
            'premise' => '',
            'coords' => '',
            'map_zoom' => 0,
            'comment' => '',
            'properties' => '{}',
            'createdon' => NULL,
            'updatedon' => NULL,
        ),
        'fieldMeta' => 
        array (
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'rank' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'title' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '150',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'text' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'country' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'index' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '50',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'region' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'district' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'city' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'metro' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'street' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'building' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'room' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'corpus' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '4',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'floor' => 
            array (
                'dbtype' => 'int',
                'precision' => '3',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
            'premise' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'coords' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '25',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'map_zoom' => 
            array (
                'dbtype' => 'int',
                'precision' => '2',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => true,
                'default' => 0,
            ),
            'comment' => 
            array (
                'dbtype' => 'text',
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
            'createdon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'updatedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
        ),
        'indexes' => 
        array (
            'user_id' => 
            array (
                'alias' => 'user_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'user_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
        'aggregates' => 
        array (
            'User' => 
            array (
                'class' => 'MODX\\Revolution\\modUser',
                'local' => 'user_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'UserProfile' => 
            array (
                'class' => 'MODX\\Revolution\\modUserProfile',
                'local' => 'user_id',
                'foreign' => 'internalKey',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
