{include 'file:chunks/base/head.tpl'}

{* <script src="/app/frontend/components/extra/dist/runtime.js"></script> *}
<script src="/app/frontend/components/extra/dist/vendors.js"></script>
<script src="/app/frontend/components/extra/dist/build.js" defer></script>

<style>
.extra-header {
    background: #1c3c63;
    padding: 20px;
    margin-bottom: 50px
}
.extra-logo {
    font-size: 1.4em;
    color: #fff
}
</style>


<body class="bg-light">

    <div class="extra-header">
        <div class="container d-flex">
            <div class="extra-logo">Extra</div>
            <div class="extra-top flex-fill"></div>
            <div class="extra-profile">
                <ul class="list-unstyled m-0">
                    <li><i class="icon-user text-white"></i></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <a href="/"><i class="icon-home"></i> Home</a> 
            </div>
        </div>

        <hr class="mt-2 mb-4">

        <div class="row">
            <div class="col-2">
                <ul class="list-unstyled">
                    <li><a href="app/index.php?action=extra/index">Model</a></li>
                </ul>
            </div>

            <div class="col-10">

                <h3>Model</h3>

                <div class="" id="extra">

                </div>
            </div>
        </div>
    </div>

</body>