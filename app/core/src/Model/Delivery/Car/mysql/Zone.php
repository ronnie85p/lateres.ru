<?php
namespace App\Model\Delivery\Car\mysql;

use xPDO\xPDO;

class Zone extends \App\Model\Delivery\Car\Zone
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Delivery',
        'version' => '3.0',
        'table' => 'delivery_car_zones',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'car_id' => NULL,
            'zone_id' => NULL,
            'price' => 0.0,
            'fixprice' => 0.0,
            'minprice' => 0.0,
            'maxprice' => 0.0,
            'freefrom' => 0.0,
            'notprice' => 0,
            'rank' => 0,
        ),
        'fieldMeta' => 
        array (
            'car_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'zone_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'price' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'fixprice' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'minprice' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'maxprice' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'freefrom' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'notprice' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => true,
                'default' => 0,
            ),
            'rank' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
        ),
        'indexes' => 
        array (
            'car_id' => 
            array (
                'alias' => 'car_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'car_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'zone_id' => 
            array (
                'alias' => 'zone_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'zone_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'price' => 
            array (
                'alias' => 'price',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'price' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'fixprice' => 
            array (
                'alias' => 'fixprice',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'fixprice' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'minprice' => 
            array (
                'alias' => 'minprice',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'minprice' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'maxprice' => 
            array (
                'alias' => 'maxprice',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'maxprice' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'freefrom' => 
            array (
                'alias' => 'freefrom',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'freefrom' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'notprice' => 
            array (
                'alias' => 'notprice',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'notprice' => 
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
            'Car' => 
            array (
                'class' => 'App\\Model\\Delivery\\Car',
                'local' => 'car_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Zone' => 
            array (
                'class' => 'App\\Model\\Delivery\\Zone',
                'local' => 'zone_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
