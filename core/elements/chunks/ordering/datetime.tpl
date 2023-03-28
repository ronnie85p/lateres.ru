<div class="row">
    <div class="col-4 form-group">
        <label for="delivery_datetime">{$label}</label>
        <div class="input-group">
            <input class="form-control w-90" type="date" name="delivery_date" value="{$order.delivery_date}" min="{'Y-m-d' | date}" />
            <select class="form-control" name="delivery_time">
                <option value="">чч:мм</option>
                {foreach $work_times as $time}
                    <option value="{$time}"{if $time == $order.delivery_time} selected{/if}>{$time}</option>  
                {/foreach}
            </select>
        </div>
    </div>
</div>