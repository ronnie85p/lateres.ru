<?php
if (!$modx->services->has('app')) return;
$app = $modx->services->get('app');

switch ($modx->event->name) {
    case 'OnBeforeWebLogin':
        
        $response = $app->runProcessor('web/cart/getList', [
            'all' => true
        ])->getResponse();
        
        $modx->cartItems = $response['results'];
        
        break;
        
    case 'OnWebLogin':
        
        if ($modx->cartItems) {
            foreach ($modx->cartItems as $item) {
                $obj = $modx->newObject(\App\Model\Cart\Item::class);
                if ($obj) {
                    $obj->fromArray([
                        'user_id' => $user->get('id'),
                        'id' => $item['id'],
                        'name' => $item['name'],
                        'product_id' => $item['product_id'],
                        'image' => $item['image'],
                        'count' => $item['count'],
                        'checked' => $item['checked'],
                        'createdon' => time(),
                    ]);
                    $obj->save();
                }
            }
        }
        
        break;
}
return;
