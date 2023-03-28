<?php
namespace WF\Shop\Model\mysql;

use xPDO\xPDO;

class OrderSetting extends \WF\Shop\Model\OrderSetting
{

    public static $metaMap = array (
        'package' => 'WF\\Shop\\Model',
        'version' => '3.0',
        'table' => 'shop_order_settings',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'id' => NULL,
            'user_id' => NULL,
            'address_id' => NULL,
            'payment_id' => NULL,
            'delivery_id' => NULL,
            'weight' => 0.0,
            'old_cart_cost' => 0.0,
            'cart_cost' => 0.0,
            'delivery_cost' => 0.0,
            'cost' => 0.0,
            'sales_tax' => 0.0,
            'discount' => 0.0,
            'contract_required' => 0,
            'createdon' => NULL,
            'updatedon' => NULL,
            'properties' => NULL,
        ),
        'fieldMeta' => 
        array (
            'id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'index' => 'pk',
                'generated' => 'native',
            ),
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'address_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'payment_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'delivery_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'weight' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '13,3',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'old_cart_cost' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'cart_cost' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'delivery_cost' => 
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
            'sales_tax' => 
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
            'contract_required' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => true,
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
            'address_id' => 
            array (
                'alias' => 'address_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'address_id' => 
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
            'CartItems' => 
            array (
                'class' => 'WF\\Shop\\Model\\CartItem',
                'local' => 'id',
                'foreign' => 'order_setting_id',
                'owner' => 'foreign',
                'cardinality' => 'many',
            ),
            'Address' => 
            array (
                'class' => 'WF\\\\Profile\\\\Model\\\\Address',
                'local' => 'address_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'Payment' => 
            array (
                'class' => 'msPayment',
                'local' => 'payment_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'Delivery' => 
            array (
                'class' => 'msDelivery',
                'local' => 'delivery_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
        ),
    );

}
