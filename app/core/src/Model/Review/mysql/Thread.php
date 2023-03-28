<?php
namespace App\Model\Review\mysql;

use xPDO\xPDO;

class Thread extends \App\Model\Review\Thread
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Review',
        'version' => '3.0',
        'table' => 'review_threads',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'resource_id' => 0,
            'rating' => 0.0,
            'rating_wilson' => 0.0,
            'messages' => 0,
            'properties' => NULL,
        ),
        'fieldMeta' => 
        array (
            'resource_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'rating' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,6',
                'phptype' => 'float',
                'null' => false,
                'default' => 0.0,
            ),
            'rating_wilson' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,6',
                'phptype' => 'float',
                'null' => false,
                'default' => 0.0,
            ),
            'messages' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
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
            'resource_id' => 
            array (
                'alias' => 'resource_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'resource_id' => 
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
            'Messages' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'id',
                'foreign' => 'thread_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
        'aggregates' => 
        array (
            'Resource' => 
            array (
                'class' => 'MODX\\Revolution\\modResource',
                'local' => 'resource_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
