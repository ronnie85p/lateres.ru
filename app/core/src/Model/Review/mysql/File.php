<?php
namespace App\Model\Review\mysql;

use xPDO\xPDO;

class File extends \App\Model\Review\File
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Review',
        'version' => '3.0',
        'table' => 'review_files',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'message_id' => 0,
            'source_id' => 1,
            'name' => '',
            'description' => '',
            'file' => NULL,
            'type' => NULL,
            'size' => NULL,
            'url' => '',
            'hash' => '',
            'orig_hash' => '',
        ),
        'fieldMeta' => 
        array (
            'message_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 0,
            ),
            'source_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
                'default' => 1,
            ),
            'name' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
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
            'file' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
            ),
            'type' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '50',
                'phptype' => 'string',
                'null' => true,
            ),
            'size' => 
            array (
                'dbtype' => 'int',
                'precision' => '255',
                'phptype' => 'integer',
                'null' => true,
            ),
            'url' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'hash' => 
            array (
                'dbtype' => 'char',
                'precision' => '40',
                'phptype' => 'string',
                'null' => true,
                'index' => 'index',
                'default' => '',
            ),
            'orig_hash' => 
            array (
                'dbtype' => 'char',
                'precision' => '40',
                'phptype' => 'string',
                'null' => true,
                'index' => 'index',
                'default' => '',
            ),
        ),
        'indexes' => 
        array (
            'message_id' => 
            array (
                'alias' => 'message_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'message_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'source_id' => 
            array (
                'alias' => 'source_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'source_id' => 
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
            'Message' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'message_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Source' => 
            array (
                'class' => 'MODX\\Revolution\\Sources\\modMediaSource',
                'local' => 'source_d',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
