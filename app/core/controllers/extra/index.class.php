<?php

namespace App\Controllers\Extra;

require_once dirname(__DIR__, 2) . '/src/Controllers/WebController.php';

use App\Controllers\WebController;

class ExtraWebController extends WebController
{
    public function initialize()
    {
        return true;
    }
}

return ExtraWebController::class;