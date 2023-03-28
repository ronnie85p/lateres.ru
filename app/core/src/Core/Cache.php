<?php
use App;

class Cache extends \App\Core
{
    function __construct(modX &$modx, array $config = []) 
    {

    }
}

// use App\Core;

// use MODX\Revolution\modX;

// class Cache extends \App\Core
// {
//     function __construct(modX &$modx, array $config = [])
//     {
//         parent :: __construct($modx, $config);
//     }

//     public function get(string $cacheKey, string $key)
//     {
//         $options = [
//             \xPDO::OPT_CACHE_KEY => $cacheKey
//         ];

//         return $this->modx->cacheManager->get($key, $options); 
//     }

//     public function set(string $cacheKey, string $key, $data, $lifetime = 0)
//     {
//         $options = [
//             \xPDO::OPT_CACHE_KEY => $cacheKey
//         ];

//         return $this->modx->cacheManager->set($key, $data, $lifetime, $options);    
//     }
// }