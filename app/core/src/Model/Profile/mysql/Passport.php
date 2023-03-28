<?php
namespace App\Model\Profile\mysql;

use xPDO\xPDO;

class Passport extends \App\Model\Profile\Passport
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Profile',
        'version' => '3.0',
        'table' => 'profile_passports',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'user_id' => NULL,
            'gender' => 0,
            'date_of_birth' => NULL,
            'place_of_birth' => '',
            'sitizenship' => '',
            'seria' => '',
            'num' => '',
            'date_issued' => NULL,
            'dep_issued' => '',
            'dep_code' => '',
            'place_of_reg' => '',
        ),
        'fieldMeta' => 
        array (
            'user_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'gender' => 
            array (
                'dbtype' => 'int',
                'precision' => '10',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => true,
                'default' => 0,
            ),
            'date_of_birth' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
            ),
            'place_of_birth' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'sitizenship' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '155',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'seria' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '4',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'num' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '6',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'date_issued' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
            ),
            'dep_issued' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'dep_code' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '10',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'place_of_reg' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
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
        'composites' => 
        array (
            'Files' => 
            array (
                'class' => 'App\\Model\\Profile\\Passport\\File',
                'local' => 'id',
                'foreign' => 'passport_id',
                'cardinality' => 'many',
                'owner' => 'local',
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
        ),
    );

}
