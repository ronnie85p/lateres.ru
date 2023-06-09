collections.combo.FilterStatus = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: [
            ['',_('collections.system.all')]
            ,['published',_('published')]
            ,['unpublished',_('unpublished')]
            ,['deleted',_('deleted')]
        ]
        ,name: 'filter'
        ,hiddenName: 'filter'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    collections.combo.FilterStatus.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.FilterStatus,MODx.combo.ComboBox);
Ext.reg('collections-combo-filter-status',collections.combo.FilterStatus);

collections.combo.Template = function(config, getStore) {
    config = config || {};

    if (!config.clearBtnCls) {
        config.clearBtnCls = 'x-form-trigger';
    }

    if (!config.expandBtnCls) {
        config.expandBtnCls = 'x-form-trigger';
    }

    Ext.applyIf(config,{
        name: 'templates'
        ,hiddenName: 'templates[]'
        ,displayField: 'templatename'
        ,valueField: 'id'
        ,fields: ['templatename','id']
        ,mode: 'remote'
        ,triggerAction: 'all'
        ,typeAhead: true
        ,editable: true
        ,forceSelection: false
        ,pageSize: 20
        ,url: MODx.config.connector_url
        ,baseParams: {
            action: 'Collections\\Processors\\Extra\\GetTemplates'
            ,template: (MODx.request.id != undefined) ? MODx.request.id : 0
            ,addEmpty: 1
        }
    });
    Ext.applyIf(config,{
        store: new Ext.data.JsonStore({
            url: config.url
            ,root: 'results'
            ,totalProperty: 'total'
            ,fields: config.fields
            ,errorReader: MODx.util.JSONReader
            ,baseParams: config.baseParams || {}
            ,remoteSort: config.remoteSort || false
            ,autoDestroy: true
        })
    });
    if (getStore === true) {
        config.store.load();
        return config.store;
    }
    collections.combo.Template.superclass.constructor.call(this,config);
    this.config = config;
    return this;
};
Ext.extend(collections.combo.Template,Ext.ux.form.SuperBoxSelect);
Ext.reg('collections-combo-template',collections.combo.Template);

collections.combo.SortDir = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: [
            ['asc',_('sort_asc')]
            ,['desc',_('sort_desc')]
        ]
        ,name: 'sortdir'
        ,hiddenName: 'sortdir'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    collections.combo.SortDir.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.SortDir,MODx.combo.ComboBox);
Ext.reg('collections-combo-sort-dir',collections.combo.SortDir);

collections.combo.CollectionsTemplate = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'collections_template'
        ,hiddenName: 'collections_template'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['name','id']
        ,pageSize: 20
        ,url: MODx.config.connector_url
        ,baseParams:{
            action: 'Collections\\Processors\\Template\\GetList'
        }
    });
    collections.combo.CollectionsTemplate.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.CollectionsTemplate,MODx.combo.ComboBox);
Ext.reg('collections-combo-collections-template',collections.combo.CollectionsTemplate);

collections.combo.SingleTemplate = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'resource_template'
        ,hiddenName: 'resource_template'
        ,displayField: 'templatename'
        ,valueField: 'id'
        ,fields: ['templatename','id']
        ,pageSize: 20
        ,url: MODx.config.connector_url
        ,baseParams:{
            action: 'Collections\\Processors\\Extra\\GetTemplates'
            ,addEmpty: config.addEmpty | 0
        }
    });
    collections.combo.SingleTemplate.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.SingleTemplate,MODx.combo.ComboBox);
Ext.reg('collections-combo-single-template',collections.combo.SingleTemplate);

collections.combo.ContentPlace = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('collections.template.content_place_original') ,'original'],
                [_('collections.template.content_place_in_tab') ,'in-tab'],
                [_('collections.template.content_place_original_except_children') ,'original-except-children'],
                [_('collections.template.content_place_none') ,'none']
            ]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,value: 'original'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    collections.combo.ContentPlace.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.ContentPlace,MODx.combo.ComboBox);
Ext.reg('collections-combo-content-place',collections.combo.ContentPlace);

collections.combo.Resource = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'resource'
        ,hiddenName: 'resource'
        ,displayField: 'pagetitle'
        ,valueField: 'id'
        ,fields: ['pagetitle','id']
        ,pageSize: 20
        ,minChars: 1
        ,editable: true
        ,triggerAction: 'all'
        ,typeAhead: false
        ,forceSelection: true
        ,selectOnFocus: false
        ,url: MODx.config.connector_url
        ,baseParams:{
            action: 'Collections\\Processors\\Extra\\GetResources'
        }
    });
    collections.combo.Resource.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.Resource,MODx.combo.ComboBox);
Ext.reg('collections-combo-resource',collections.combo.Resource);

collections.combo.ViewFor = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('collections.template.view_for_all'), 0],
                [_('collections.template.view_for_collections'), 1],
                [_('collections.template.view_for_selections'), 2]
            ]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,value: 'view_for'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    collections.combo.ViewFor.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.ViewFor,MODx.combo.ComboBox);
Ext.reg('collections-combo-view-for',collections.combo.ViewFor);

collections.combo.ExtendedBoolean = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('collections.global.use_default'),null]
                ,[_('yes'),true]
                ,[_('no'),false]
            ]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    collections.combo.ExtendedBoolean.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.ExtendedBoolean,MODx.combo.ComboBox);
Ext.reg('collections-combo-extended-boolean',collections.combo.ExtendedBoolean);

collections.combo.ContentType = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'content_type'
        ,hiddenName: 'content_type'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id', 'name']
        ,forceSelection: true
        ,typeAhead: false
        ,editable: false
        ,allowBlank: true
        ,pageSize: 20
        ,url: MODx.config.connector_url
        ,baseParams: {
            action: 'Collections\\Processors\\Extra\\GetContentTypes'
        }
    });
    collections.combo.ContentType.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.ContentType,MODx.combo.ComboBox);
Ext.reg('collections-combo-content-type',collections.combo.ContentType);

collections.combo.ContentDispositionExtended = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('collections.global.use_default'),null]
                ,[_('inline'),0]
                ,[_('attachment'),1]
            ]
        })
        ,name: 'child_content_disposition'
        ,hiddenName: 'child_content_disposition'
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,pageSize: 20
        ,selectOnFocus: false
        ,preventRender: true
    });
    collections.combo.ContentDispositionExtended.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.ContentDispositionExtended,MODx.combo.ComboBox);
Ext.reg('collections-combo-content-disposition-extended',collections.combo.ContentDispositionExtended);

collections.combo.SortType = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('collections.template.sort_type_default'), null]
                ,[_('collections.template.sort_type_integer'), 'SIGNED INTEGER']
                ,[_('collections.template.sort_type_decimal'), 'DECIMAL']
                ,[_('collections.template.sort_type_datetime'), 'DATETIME']
            ]
        })
        ,name: 'sort_type'
        ,hiddenName: 'sort_type'
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,pageSize: 20
        ,selectOnFocus: false
        ,preventRender: true
    });
    collections.combo.SortType.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.SortType,MODx.combo.ComboBox);
Ext.reg('collections-combo-sort-type',collections.combo.SortType);

collections.combo.FredBlueprints = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'blueprint',
        hiddenName: 'blueprint',
        displayField: 'name',
        valueField: 'uuid',
        fields: ['name','uuid', 'category_name', 'theme_name'],
        pageSize: 20,
        minChars: 1,
        editable: true,
        triggerAction: 'all',
        typeAhead: false,
        forceSelection: true,
        selectOnFocus: false,
        url: MODx.config.connector_url,
        baseParams:{
            action: 'Collections\\Processors\\Extra\\FredGetBlueprints',
            addNone: config.addNone || 0
        },
        tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><span style="font-weight: bold">{name:htmlEncode}</span><br />',
        '<tpl if="category_name">Category: <span>{category_name:htmlEncode}</span><br />Theme: <span>{theme_name:htmlEncode}</span></tpl>',
        '</div></tpl>')
    });
    collections.combo.FredBlueprints.superclass.constructor.call(this,config);
};
Ext.extend(collections.combo.FredBlueprints,MODx.combo.ComboBox);
Ext.reg('collections-combo-fred-blueprints',collections.combo.FredBlueprints);
