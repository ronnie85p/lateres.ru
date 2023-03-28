<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class Passport
 *
 * @property integer $user_id
 * @property integer $gender
 * @property string $date_of_birth
 * @property string $place_of_birth
 * @property string $sitizenship
 * @property string $seria
 * @property string $num
 * @property string $date_issued
 * @property string $dep_issued
 * @property string $dep_code
 * @property string $place_of_reg
 *
 * @property \App\Model\Profile\Passport\File[] $Files
 *
 * @package App\Model\Profile
 */
class Passport extends \xPDO\Om\xPDOSimpleObject
{
}
