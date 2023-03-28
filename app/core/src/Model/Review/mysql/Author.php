<?php
namespace App\Model\Review\mysql;

use xPDO\xPDO;

class Author extends \App\Model\Review\Author
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Review',
        'version' => '3.0',
        'table' => 'review_authors',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'user_id' => 0,
            'fullname' => '',
            'email' => '',
            'mobilephone' => '',
            'ip' => '',
            'user_agent' => '',
            'ssid' => '',
        ),
        'fieldMeta' => 
        array (
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'fullname' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'email' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'mobilephone' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'ip' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '46',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'user_agent' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'ssid' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '128',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
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
        ),
        'aggregates' => 
        array (
            'User' => 
            array (
                'class' => 'MODX\\Revolution\\modUser',
                'local' => 'user_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'UserProfile' => 
            array (
                'class' => 'MODX\\Revolution\\modUserProfile',
                'local' => 'user_id',
                'foreign' => 'internalKey',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Messages' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'id',
                'foreign' => 'author_id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Answers' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'id',
                'foreign' => 'reply_author_id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
