collections.page.Template = function(config) {
    config = config || {};

    config.isUpdate = (MODx.request.id) ? true : false;

    Ext.applyIf(config,{
        formpanel: 'collections-panel-template'
        ,buttons: [{
            text: _('save')
            ,method: 'remote'
            ,process: config.isUpdate ? 'Collections\\Processors\\Template\\Update' : 'Collections\\Processors\\Template\\Create'
            ,keys: [{
                key: MODx.config.keymap_save || 's'
                ,ctrl: true
            }]
        },{
            text: _('cancel')
            ,params: {a:'home', namespace:'collections'}
        }]
        ,components: [{
            xtype: 'collections-panel-template'
            ,renderTo: 'collections-panel-template-div'
            ,isUpdate: config.isUpdate
            ,fredInstalled: !!config.fredInstalled
        }]
    });
    collections.page.Template.superclass.constructor.call(this,config);
};
Ext.extend(collections.page.Template,MODx.Component);
Ext.reg('collections-page-template',collections.page.Template);
