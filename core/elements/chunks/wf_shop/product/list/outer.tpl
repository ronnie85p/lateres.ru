<style>
    .btn-icon {
        border: none!important; 
        background: transparent!important; 
        padding: 5px!important; 
        border-radius: 3px!important;
    }
    .btn-icon:hover {
        outline: 1px solid #f5f5f5!important;
        background: #f6f6f6!important
    }
    .btn-icon:active {
        outline: 1px solid #f5f5f5!important;
        background: #f6f6f6!important
    }
</style>

<div class="row">
    <div class="col-4 form-group">
        {'!pdoMenu' | snippet : [
            'parents' => '103',
            'level' => 1,
            'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
            'tplOuter' => '@INLINE 
                <select class="form-control" name="category">
                    <option value="">Все категории</option>
                    {$wrapper}
                </select>
            '
        ]}
    </div>
    <div class="col-8 form-group">
        <input class="form-control" name="query" value="" placeholder="Искать...">
    </div>
</div>

<hr class="margin-bottom-2x mt-2">

<div class="xpage">
    <div class="rows">
        {$output}
    </div>

    <hr class="margin-top-2x mb-4">

    <div class="pagination d-flex justify-content-center">
        {'page.nav' | placeholder}
    </div>
</div>