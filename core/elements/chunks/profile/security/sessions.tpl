{set $login_sessions = [
    [
        'id' => 1,
        'active' => 1,
        'session_id' => '',
        'timestamp' => time(),
        'ip' => '456.558.123.140',
        'client' => [],
        'location' => []
    ],
    [
        'id' => 2,
        'active' => 1,
        'session_id' => '',
        'timestamp' => time(),
        'ip' => '456.558.123.145',
        'client' => [],
        'location' => []
    ],
    [
        'id' => 3,
        'active' => 1,
        'session_id' => '',
        'timestamp' => time(),
        'ip' => '456.558.123.148',
        'client' => [],
        'location' => []
    ]
]}

<style>
    #mlgn-sessions .session-row:not(.active) {
        color: silver
    }
    #mlgn-sessions .session-row.active {
        font-weight: 800
    }
</style>

<div class="table-responsive" id="mlgn-sessions">
  <table class="table table-bordered" role="table">
    <thead>
    	<tr>
    	   <th class="text-center">IP</th>
    	   <th class="text-center">Устройство</th>
    	   <th class="text-center">Местоположение</th>
    	   <th class="text-center">Последний вход</th>
    	</tr>
    </thead>
    <tbody>
 
    {foreach $login_sessions as $session}
  
        <tr class="session-row{$session.active ? ' active' : ''}" data-session-id="{$session.id}">
            
            <td class="text-center">{$session.ip}</td>
            <td class="text-center">{$session.client.browser} / {$session.client.platform}</td>
            <td class="text-center">{$session.location.country.name} / {$session.location.city.name}</td> 
            <td class="text-center">{$session.timestamp | date : 'd.m.Y H:i'}</td>
            <td class="text-center d-none">

                {if $state == 'active'}
                    <a href="javascript:" class="ulgn-btn" data-params="'action': 'session/destroy', 'ssid': '{$session_id}', 'hash': '{$hash}'" data-context=".ulogin-sessions" data-target=".ulogin-sessions">Завершить</a>    
                {elseif $state == 'inactive'}
                    <span class="text-muted">Завершена</span>
                {elseif $state == 'current'}
                    <span class="">Активная</span>
                {/if}
                  
            </td>
        </tr>
        
    {/foreach}

    </tbody>
  </table>
  
</div>
  
<div class="row">
  <div class="col-md-12">
    <button class="btn btn-secondary type="button">Завершить все сессии</button>
  </div>
</div>