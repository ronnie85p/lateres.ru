<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class Company
 *
 * @property integer $user_id
 * @property integer $rank
 * @property string $name
 * @property string $inn
 * @property string $ogrn
 * @property string $kpp
 * @property string $phone
 * @property integer $address_required
 * @property string $address_text
 * @property string $address_country
 * @property string $address_region
 * @property string $address_city
 * @property string $address_index
 * @property string $address_street
 * @property string $address_building
 * @property string $address_room
 * @property string $address_corpus
 * @property string $address_floor
 * @property string $address_premise
 * @property string $comment
 * @property array $properties
 * @property string $createdon
 * @property string $updatedon
 *
 * @package App\Model\Profile
 */
class Company extends \xPDO\Om\xPDOSimpleObject
{
}
