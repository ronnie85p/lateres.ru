<div class="row">
    <div class="col-10">
    
        <div class="alert form-message" id="mtools-form-message"></div>
    
        <form class="mtools-form validate">
            
            <input type="hidden" name="hash" value="{$hash}" />
            <input type="hidden" name="action" value="manager/package/generate" />
            
            <div class="row">
                <div class="col-10 form-group">
                    <div class="form-floating">
                        <input class="form-control" name="package" value="" placeholder="Package" required />
                        <label for="package">Package</label>    
                    </div>
                    <div class="form-text">[base_path]core/components/[package]</div>
                </div>
                <div class="col-2">
                    <button class="btn btn-secondary custom-disabled" type="submit">Generate</button>
                </div>
            </div>
            
        </form>
    
    </div>
</div>
