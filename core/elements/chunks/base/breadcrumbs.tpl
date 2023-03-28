<div class="page-title">
  <div class="container">
    <div class="column">{if $_modx->resource.class_key == 'msProduct'}<h2>{$_modx->resource.pagetitle}</h2>{else}<h1>{$_modx->resource.pagetitle}</h1>{/if}</div>
{set $breadcrumbs = $_modx->runSnippet('pdoCrumbs', [
        'limit'          => 9,
        'showHome'       => 1,
        'tpl'            => '@INLINE <li><a href="{$link}">{$menutitle}</a></li><li class="separator">&nbsp;</li>',
        'tplCurrent'     => '@INLINE <li class="active">{$pagetitle}</li>',
        'tplHome'        => '@INLINE <li><a href="{$link}">{$menutitle}</a></li><li class="separator">&nbsp;</li>',
        'tplWrapper'     => '@INLINE <div class="column"><ul class="breadcrumbs">{$output}</ul></div>',
        'tplMax'         => '@INLINE <span>&nbsp;...&nbsp;</span>'
])}
    {$breadcrumbs}
  </div>
</div>