
<div class="row">
    <div class="col-4">
        <img src="{$vendor.logo}" />
    </div>
    <div class="col-6">
        <h5>{$vendor.name}</h5>
        <p class="text-muted">{$vendor.description}</p>
    </div>
</div>

<div class="row">
    <div class="col-4">
        <p class="text-lg mb-1"><i class="icon-phone"></i> {$vendor.phone}</p>
        <p class="text-lg"><i class="icon-mail"></i> {$vendor.email}</p>
    </div>
    <div class="col-8">
        <p><i class="icon-map-pin"></i> {$vendor.country}, {$vendor.address}</p>
    </div>
</div>

<hr class="margin-bottom-2x mt-2">

<h6>Торговые марки</h6>

{'!pdoMenu' | snippet : [
    'parents' => $vendor.resource,
    'level' => 1,
    'tpl' => '@INLINE {$pagetitle}',
    'tplWrapper' => '@INLINE {$output}'
]}