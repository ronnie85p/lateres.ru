<style>
.custom-nav-pills .nav-link {
    border-radius: 0!important;
    font-size: 1.2em!important; 
}
.custom-nav-pills .nav-link.active {
    font-size: 1.3em!important; 
    background-color: transparent!important;
    border-top: none!important;
    border-right: none!important;
    border-left: none!important;
    color: #e61923;
    pointer-events: none;
}
.nav-btn {
    padding-right:.5rem!important
}
.nav-btn .nav-icon {
    font-size: 2em
}
</style>

{set $steps = 'pdoMenu' | snippet : [
    'parents' => '224',
    'return' => 'data',
    'level' => 1
]}

<ul class="nav nav-pills mb-4 custom-nav-pills" id="form-steps">
    {foreach $steps as $step}
        <li class="nav-item">
            <a class="nav-link{$formType == $step.alias ? ' active' : ''}" aria-current="page" href="#{$step.alias}">{$step.pagetitle}</a>
        </li>
    {/foreach}
</ul>

<div class="tab-content">
    {foreach $steps as $step}
        <div class="tab-pane" id="{$step.alias}" style="min-height: 450px"></div>
    {/foreach}
</div>