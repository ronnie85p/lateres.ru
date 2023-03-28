<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class CreditCard
 *
 * @property integer $user_id
 * @property string $title
 * @property string $name
 * @property string $exp_month
 * @property string $exp_year
 * @property string $brand
 * @property string $country
 * @property string $funding
 * @property string $last4
 * @property integer $rank
 * @property integer $trust_me
 * @property string $comment
 * @property array $properties
 * @property string $createdon
 * @property string $updatedon
 *
 * @package App\Model\Profile
 */
class CreditCard extends \xPDOSimpleObject
{
}
