<?php  return array (
  'resourceClass' => 'MODX\\Revolution\\modDocument',
  'resource' => 
  array (
    'id' => 399,
    'type' => 'document',
    'pagetitle' => 'Страница не найдена',
    'longtitle' => 'Страница не найдена!',
    'description' => '',
    'alias' => '404',
    'link_attributes' => '',
    'published' => 1,
    'pub_date' => 0,
    'unpub_date' => 0,
    'parent' => 404,
    'isfolder' => 0,
    'introtext' => '',
    'content' => '<meta http-equiv="refresh_" content="6;URL=[[~5]]">
<section class="fw-section margin-top-3x" style="background-image: url(assets/tpl/web/img/404-bg.png);">
  <h1 class="display-404 text-center">404</h1>
</section>
<div class="container padding-bottom-3x mb-1">
  <div class="text-center">
    <h2>Ооопс... Страница не найдена!</h2>
    <p>Товар не найден или страница была удалена. <a href="/">На Главную</a><br>Или попробуйте через поиск в самом верху страницы.</p>
  </div>
</div>',
    'richtext' => 0,
    'template' => 23,
    'menuindex' => 1,
    'searchable' => 0,
    'cacheable' => 1,
    'createdby' => 1,
    'createdon' => 1672394981,
    'editedby' => 1,
    'editedon' => 1672897983,
    'deleted' => 0,
    'deletedon' => 0,
    'deletedby' => 0,
    'publishedon' => 1672394940,
    'publishedby' => 1,
    'menutitle' => '',
    'donthit' => 0,
    'privateweb' => 0,
    'privatemgr' => 0,
    'content_dispo' => 0,
    'hidemenu' => 0,
    'class_key' => 'MODX\\Revolution\\modDocument',
    'context_key' => 'web',
    'content_type' => 1,
    'uri' => 'error/404',
    'uri_override' => 0,
    'hide_children_in_tree' => 0,
    'show_in_tree' => 1,
    'properties' => NULL,
    'alias_visible' => 1,
    '_content' => '<!DOCTYPE html>
<html lang="{$_modx->config.cultureKey}">
  <head>
    {include \'file:chunks/base/head.tpl\'}
  </head>
  <body>
      
    {*include \'file:chunks/base/yandex_metrica.tpl\'*}
    {include \'file:chunks/base/header.tpl\'}
    {*include \'file:chunks/base/breadcrumbs.tpl\'*}
    
    <div class="container padding-bottom-2x mb-2">
        
        {if !$_modx->resource.content}
            {include \'file:chunks/home/offers.tpl\'}
            {include \'file:chunks/home/populars.tpl\'}
        {else}
            {$_modx->resource.content}
        {/if}
    </div>
    
    {include \'file:chunks/base/footer.tpl\'}
    {include \'file:chunks/base/scripts.tpl\'}
    
    <a class="scroll-to-top-btn" href="#"><i class="icon-chevron-up"></i></a>
    <div class="site-backdrop"></div>
    
  </body>
</html>',
    '_isForward' => true,
  ),
  'contentType' => 
  array (
    'id' => 1,
    'name' => 'HTML',
    'description' => 'HTML content',
    'mime_type' => 'text/html',
    'file_extensions' => '',
    'icon' => '',
    'headers' => NULL,
    'binary' => 0,
  ),
  'policyCache' => 
  array (
  ),
  'sourceCache' => 
  array (
    'MODX\\Revolution\\modChunk' => 
    array (
    ),
    'MODX\\Revolution\\modSnippet' => 
    array (
    ),
    'MODX\\Revolution\\modTemplateVar' => 
    array (
    ),
  ),
);