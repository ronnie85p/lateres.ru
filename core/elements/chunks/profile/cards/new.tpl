{set $year = intval(time() | date : 'Y')}
{set $years = []}
{set $months = []}

{foreach 1..12 as $value}
    {set $months[] = $value ~ ' - ' ~ (strtotime(($value+2) ~ ' month') | date : 'F')}
{/foreach}

{foreach 1..10 as $value}
    {set $years[] = $year + $value}
{/foreach}

<form class="validate">

    <div class="row form-group">
        <div class="col-7">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-3">
            <input class="form-control" name="number" placeholder="____ ____ ____ ____" required />
        </div>
        <div class="col-4 d-flex">
            <select class="form-control" required>
                {foreach $months as $month}
                    <option value="{$month}">{$month}</option>
                {/foreach}
            </select>

            <div class="mx-2 d-flex align-items-center">/</div>

            <select class="form-control" required>
                {foreach $years as $year}
                    <option value="{$year}">{$year}</option>
                {/foreach}
            </select>
        </div>
    </div>

    <div class="collapse show" id="card-cvc">
        <div class="row form-group">
            <div class="col-5">
                <input class="form-control" name="name" placeholder="ИМЯ ФАМИЛИЯ" required />
            </div>
            <div class="col-2 text-end">
                <input class="form-control text-center" type="password" name="cvc" value="" placeholder="cvc-код" maxlength="4">
            </div>        
        </div>
    </div>

    <hr class="my-4">

    <div class="row form-group">
        <div class="col-7">
            <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="ex-trustme" data-toggle="collapse_" data-target="#card-cvc" data-reverse="true">
                <label class="custom-control-label" for="ex-trustme">Доверять сайту</label>
            </div>
            <p class="text-muted m-0">При оплате картой на сайте не будет запрашиваться 3-х значный код.</p>
        </div>
    </div>

    <hr class="my-4">

    <div class="row form-group">
        <div class="col-7">
            <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="ex-default" checked>
                <label class="custom-control-label" for="ex-default">По умолчанию</label>
            </div>
        </div>
    </div>

    <hr class="my-2">

    <div class="row">
        <div class="col-12">
            <button class="btn btn-primary custom-disabled" type="submit">Добавить карту</button>
        </div>
    </div>

</form>