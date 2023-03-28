{set $addresses = [
    [
        'id' => 1,
        'rank' => 0,
        'title' => 'My address 1',
        'receiver' => '',
        'phone' => '',
        'country' => 'Россия',
        'index' => '111111',
        'region' => 'Московская область',
        'metro' => '',
        'city' => 'Солнечногорск',
        'street' => 'ул Баранова',
        'building' => '1',
        'room' => '',
        'comment' => '',
        'properties' => []
    ],
    [
        'id' => 2,
        'rank' => 1,
        'title' => 'My address 2',
        'receiver' => '',
        'phone' => '',
        'country' => 'Россия',
        'index' => '111122',
        'region' => 'Московская область',
        'metro' => '',
        'city' => 'Москва',
        'street' => 'ул Троицкая',
        'building' => '',
        'room' => '12',
        'comment' => '',
        'properties' => []
    ],
    [
        'id' => 3,
        'rank' => 2,
        'title' => 'My address 3',
        'receiver' => '',
        'phone' => '',
        'country' => 'Россия',
        'index' => '111333',
        'region' => 'Московская область',
        'metro' => '',
        'city' => 'Мытищи',
        'street' => 'ул Кутузова',
        'building' => '23',
        'room' => '',
        'comment' => '',
        'properties' => []
    ],
    [
        'id' => 4,
        'rank' => 3,
        'title' => 'My address 4',
        'receiver' => '',
        'phone' => '',
        'country' => 'Россия',
        'index' => '114444',
        'region' => 'Московская область',
        'metro' => '',
        'city' => 'Зеленогорск',
        'street' => 'ул Мира',
        'building' => '34',
        'room' => '',
        'comment' => '',
        'properties' => []
    ],
]}

{set $addresses_ = []}

<style>
    .custom-radio-fs-2 .custom-control-label {
        font-size: 1.2em!important
    }
    .custom-radio-fs-2 .custom-control-label::before {
        top: 4px!important;
    }
    .custom-radio-fs-2 .custom-control-label::after {
        top: 4px!important;
    }
</style>


{if $addresses}

    <form class="">

        <a href="{98 | url}" class="btn btn-outline-secondary"><i class="icon-plus"></i> Добавить адрес</a>

    </form>

    <hr class="mt-2 margin-bottom-2x">

    <div class="row">
        {foreach $addresses as $addr}

            <div class="col-4">
                <div class="card mb-4 mr-4">
                    <div class="card-header bg-white">
                        <h6 class="card-title">{$addr.title}</h6>
                    </div>
                    <div class="card-body">
                        <div class="">
                            <i class="icon-map-pin"></i> {$addr.index}, {$addr.region}, {$addr.city}, {$addr.street}, {$addr.building}
                        </div>
                        <div class="">
                                
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        {if $addr.rank > 0}
                            <a class="close text-sm" href="">По умолчанию</a>
                        {else}
                            <span class="text-warning">По умолчанию</span>
                        {/if} 
                        <a class="close text-sm" href="">Удалить</a>
                    </div>
                </div>
            </div>

        {/foreach}
    </div>

{else}

    <div class="text-center">
        <p class="text-lg d-flex align-items-center justify-content-center alert alert-info">
            <i class="icon-truck_" style="font-size: 1.5em"></i>&nbsp;У Вас еще нет добавленных адресов
        </p>
        <hr class="my-4">
        <a href="{98 | url}" class="btn btn-outline-secondary"><i class="icon-plus"></i> Добавить адрес</a>
    </div>
    
{/if}

