<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class Messenger
 *
 * @property string $phone_id
 * @property string $name
 * @property string $icon
 * @property string $url
 * @property array $properties
 *
 * @property \App\Model\Profile\Phone $Phone
 *
 * @package App\Model\Profile
 */
class Messenger extends \xPDO\Om\xPDOSimpleObject
{
}
