<h5 class="mb-4">Профиль</h5>

<div class="card card-body text-center">
    Will be photo here
</div>

<div class="row">
    <div class="col-12 form-group">
        <a class="" type="button"><i class="icon-plus"></i>&nbsp;Добавить описание</a>
        {* <label for="comment">Описание</label>
        <textarea class="form-control" name="comment" data-invalid="#error-fullname"></textarea>
        <span class="invalid-feedback" id="error-fullname"></span> *}
    </div>
</div>

<hr class="my-2">

<div class="row">
    <div class="col-6 form-group">
        <h2 class="h4 text-muted">ID: {$_modx->user.username}</h2>
    </div>
</div>

<style>
    .nav li {
        padding: 0.25rem!important;
        padding-right: 1rem!important;
        padding-left: 1rem!important;
        margin-right: .5rem!important;
        border-radius: 5px;
        cursor: pointer;
        border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important;
    }

    .nav li:not(.active) {
        color: #00000070;
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    }

    .nav li.active {
        font-weight: 550
    }

    .nav li.active i[class^="icon-"] {
        font-weight: 600
    }

    .nav li:hover {
        color: black
    }

    .custom-control.custom-switch .custom-control-label {
        font-size: 1.1em!important
    }

    .custom-control.custom-switch .custom-control-label:after {
        top: 4.5px!important;
        width: .9rem!important;
        height: .9rem!important;
    }

    .custom-control.custom-switch .custom-control-label:before {
        top: 3px!important;
        height: 1.1rem;
        width: 1.9rem;
        border-radius: 1.1rem;
    }
</style>

<ul class="nav nav-tabs_ border-0 profile-nav">
    <li class="nav-item active" data-bs-toggle="tab"
        data-bs-target="#user-profile" onclick="wf.Profile.loadContent('profile/index', '#user-profile')">
        <i class="icon-user"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tab"  
        data-bs-target="#user-passport" onclick="wf.Profile.loadContent('profile/passport/index', '#user-passport')">
        <i class="icon-user"></i>&nbsp;Мой паспорт
    </li>
</ul>

<hr class="mt-2 margin-bottom-2x">

<div class="tab-content border-0 p-0">

    <div class="tab-pane active" id="user-profile" style="min-height: 400px">
        {include 'file:chunks/profile/profile/index.tpl'}
    </div>

    <div class="tab-pane" id="user-passport" style="min-height: 300px"></div> 
    <div class="tab-pane" id="user-company" style="min-height: 300px"></div>

</div>

<div class="row margin-top-2x">
    <div class="col-12 text-end">
        <div class="text-muted text-sm">Создан: {$_modx->user.createdon | date : 'd-m-Y H:s'}</div>
    </div>
</div>
