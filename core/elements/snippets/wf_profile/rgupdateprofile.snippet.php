<?php
$mProfile = new Package\mProfile($modx, $scriptProperties);
if (!$mProfile->initialize('web')) {
    return 'not initialized';
}

$tpl = $scriptProperties['tpl'] ?? '';
$profile = $mProfile->toArray($modx->user->getOne('Profile'), 'extended');

$profile['phones'] = [
    [
        'number' => '+79070012231',
        'text' => '+7 (907) 001 2231'
    ],
    [
        'number' => '+79050012234',
        'text' => '+7 (905) 001 2234'
    ],
    [
        'number' => '+79000012233',
        'text' => '+7 (900) 001 2233'
    ]
];

$profile['phone'] = $profile['phones'][0];

if (empty($profile['type'])) {
    $profile['type'] = $modx->getOption('_mprofile.profile_type_default');
}

$pls = [
    'hash' => $mProfile->config['hash'],
    'profile' => $profile
];

$output = '';
if (!empty($tpl)) {
    $output = $mProfile->getChunk($tpl, $pls);
}

return $output;