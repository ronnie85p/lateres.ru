
<div class="form-group">
    <select class="form-control" name="question">
        <option value="0">Выберите вопрос</option>
        {foreach $questions as $question}
            <option value="{$question->id}">{$question->text}</option>
        {/foreach}
    </select>
</div>

<div class="answer">
    <input class="form-control" name="answer" placeholder="Ответ на вопрос">
</div>