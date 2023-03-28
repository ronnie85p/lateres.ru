<?php
namespace App\Model\Cart\mysql;

use xPDO\xPDO;

class Item extends \App\Model\Cart\Item
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Cart',
        'version' => '3.0',
        'table' => 'cart_items',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'id' => NULL,
            'user_id' => NULL,
            'product_id' => NULL,
            'name' => '',
            'image' => '',
            'price' => 0.0,
            'cost' => 0.0,
            'count' => 1,
            'checked' => 0,
            'createdon' => NULL,
            'updatedon' => NULL,
            'properties' => NULL,
        ),
        'fieldMeta' => 
        array (
            'id' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '40',
                'phptype' => 'string',
                'null' => false,
            ),
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'product_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'name' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'image' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'price' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'cost' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'count' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 1,
            ),
            'checked' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'createdon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
            ),
            'updatedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
            ),
            'properties' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'json',
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
            'product_id' => 
            array (
                'alias' => 'product_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'product_id' => 
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
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'UserProfile' => 
            array (
                'class' => 'MODX\\Revolution\\modUserProfile',
                'local' => 'user_id',
                'foreign' => 'internalKey',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'Product' => 
            array (
                'class' => 'MODX\\Revolution\\modResource',
                'local' => 'product_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
        ),
    );

}
