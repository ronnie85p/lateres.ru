<?php
namespace App\Model\Profile;

use xPDO\xPDO;

/**
 * Class Address
 *
 * @property integer $user_id
 * @property integer $rank
 * @property string $title
 * @property string $text
 * @property string $country
 * @property string $index
 * @property string $region
 * @property string $district
 * @property string $city
 * @property string $metro
 * @property string $street
 * @property string $building
 * @property string $room
 * @property string $corpus
 * @property integer $floor
 * @property string $premise
 * @property string $coords
 * @property integer $map_zoom
 * @property string $comment
 * @property array $properties
 * @property string $createdon
 * @property string $updatedon
 *
 * @package App\Model\Profile
 */
class Address extends \xPDO\Om\xPDOSimpleObject
{
}
