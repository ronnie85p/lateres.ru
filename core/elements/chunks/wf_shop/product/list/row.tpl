{set $category = $parent | resource : 'parent'}

<div class="row mb-2">
    <div class="col-2">
        <img class="thumbnail-img" src="{$img}" style="width: 100%; height: 50px" />
    </div>
    <div class="col-7">
        <div class="text-secondary mb-2">
            <a class="text-secondary" href="{$category | url}">{$category | resource : 'pagetitle'}</a> / <a class="text-secondary" href="{$parent | url}">{$parent | resource : 'pagetitle'}</a>
        </div>
        <div class="text-lg"><a class="" href="{$id | url}" target="blanc_" style="color: #2263a7!important">{$pagetitle}</a></div>
        <div class="text-muted mb-2">{$description}</div>
        <div class=""><a class="mr-4" href="#">Редактировать</a></div>
    </div>
    <div class="col-3 dropdown dropstart">
        <div class="mb-2">
            Цена
        </div>
        {$price}
        <button class="float-right icon-more-vertical btn-icon" data-bs-toggle="dropdown"></button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="#"><i class="icon-dollar-sign"></i> Изменить цену</a>
            <a class="dropdown-item" href="#"><i class="icon-percent"></i> Учет баланса</a>
            {if $published}
                <a class="dropdown-item" href="#"><i class="icon-eye-off"></i> Снять с продажи</a>
            {else} 
                <a class="dropdown-item" href="#"><i class="icon-eye"></i> Вернуть в продажу</a>
            {/if}
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger" href="#"><i class="icon-trash-2"></i> Удалить</a>
        </div>
    </div>
</div>

<hr class="my-4">