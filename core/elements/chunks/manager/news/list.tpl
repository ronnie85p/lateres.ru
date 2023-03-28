<style>
    .content-wrapper {
        padding: 1.5rem!important;
        margin-bottom: 1rem!important;
        border-radius: 5px!important;
        background: #fff!important;
    }
</style>

{set $categories = '!pdoMenu' | snippet : [
    'parents' => '5',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE {$wrapper}'
]}

{set $rows = '!wfRsGetResources' | snippet : [
    'parents' => '335',
    'showHidden' => true,
    'showUnpublished' => true,
    'tpl' => '@INLINE <li class="media mb-3">
        <img class="d-flex rounded-circle align-self-end mr-3" src="assets/imgs/categories/blocks-140/blocks-140.jpg" width="64" alt="Media">
        <div class="media-body">
            <h6 class="mt-0 mb-1"><a href="{$id | url}" data-target="#content">{$pagetitle}</a></h6><span class="d-block text-sm text-muted">{$description}</span>
        </div>
    </li><hr class="margin-bottom-2x">'
]}

<div class="content-wrapper_">

    <form class="">
        <div class="row">
            <div class="col-4 form-group">
                <label for="parent">Категория</label>
                <select class="form-control" name="parent">
                    <option value="">Все</option>
                    {$categories}
                </select>
            </div>
        </div>
    </form>

</div>

<hr class="margin-bottom-2x">

<div class="content-wrapper">
    <ul class="list-unstyled">
        {$rows}
    </ul>
</div>