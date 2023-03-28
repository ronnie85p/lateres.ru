<?php
namespace WF\Shop\Model\mysql;

use xPDO\xPDO;

class OrderPaymentStatus extends \WF\Shop\Model\OrderPaymentStatus
{

    public static $metaMap = array (
        'package' => 'WF\\Shop\\Model',
        'version' => '3.0',
        'table' => 'shop_order_payment_statuses',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'id' => NULL,
            'order_id' => NULL,
            'payment_status_id' => NULL,
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
            'order_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'payment_status_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
        ),
        'indexes' => 
        array (
            'order_id' => 
            array (
                'alias' => 'order_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'order_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'payment_status_id' => 
            array (
                'alias' => 'payment_status_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'payment_status_id' => 
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
            'Order' => 
            array (
                'class' => 'msOrder',
                'local' => 'order_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
            'PaymentStatus' => 
            array (
                'class' => 'WF\\Shop\\Model\\PaymentStatus',
                'local' => 'order_id',
                'foreign' => 'id',
                'owner' => 'foreign',
                'cardinality' => 'one',
            ),
        ),
    );

}
