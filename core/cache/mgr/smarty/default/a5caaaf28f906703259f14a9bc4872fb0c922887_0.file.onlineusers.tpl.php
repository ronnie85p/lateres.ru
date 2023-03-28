<?php
/* Smarty version 4.1.0, created on 2023-01-29 12:06:20
  from 'C:\xampp\htdocs\dev.lateres.ru\manager\templates\default\dashboard\onlineusers.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.1.0',
  'unifunc' => 'content_63d6370ceba0f4_47936253',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a5caaaf28f906703259f14a9bc4872fb0c922887' => 
    array (
      0 => 'C:\\xampp\\htdocs\\dev.lateres.ru\\manager\\templates\\default\\dashboard\\onlineusers.tpl',
      1 => 1651115982,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_63d6370ceba0f4_47936253 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\xampp\\htdocs\\dev.lateres.ru\\core\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.date_format.php','function'=>'smarty_modifier_date_format',),));
?>
<p><?php echo $_smarty_tpl->tpl_vars['_lang']->value['onlineusers_message'];?>
</p>
<br/>
<div id="modx-grid-user-online">
    <?php if ($_smarty_tpl->tpl_vars['data']->value['total'] > 0) {?>
    <div class="table-wrapper">
        <table class="table">
            <thead>
            <tr>
                <th><?php echo $_smarty_tpl->tpl_vars['_lang']->value['onlineusers_user'];?>
</th>
                <th><?php echo $_smarty_tpl->tpl_vars['_lang']->value['onlineusers_lasthit'];?>
</th>
                <th><?php echo $_smarty_tpl->tpl_vars['_lang']->value['onlineusers_action'];?>
</th>
            </tr>
            </thead>
            <tbody>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['data']->value['results'], 'record');
$_smarty_tpl->tpl_vars['record']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['record']->value) {
$_smarty_tpl->tpl_vars['record']->do_else = false;
?>
                <tr>
                    <td class="user-with-avatar">
                        <div class="user-avatar">
                            <?php if ($_smarty_tpl->tpl_vars['record']->value['photo']) {?>
                                <img src="<?php echo $_smarty_tpl->tpl_vars['record']->value['photo'];?>
">
                            <?php } else { ?>
                                <i class="icon icon-user icon-2x"></i>
                            <?php }?>
                        </div>
                        <div class="user-data">
                            <div class="user-name"><?php echo (($tmp = $_smarty_tpl->tpl_vars['record']->value['fullname'] ?? null)===null||$tmp==='' ? $_smarty_tpl->tpl_vars['record']->value['username'] ?? null : $tmp);?>
</div>
                            <div class="user-group"><?php echo $_smarty_tpl->tpl_vars['record']->value['group'];?>
</div>
                        </div>
                    </td>
                    <td class="occurred">
                        <div class="occurred-date"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['record']->value['occurred'],'%B %d, %Y');?>
</div>
                        <div class="occurred-time"><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['record']->value['occurred'],'%H:%M');?>
</div>
                    </td>
                    <td><?php echo $_smarty_tpl->tpl_vars['record']->value['action'];?>
</td>
                </tr>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            </tbody>
        </table>
    </div>
    <?php } else { ?>
        <div class="no-results"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['w_no_data'];?>
</div>
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['can_view_logs']->value) {?>
        <div class="widget-footer">
            <a href="<?php echo $_smarty_tpl->tpl_vars['_config']->value['manager_url'];?>
?a=system/logs"><?php echo $_smarty_tpl->tpl_vars['_lang']->value['w_view_all'];?>
 &rarr;</a>
        </div>
     <?php }?>
</div>
<?php }
}
