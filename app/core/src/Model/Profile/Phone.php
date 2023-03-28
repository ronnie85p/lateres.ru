<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class Phone
 *
 * @property string $id
 * @property integer $user_id
 * @property integer $rank
 * @property integer $is_default
 * @property string $createdon
 * @property string $text
 * @property string $country_code
 * @property string $comment
 * @property array $properties
 *
 * @property \App\Model\Profile\Messenger[] $Messengers
 *
 * @package App\Model\Profile
 */
class Phone extends \xPDO\Om\xPDOSimpleObject
{
}
