<?php

$wfTools = $modx->services->get('wf_tools');
$validator = $wfTools->loadValidator();

$validation = $scriptProperties['validation'] ?: [];
if (!$validator->validate($_POST, $validation)) {
    
}

return '';