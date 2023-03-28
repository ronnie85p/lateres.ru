{* {'!DeliveryMap' | snippet : [

]} *}

<div style="position: absolute; top: 5px; left: 5px; z-index: 111111" class="p-2 bg-white shadow-sm rounded">
    <a href="#dma-details" class="dropdown-toggle" data-bs-toggle="collapse">Moskow reg., Solnechnogorsk city</a>
    <div class="collapse" id="dma-details">
        <div class="row">
            <div class="col-4">
                Координаты
            </div>
            <div class="col-8">
                <span class="dma-finish"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                Расстояние
            </div>
            <div class="col-8">
                <span class="dma-distance"></span> км.
            </div>
        </div>
    </div>
</div>

{* <div class="">
    <div class="">
        <div class="">Moskow reg., Solnechnogorsk city</div>
    </div>  *}
    <div id="delivery-map" style="height: 100%">
        <div class="loading d-none"><span class="loading-text"></span></div>
        <div class="placeholder d-none"><i class="icon-map"></i></div>
    </div>
{* </div> *}