<?php
namespace App\Model\Auth;

use xPDO\xPDO;

/**
 * Class Login
 *
 * @property string $id
 * @property integer $user_id
 * @property string $ip
 * @property string $user_agent
 * @property string $timestamp
 * @property array $properties
 *
 * @package App\Model\Auth
 */
class Login extends \xPDO\Om\xPDOSimpleObject
{
}
