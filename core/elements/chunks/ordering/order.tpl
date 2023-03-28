<div class="form-group mb-4">
    <label for="comment">Комментарий к заказу</label>
    <textarea class="form-control" name="comment" rows="5">{$order.comment}</textarea>
</div>

<div class="custom-control custom-checkbox custom-control-inline">
    <input class="custom-control-input" type="checkbox" name="contract_required" value="1" id="ex-check-1"{$order.contract_required ? ' checked' : ''} />
    <label class="custom-control-label" for="ex-check-1">Нужен договор на поставку товара</label>
</div>
