<?php
namespace App\Model\Auth\Login;

use xPDO\xPDO;

/**
 * Class Question
 *
 * @property integer $user_id
 * @property string $text
 * @property string $description
 * @property integer $active
 * @property integer $rank
 * @property array $properties
 *
 * @package App\Model\Auth\Login
 */
class Question extends \xPDO\Om\xPDOSimpleObject
{
}
