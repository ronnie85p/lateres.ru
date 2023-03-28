<?php
namespace App\Model\Profile\mysql;

use xPDO\xPDO;

class CreditCard extends \App\Model\Profile\CreditCard
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Profile',
        'version' => '3.0',
        'table' => 'profile_credit_cards',
        'extends' => 'xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'user_id' => NULL,
            'title' => '',
            'name' => '',
            'exp_month' => '',
            'exp_year' => '',
            'brand' => '',
            'country' => '',
            'funding' => '',
            'last4' => '',
            'rank' => 0,
            'trust_me' => 0,
            'comment' => '',
            'properties' => '{}',
            'createdon' => NULL,
            'updatedon' => NULL,
        ),
        'fieldMeta' => 
        array (
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'attributes' => 'unsigned',
                'phptype' => 'integer',
                'null' => false,
            ),
            'title' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'name' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'exp_month' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '2',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'exp_year' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '4',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'brand' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '20',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'country' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'funding' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'last4' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '4',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'rank' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => true,
                'default' => 0,
            ),
            'trust_me' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => true,
                'default' => 0,
            ),
            'comment' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
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
            'updatedon' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
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
        ),
        'aggregates' => 
        array (
            'User' => 
            array (
                'class' => 'modUser',
                'local' => 'user_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
            'UserProfile' => 
            array (
                'class' => 'modUserProfile',
                'local' => 'user_id',
                'foreign' => 'internalKey',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
