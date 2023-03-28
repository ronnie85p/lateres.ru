<?php
namespace App\Model\Review\mysql;

use xPDO\xPDO;

class Message extends \App\Model\Review\Message
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Review',
        'version' => '3.0',
        'table' => 'review_messages',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'thread_id' => 0,
            'vote_id' => 0,
            'author_id' => 0,
            'reply_author_id' => 0,
            'subject' => '',
            'text' => '',
            'likes' => 0,
            'dislikes' => 0,
            'datetime' => NULL,
            'notify' => 0,
            'notify_datetime' => NULL,
            'published' => 0,
            'publishedon' => NULL,
            'publishedby' => 0,
            'editedon' => NULL,
            'editedby' => 0,
            'deleted' => 0,
            'deletedon' => NULL,
            'deletedby' => 0,
            'properties' => NULL,
        ),
        'fieldMeta' => 
        array (
            'thread_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 0,
            ),
            'vote_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 0,
            ),
            'author_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'reply_author_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'subject' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'text' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'likes' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 0,
            ),
            'dislikes' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
                'default' => 0,
            ),
            'datetime' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'notify' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'notify_datetime' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'published' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
                'default' => 0,
            ),
            'publishedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'publishedby' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
            'editedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'editedby' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
            'deleted' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
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
            'thread_id' => 
            array (
                'alias' => 'thread_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'thread_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'vote_id' => 
            array (
                'alias' => 'vote_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'vote_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'author_id' => 
            array (
                'alias' => 'author_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'author_id' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'reply_author_id' => 
            array (
                'alias' => 'reply_author_id',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'reply_author_id' => 
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
            'Answers' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'author_id',
                'foreign' => 'reply_author_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
            'Actions' => 
            array (
                'class' => 'App\\Model\\Review\\Actions',
                'local' => 'id',
                'foreign' => 'message_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
            'Files' => 
            array (
                'class' => 'App\\Model\\Review\\File',
                'local' => 'id',
                'foreign' => 'message_id',
                'cardinality' => 'many',
                'owner' => 'local',
            ),
        ),
        'aggregates' => 
        array (
            'Thread' => 
            array (
                'class' => 'App\\Model\\Review\\Thread',
                'local' => 'thread_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Vote' => 
            array (
                'class' => 'App\\Model\\Review\\Vote',
                'local' => 'vote_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'Author' => 
            array (
                'class' => 'App\\Model\\Review\\Author',
                'local' => 'author_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'ReplyAuthor' => 
            array (
                'class' => 'App\\Model\\Review\\Author',
                'local' => 'reply_author_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
