<style>
.btn-icon {
    font-size: 1.2em;
    padding: 0 6px 0 6px;
    margin: 0;
    height: 29px;
    line-height: 24px;
    margin-right: 5px;
}
</style>
{* <div class="card mb-2"> *}
    <div class="mb-4 py-4" style="border-bottom: 1px solid #f2f2f2">
        <div class="row">
            <div class="col-2">
                <img src="{$logo}" />
            </div>
            <div class="col-6 pt-2">
                <div class="h6 m-0"><a class="" href="{301 | url}?id={$id}" style="text-decoration: none;color: #3e4349;">{$name}</a></div>
            </div>
            <div class="col-4 text-end">
                <button class="btn btn-outline-secondary icon-edit btn-icon"></button>
                <button class="btn btn-outline-secondary icon-trash-2 btn-icon"></button>
            </div>
        </div>
    </div>
{* </div> *}