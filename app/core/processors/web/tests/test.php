<?php

        // $this->runTestProcessor('review/send', [
        //     'resource_id' => 183,
        //     'rating' => 4,
        //     'message' => 'The test review'
        // ]);    
        
        // $this->runTestProcessor('review/getList', ['resource_id' => 183]);
        // $this->runTestProcessor('review/message/setAction', ['message_id' => 5, 'dislike' => 1]);

        // $this->runTestProcessor('profile/address/create', [
        //     // 'title' => 'Address',
        //     'text' => '',
        //     'country' => 'Russia',
        //     'index' => '',
        //     'region' => 'Moskow reg',
        //     'city' => 'Moskow',
        //     'metro' => '',
        //     'street' => 'Tro',
        //     'building' => '2',
        //     'room' => '',
        //     'corpus' => '',
        //     'floor' => '',
        //     'premise' => '',
        //     'coords' => '',
        //     'map_zoom' => '',
        // ]);

        // $this->runTestProcessor('profile/address/update', [
        //     'id' => 1,
        //     'title' => 'Address',
        //     'text' => '',
        //     'country' => 'Russia',
        //     'index' => '',
        //     'region' => 'Moskow reg',
        //     'city' => 'Moskow',
        //     'metro' => '',
        //     'street' => 'Tro',
        //     'building' => '204',
        //     'room' => '',
        //     'corpus' => '',
        //     'floor' => '',
        //     'premise' => '',
        //     'coords' => '',
        //     'map_zoom' => '',
        // ]);

        // $this->runTestProcessor('profile/address/remove', ['id' => 1]);
        // $this->runTestProcessor('profile/address/getList', []);
        // $this->runTestProcessor('profile/address/get', ['id' => 2]);

        // $this->runTestProcessor('profile/company/create', [
        //     'name' => 'OOO Partner2',
        //     'ogrn' => '2343434',
        //     'inn' => '234324343',
        //     'kpp' => '2343434',
        //     'phone' => '+34543354',
        //     'address_text' => '',
        //     'address_country' => 'Russia',
        //     'address_index' => '345454',
        //     'address_region' => 'Moskow reg',
        //     'address_city' => 'Moskow',
        //     'address_street' => 'Troy',
        //     'address_building' => '2',
        //     'address_room' => '2',
        //     'address_corpus' => '23',
        //     'address_floor' => 3,
        //     'address_premise' => '5',
        // ]);

        // $this->runTestProcessor('profile/company/update', [
        //     'id' => 1,
        //     'name' => 'OOO Partner',
        //     'ogrn' => '2343434',
        //     'inn' => '234324343',
        //     'kpp' => '2343434',
        //     'phone' => '+34543354',
        //     'address_required' => 0,
        //     'address_text' => '',
        //     'address_country' => 'Russia',
        //     'address_index' => '345454',
        //     'address_region' => 'Moskow reg',
        //     'address_city' => 'Moskow',
        //     'address_street' => 'Troy',
        //     'address_building' => '2',
        //     'address_room' => '2',
        //     'address_corpus' => '23',
        //     'address_floor' => 3,
        //     'address_premise' => '5',
        // ]);

        // $this->runTestProcessor('profile/company/getList');
        // $this->runTestProcessor('profile/company/remove', ['id' => 1]);

        // $this->runTestProcessor('profile/phone/create', [
        //     'phone' => '+7 (230) 483 89-40'
        // ]);

        // $this->runTestProcessor('profile/phone/remove', ['id' => '+72304838940']);

        // $this->runTestProcessor('favorite/create', ['resource_id' => 184]);
        // $this->runTestProcessor('favorite/remove', ['id' => 1]);
        // $this->runTestProcessor('favorite/getList', []);

        // $this->runTestProcessor('comparison/create', ['resource_id' => 184]);
        // $this->runTestProcessor('comparison/remove', ['id' => 1]);
        // $this->runTestProcessor('comparison/getList', []);

        // $this->runTestProcessor('cart/add', [ 'product_id' => 183 ]);
        // $this->runTestProcessor('cart/add', [ 'product_id' => 184 ]);
        // $this->runTestProcessor('cart/add', [ 'product_id' => 129 ]);
        // $this->runTestProcessor('cart/update', [ 'key' => '036b2bf0f28c0da63f4ef6ed16a97fc1', 'count' => 20 ]);
        // $this->runTestProcessor('cart/remove', [ 'key' => '036b2bf0f28c0da63f4ef6ed16a97fc1' ]);
        // $this->runTestProcessor('cart/clear', [  ]);
        // $this->runTestProcessor('cart/getList', [  ]);
        // $this->runTestProcessor('cart/getTotal', [  ]);

        // $this->runProcessor('auth/login', [
        //     // For password forgot
        //     // 'username' => 'romagifted@gmail.com',
        //     'username' => 'lateres_ru',

        //     // For password reset
        //     'token' => '43046e1c5f86fc7ff7e6a09462b8cca4',
        //     'password' => '12345678',
        //     'password_again' => '12345678',

        //     // For code send
        //     'email' => 'romagifted@gmail.com',

        //     // For code verify
        //     'key' => 'a73d2e7cd9313c51c95875ed5c675f42',
        //     'code' => 957235,

        //     // For register
        //     'fullname' => '',
        //     'mobilephone' => '',
        //     'email' => '',
        //     'agreed' => 1,
        //     'generate_password' => 1,
        //     'password' => '',
        //     'password_again' => ''
        // ]);

        // Register
        // $this->runProcessor('auth/register', [
        //     'fullname' => 'firstname            midname               lastname',
        //     'mobilephone' => '+7 (943)_     903_23-43   ',
        //     // 'email' => 'romagifted@gmail.com',
        //     // 'username' => 'lateres_ru',
        //     'agreed' => 1,
        //     'generate_password' => 1,
        //     'password' => '',
        //     'password_again' => ''
        // ]);