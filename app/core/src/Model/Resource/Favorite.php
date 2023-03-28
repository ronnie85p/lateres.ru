<?php
namespace App\Model\Resource;

use xPDO\xPDO;

/**
 * Class Favorite
 *
 * @property integer $user_id
 * @property integer $resource_id
 * @property string $timestamp
 * @property array $properties
 *
 * @package App\Model\Resource
 */
class Favorite extends \xPDO\Om\xPDOSimpleObject
{
}
