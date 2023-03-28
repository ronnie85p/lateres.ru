<?php
namespace App\Model\Resource;

use xPDO\xPDO;

/**
 * Class Visit
 *
 * @property integer $resource_id
 * @property integer $user_id
 * @property string $ip
 * @property string $ssid
 * @property string $user_agent
 * @property string $timestamp
 * @property array $properties
 *
 * @package App\Model\Resource
 */
class Visit extends \xPDO\Om\xPDOSimpleObject
{
}
