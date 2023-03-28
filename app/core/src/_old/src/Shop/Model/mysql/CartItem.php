<?php
namespace WF\Shop\Model\mysql;

use xPDO\xPDO;

class CartItem extends \WF\Shop\Model\CartItem
{

    public static $metaMap = array (
        'package' => 'WF\\Shop\\Model',
        'version' => '3.0',
        'table' => 'shop_cart_items',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'id' => NULL,
            'user_id' => NULL,
            'order_setting_id' => NULL,
            'product_id' => NULL,
            'pagetitle' => '',
            'description' => '',
            'price' => 0.0,
            'old_price' => 0.0,
            'net_sale_cost' => 0.0,
            'cost' => 0.0,
            'discount' => 0.0,
            'tax_rate' => 0.0,
            'sales_tax' => 0.0,
            'weight' => 0.0,
            'image' => NULL,
            'count' => NULL,
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
            'order_setting_id' => 
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
            'pagetitle' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'description' => 
            array (
                'dbtype' => 'text',
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
            'old_price' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'net_sale_cost' => 
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
            'discount' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'tax_rate' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'sales_tax' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'weight' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '13,3',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'image' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
            ),
            'count' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
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
            'order_setting_id' => 
            array (
                'alias' => 'order_setting_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'order_setting_id' => 
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
                'class' => 'msProduct',
                'local' => 'product_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'OrderSetting' => 
            array (
                'class' => 'WF\\Shop\\Model\\OrderSetting',
                'local' => 'order_setting_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
        ),
    );

}
