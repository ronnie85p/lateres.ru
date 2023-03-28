<?php
namespace App\Model\Profile\Passport\mysql;

use xPDO\xPDO;

class File extends \App\Model\Profile\Passport\File
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Profile',
        'version' => '3.0',
        'table' => 'profile_passport_files',
        'extends' => 'xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'id' => NULL,
            'passport_id' => NULL,
            'source_id' => NULL,
            'parent_id' => 0,
            'name' => '',
            'description' => '',
            'path' => NULL,
            'file' => NULL,
            'type' => '',
            'size' => 0,
            'rank' => 0,
            'url' => '',
            'hash' => '',
            'orig_hash' => '',
            'properties' => '{}',
            'createdon' => NULL,
            'createdby' => NULL,
            'updatedon' => NULL,
            'updatedby' => NULL,
            'deleted' => 0,
            'deletedon' => NULL,
            'deletedby' => NULL,
        ),
        'fieldMeta' => 
        array (
            'id' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '191',
                'phptype' => 'string',
                'null' => true,
            ),
            'passport_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'source_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'parent_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
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
            'path' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
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
                'default' => '',
            ),
            'size' => 
            array (
                'dbtype' => 'int',
                'precision' => '255',
                'phptype' => 'integer',
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
            'createdby' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
            ),
            'updatedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'updatedby' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
            ),
            'deleted' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
            'deletedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'deletedby' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => true,
            ),
        ),
        'indexes' => 
        array (
            'passport_id' => 
            array (
                'alias' => 'passport_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'passport_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'parent_id' => 
            array (
                'alias' => 'parent_Id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'parent_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'type' => 
            array (
                'alias' => 'type',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'type' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'hash' => 
            array (
                'alias' => 'hash',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'hash' => 
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
            'Passport' => 
            array (
                'class' => 'App\\Model\\Profile\\Passport',
                'local' => 'passport_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
        'aggregates' => 
        array (
            'Parent' => 
            array (
                'class' => 'App\\Model\\Profile\\Passport\\File',
                'local' => 'parent_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Children' => 
            array (
                'class' => 'App\\Model\\Profile\\Passport\\File',
                'local' => 'id',
                'foreign' => 'parent_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
            'Source' => 
            array (
                'class' => 'MODX\\Revolution\\Sources\\modMediaSource',
                'local' => 'source_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
