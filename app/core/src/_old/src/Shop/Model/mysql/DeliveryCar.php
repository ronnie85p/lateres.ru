<?php
namespace WF\Shop\Model\mysql;

use xPDO\xPDO;

class DeliveryCar extends \WF\Shop\Model\DeliveryCar
{

    public static $metaMap = array (
        'package' => 'WF\\Shop\\Model',
        'version' => '3.0',
        'table' => 'delivery_cars',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'name' => '',
            'description' => '',
            'image' => '',
            'weight' => 0.0,
            'length' => 0.0,
            'active' => 1,
        ),
        'fieldMeta' => 
        array (
            'name' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'description' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'image' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '500',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'weight' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => false,
                'default' => 0.0,
            ),
            'length' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => false,
                'default' => 0.0,
            ),
            'active' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => true,
                'default' => 1,
            ),
        ),
        'indexes' => 
        array (
            'name' => 
            array (
                'alias' => 'name',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'name' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'length' => 
            array (
                'alias' => 'length',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'length' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'active' => 
            array (
                'alias' => 'active',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'active' => 
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
            'Zones' => 
            array (
                'class' => 'WF\\Shop\\Model\\DeliveryCarZone',
                'local' => 'id',
                'foreign' => 'car_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );

}
