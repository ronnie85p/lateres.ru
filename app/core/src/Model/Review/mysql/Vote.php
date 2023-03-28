<?php
namespace App\Model\Review\mysql;

use xPDO\xPDO;

class Vote extends \App\Model\Review\Vote
{

    public static $metaMap = array (
        'package' => 'App\\Model\\Review',
        'version' => '3.0',
        'table' => 'review_votes',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'rating' => 0.0,
        ),
        'fieldMeta' => 
        array (
            'rating' => 
            array (
                'dbtype' => 'decimal',
                'precision' => '12,6',
                'phptype' => 'float',
                'null' => false,
                'default' => 0.0,
            ),
        ),
        'aggregates' => 
        array (
            'Message' => 
            array (
                'class' => 'App\\Model\\Review\\Message',
                'local' => 'id',
                'foreign' => 'vote_id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
