<?php
namespace App\Model\Review;

use xPDO\xPDO;

/**
 * Class Action
 *
 * @property integer $user_id
 * @property integer $message_id
 * @property integer $like_or_dislike
 * @property string $ip
 * @property string $ssid
 * @property string $user_agent
 *
 * @package App\Model\Review
 */
class Action extends \xPDO\Om\xPDOSimpleObject
{
}
