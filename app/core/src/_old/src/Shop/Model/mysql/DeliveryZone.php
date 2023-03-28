<?php
namespace WF\Shop\Model\mysql;

use xPDO\xPDO;

class DeliveryZone extends \WF\Shop\Model\DeliveryZone
{

    public static $metaMap = array (
        'package' => 'WF\\Shop\\Model',
        'version' => '3.0',
        'table' => 'delivery_zones',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'name' => '',
            'description' => '',
            'distanceof' => 0.0,
            'distanceup' => 0.0,
            'polygon' => 0,
            'polygon_coords' => '[]',
            'polygon_options' => '[]',
            'polygon_properties' => '[]',
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
            'distanceof' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'distanceup' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,2',
                'phptype' => 'float',
                'null' => true,
                'default' => 0.0,
            ),
            'polygon' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => true,
                'default' => 0,
            ),
            'polygon_coords' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '[]',
            ),
            'polygon_options' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '[]',
            ),
            'polygon_properties' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '[]',
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
            'distance' => 
            array (
                'alias' => 'distance',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'distanceof' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                    'distanceup' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'polygon' => 
            array (
                'alias' => 'polygon',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'polygon' => 
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
            'Cars' => 
            array (
                'class' => 'WF\\Shop\\Model\\DeliveryCarZone',
                'local' => 'id',
                'foreign' => 'zone_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
    );

}
