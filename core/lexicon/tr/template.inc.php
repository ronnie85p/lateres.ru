<?php
/**
 * Template English lexicon topic
 *
 * @language en
 * @package modx
 * @subpackage lexicon
 */

$_lang['access'] = 'Erişim';
$_lang['filter_by_category'] = 'Kategoriye Göre Filtreleme...';
$_lang['rank'] = 'Rütbe';
$_lang['template'] = 'Şablon';
$_lang['template_assignedtv_tab'] = 'Assigned TVs';
$_lang['template_category_desc'] = 'Use to group Templates within the Elements tree.';
$_lang['template_code'] = 'Template Code (HTML)';
$_lang['template_delete_confirm'] = 'Bu şablonu silmek istediğinizden emin misiniz?';
$_lang['template_description_desc'] = 'Usage information for this Template shown in search results and as a tooltip in the Elements tree.';
$_lang['template_duplicate_confirm'] = 'Bu şablonu çoğaltmak istediğinizden emin misiniz?';
$_lang['template_edit_tab'] = 'Şablonu düzenle';
$_lang['template_empty'] = '(boş)';
$_lang['template_err_default_template'] = 'Bu şablon varsayılan şablon olarak ayarlanmıştır. Lütfen bu şablonu yok etmeden önce MODX konfigürasyonundan farklı bir varsayılan şablon seçin.<br />';
$_lang['template_err_delete'] = 'An error occurred while trying to delete the template.';
$_lang['template_err_duplicate'] = 'Şablon çoğaltılırken bir hata oluştu.';
$_lang['template_err_ae'] = 'Adla birlikte bir şablon mevcut zaten "[[+name]]".';
$_lang['template_err_in_use'] = 'Bu şablon kullanımda. Lütfen şablonu kullanan dokümanları başka bir şablona yerleştirin. Dokümanlar şu şablonu kullanıyor:<br />';
$_lang['template_err_invalid_name'] = 'Template name is invalid.';
$_lang['template_err_locked'] = 'Şablon düzenlemeye karşı kilitli.';
$_lang['template_err_nf'] = 'Şablon bulunamadı!';
$_lang['template_err_ns'] = 'Şablon belirtilmedi.';
$_lang['template_err_ns_name'] = 'Lütfen şablon için bir ad belirtin.';
$_lang['template_err_remove'] = 'An error occurred while trying to delete the template.';
$_lang['template_err_save'] = 'Şablon kaydedilirken bir hata oluştu.';
$_lang['template_icon'] = 'Manager Icon Class';
$_lang['template_icon_desc'] = 'A CSS class to assign an icon (shown in the document trees) for all resources using this template. Font Awesome Free 5 classes such as “fa-home” may be used.';
$_lang['template_lock'] = 'Düzenlemek için şablonu kilitleyin';
$_lang['template_lock_desc'] = 'Only users with “edit_locked” permissions can edit this Template.';
$_lang['template_locked_message'] = 'Bu şablon kilitli.';
$_lang['template_management_msg'] = 'Burada hangi şablonu düzenlemek istediğinizi seçebilirsiniz.';
$_lang['template_name_desc'] = 'Bu şablonun adı.';
$_lang['template_new'] = 'Create Template';
$_lang['template_no_tv'] = 'No TVs have been assigned to this template yet.';
$_lang['template_preview'] = 'Preview Image';
$_lang['template_preview_desc'] = 'Used to preview the layout of this Template when creating a new Resource. (Minimum size: 335 x 236)';
$_lang['template_preview_source'] = 'Preview Image Media Source';
$_lang['template_preview_source_desc'] = 'Sets the basePath for this Template’s Preview Image to the one specified in the chosen Media Source. Choose “None” when specifying an absolute or other custom path to the file.';
$_lang['template_properties'] = 'Varsayılan Özellikler';
$_lang['template_reset_all'] = 'Varsayılan şablonu kullanmak için tüm sayfaları sıfırla';
$_lang['template_reset_specific'] = 'Sadece %s sayfalarını sıfırla';
$_lang['template_tab_general_desc'] = 'Here you can enter the basic attributes for this <em>Template</em> as well as its content. The content must be HTML, either placed in the <em>Template Code</em> field below or in a static external file, and may include MODX tags. Note that changed or new templates won’t be visible in your site’s cached pages until the cache is emptied; however, you can use the preview function on a page to see the template in action.';
$_lang['template_title'] = 'Şablon oluştur/düzenle';
$_lang['template_tv_edit'] = 'Edit the sort order of the TVs';
$_lang['template_tv_msg'] = 'The <abbr title="Template Variables">TVs</abbr> assigned to this template are listed below.';
$_lang['template_untitled'] = 'Başlıksız Şablon';
$_lang['templates'] = 'Şablonlar';
$_lang['tvt_err_nf'] = 'TV does not have access to the specified Template.';
$_lang['tvt_err_remove'] = 'An error occurred while trying to delete the TV from the template.';

// Temporarily match old keys to new ones to ensure compatibility
// --fields
$_lang['template_desc_category'] = $_lang['template_category_desc'];
$_lang['template_desc_description'] = $_lang['template_description_desc'];
$_lang['template_desc_name'] = $_lang['template_name_desc'];
$_lang['template_lock_msg'] = $_lang['template_lock_desc'];

// --tabs
$_lang['template_msg'] = $_lang['template_tab_general_desc'];
