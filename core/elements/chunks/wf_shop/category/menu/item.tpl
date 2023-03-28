<li class="list-group-item dropdown dropend">
    <a class="d-flex align-items-center justify-content-between" href="javascript:" data-hover="dropdown">
        <img class="d-none" src="{$img}" />{$menutitle} 
        <i class="icon-chevron-right float-right text-muted" style="font-size: 1.2em"></i>
    </a>
    <div class="dropdown-menu" style="width: 300px; margin: 0; border-radius: 0 5px 5px 0; !important; border: none!important">
        {'!pdoMenu' | snippet : [
            'parents' => $id,
            'level' => 1,
            'tpl' => '@INLINE <li class="list-group-item"><a href="{$id | url}">{$menutitle}</a></li>',
            'tplOuter' => '@INLINE <ul class="list-group">{$wrapper}</ul>'
        ]}
    </div>
</li>