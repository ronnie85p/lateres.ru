{set $cards = [
    [
        'id' => 1,
        'rank' => 0,
        'trust_me' => 1,
        'title' => '',
        'name' => '',
        'number' => '4242424242424242',
        'last4' => '4242',
        'exp_year' => '2023',
        'exp_month' => '07',
        'brand' => 'visa',
        'createdon' => time(),
        'updatedon' => 0
    ],
    [
        'id' => 2,
        'rank' => 1
        'trust_me' => 0,
        'title' => '',
        'name' => '',
        'number' => '4242424242425353',
        'last4' => '5353',
        'exp_year' => '2022',
        'exp_month' => '11',
        'brand' => 'mastercard',
        'createdon' => time(),
        'updatedon' => 0
    ],
    [
        'id' => 3,
        'rank' => 2
        'trust_me' => 0,
        'title' => '',
        'name' => '',
        'number' => '4242424242427373',
        'last4' => '7373',
        'exp_year' => '2022',
        'exp_month' => '10',
        'brand' => 'mir',
        'createdon' => time(),
        'updatedon' => 0
    ],
    [
        'id' => 4,
        'rank' => 3
        'trust_me' => 0,
        'title' => '',
        'name' => '',
        'number' => '4242424242428383',
        'last4' => '8383',
        'exp_year' => '2022',
        'exp_month' => '9',
        'brand' => 'maestro',
        'createdon' => time(),
        'updatedon' => 0
    ]
]}

{set $curr_time = time()}
{set $curr_year = $curr_time | date : 'Y'}

{if $cards}

    
    <form class="">

        <a href="{91 | url}" class="btn btn-outline-secondary"><i class="icon-plus"></i> Добавить адрес</a>

    </form>

    <hr class="mt-2 margin-bottom-2x">

    <div class="row">

        {foreach $cards as $card}
            {set $timestamp = strtotime($card.exp_month ~ '/31/' ~ $card.exp_year)}
            {set $expired = $timestamp < $curr_time}
            {set $year = $card.exp_year != $curr_year ? $card.exp_year : ''}
            {set $month = (strtotime(($card.exp_month+2) ~ ' month') | date : 'F')}

            <div class="col-12 col-md-6 mb-4">

                <div class="card">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-6 text-lg">
                                {$card.brand | upper}&nbsp;&nbsp; - &bull;&bull;&bull;&bull; {$card.last4}
                            </div>
                            <div class="col-6 text-end text-sm">
                                {if !$expired}
                                    <span class="">Действует до <span class="{!$year ? ' text-warning' : ' text-secondary'}">{$month} {$card.exp_year}</span></span>
                                {else}
                                    <span class="text-danger">Истёк</span>
                                {/if}
                            </div>
                        </div>
                        <div class="">
                            <div class="custom-control custom-checkbox">
                                <input class="custom-control-input" type="checkbox" id="ex-trustme-{$card.id}" {$card.trust_me ? ' checked' : ''}{$expired ? ' disabled' : ''}>
                                <label class="custom-control-label" for="ex-trustme-{$card.id}">Доверять сайту</label>
                            </div>
                        </div>
                        <hr class="mt-1 mb-4">
                        <div class="">
                            {if !$expired}
                                {if $card.rank > 0}
                                    <a href="">По умолчанию</a>
                                {else}
                                    <span class="text-warning">По умолчанию</span>
                                {/if}
                            {/if}
                            <a class="float-end" href="">Удалить</a>
                        </div>
                    </div>
                </div>

            </div>
        {/foreach}

    </div>

{else}

    <div class="text-center">
        <p class="text-lg d-flex align-items-center justify-content-center alert alert-info">
            <i class="icon-truck_" style="font-size: 1.5em"></i>&nbsp;У Вас еще нет добавленных карт
        </p>
        <hr class="my-4">
        <a href="{91 | url}" class="btn btn-outline-secondary"><i class="icon-plus"></i> Добавить карту</a>
    </div>

{/if}