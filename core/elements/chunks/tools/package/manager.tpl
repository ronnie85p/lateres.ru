<div class="row">
    <div class="col-10">
    
        <div class="alert form-message" id="wf-tls-form-message"></div>
    
        <form class="wf-tls validate form-inline mb-4">
            
            <input type="hidden" name="hash" value="{$hash}" />
            <input type="hidden" name="action" value="manager/package/getObjects" />
            
            <div class="row">
                <div class="col-12 form-group">
                    <div class="flex-fill mr-2">
                        <label class="d-flex justify-content-start" for="package">Package</label>  
                        <input class="form-control" name="package" value="" placeholder="Package" required />  
                        <div class="form-text">[base_path]core/components/[package]</div>
                    </div>
                    <button class="btn btn-secondary custom-disabled" type="submit">Get objects</button>
                </div>
                <div class="col-2">
                    
                </div>
            </div>
            
        </form>
            
        <form class="wf-tls">
            
            <input type="hidden" name="hash" value="{$hash}" />
            
            <div class="margin-bottom-2x">
                <div class="h4">Оbjects</div>
                <div id="package-objects" style="min-height: 30px">
                    <span class="text-muted">Nothing loaded</span>
                </div>
            </div>
            
            <div id="package-actions">
                
                <div class="custom-control custom-radio custom-control-inline">
                    <input class="custom-control-input" type="radio" id="ex-action-1" name="action" value="manager/objects/create" checked>
                    <label class="custom-control-label" for="ex-action-1">Create</label>
                </div>
                
                <div class="custom-control custom-radio custom-control-inline">
                    <input class="custom-control-input" type="radio" id="ex-action-2" name="action" value="manager/objects/remove">
                    <label class="custom-control-label" for="ex-action-2">Remove</label>
                </div>
                
            </div>
            
            <hr class="my-2" />
            
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-primary custom-disabled" type="submit" id="process-btn">Process</button>        
                </div>
            </div>        
            
        </form>
    
    </div>
</div>
