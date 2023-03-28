<?php  return '
$templateCacheable = false;

switch ($modx->event->name) {
    
    case \'OnHandleRequest\':


        break;
    
    case \'OnLoadWebDocument\':
        
        if ($baseElement = $modx->resource->getOne(\'Template\')) {
            $baseElement->setCacheable($templateCacheable);
            if ($baseElement->process()) {
                $modx->resource->_content = $baseElement->_output;
                $modx->resource->_processed = true;
            }
        }
        
        break;
    
}
return;
';