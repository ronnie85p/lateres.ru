{set $login_questions = '!pdoMenu' | snippet : [
    'parents' => '82',
    'level' => 1,
    'tpl' => '@INLINE <option value="{$id}">{$menutitle}</option>',
    'tplOuter' => '@INLINE 
        <select class="form-control" name="login_question" data-invalid="#error-login-question">
            <option value="">Выберите вопрос</option>{$wrapper}
        </select>
        <div class="invalid-feedback" id="error-login-question"></div>
    '
]}    
        
<div class="row form-group">
    <div class="col-4">
        {$login_questions}
    </div>
    <div class="col-4">
        <input class="form-control" name="login_answer_for_question" value="{$login_answer_for_question}" placeholder="Ответ на вопрос" data-invalid="#error-login-answer-for-question" />
        <div class="invalid-feedback" id="error-login-answer-for-question"></div>
    </div>
</div>

<div class="row form-group">
    <div class="col-8">

        <div class="custom-control custom-checkbox">
            <input class="custom-control-input" type="checkbox" name="login_answer_for_question_strict" id="login-answer-for-question-strict" value="1"{$login_answer_for_question_strict ? ' checked' : ''} />
            <label class="custom-control-label" for="login-answer-for-question-strict">
                <i>Строгое сравнение (регистрозависимое, например: Пёс и пёс будут различаться)</i><br/>
                <span class="text-danger text-sm">* При подтверждении входа и написании ответа на вопрос будьте внимательны.</span>
            </label>
        </div>

    </div>
</div>