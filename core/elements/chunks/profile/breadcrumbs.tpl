{'pdoCrumbs' | snippet : [
    'limit'      => 9,
    'showHome'   => 1,
    'tpl'        => '@INLINE <li><a href="{$link}">{$menutitle}</a></li><li class="separator">&nbsp;</li>',
    'tplCurrent' => '@INLINE <li class="active">{$pagetitle}</li>',
    'tplWrapper' => '@INLINE <div class="column mb-4"><ul class="breadcrumbs text-start ml-2">{$output}</ul></div>',
    'tplMax'     => '@INLINE <span>&nbsp;...&nbsp;</span>'
]}