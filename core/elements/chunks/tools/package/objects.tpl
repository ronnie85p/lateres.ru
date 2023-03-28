{* {$objects | print} *}

{if $objects}

    <input type="hidden" name="package" value="{$package}" />

    <div class="row">
        
        {foreach $objects as $object}
            <div class="col-4">
                <div class="custom-control custom-checkbox">
                    <input 
                        class="custom-control-input{$object['table_exists'] ? ' text-dark created' : ' text-muted'}" 
                        type="checkbox" name="classes[]" value="{$object['class']}" 
                        id="ex-class-{$object['class']}" 
                        checked>
                    <label class="custom-control-label" for="ex-class-{$object['class']}">{$object['class']}</label>
                </div>
            </div>
        {/foreach}
    
    </div>

{/if}