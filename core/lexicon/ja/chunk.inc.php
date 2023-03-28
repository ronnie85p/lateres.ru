<?php
/**
 * Chunk English lexicon topic
 *
 * @language en
 * @package modx
 * @subpackage lexicon
 */

// Entry out of alpha order because it must come before the entry it's used in below
$_lang['example_tag_chunk_name'] = 'NameOfChunk';

$_lang['chunk'] = 'チャンク';
$_lang['chunk_category_desc'] = 'Use to group Chunks within the Elements tree.';
$_lang['chunk_code'] = 'Chunk Code (HTML)';
$_lang['chunk_description_desc'] = 'Usage information for this Chunk shown in search results and as a tooltip in the Elements tree.';
$_lang['chunk_delete_confirm'] = 'このチャンクを本当に削除しますか？';
$_lang['chunk_duplicate_confirm'] = 'このチャンクを複製しますか？';
$_lang['chunk_err_create'] = 'An error occurred while trying to create the chunk.';
$_lang['chunk_err_duplicate'] = 'チャンクの複製に失敗しました。';
$_lang['chunk_err_ae'] = '[[+name]]という名前のチャンクがすでに存在します。';
$_lang['chunk_err_invalid_name'] = '無効なチャンク名です。';
$_lang['chunk_err_locked'] = 'チャンクはロックされています。';
$_lang['chunk_err_remove'] = 'An error occurred while trying to delete the chunk.';
$_lang['chunk_err_save'] = 'チャンクの保存中にエラーが発生しました。';
$_lang['chunk_err_nf'] = 'チャンクが見つかりません。';
$_lang['chunk_err_nfs'] = 'ID [[+id]]のチャンクが見つかりません。';
$_lang['chunk_err_ns'] = 'チャンクが指定されていません。';
$_lang['chunk_err_ns_name'] = 'チャンク名を指定してください。';
$_lang['chunk_lock'] = 'チャンクは編集中のためロックされています。';
$_lang['chunk_lock_desc'] = 'Only users with “edit_locked” permissions can edit this Chunk.';
$_lang['chunk_name_desc'] = 'Place the content generated by this Chunk in a Resource, Template, or other Chunk using the following MODX tag: [[+tag]]';
$_lang['chunk_new'] = 'Create Chunk';
$_lang['chunk_properties'] = '既定のプロパティ';
$_lang['chunk_tab_general_desc'] = 'Here you can enter the basic attributes for this <em>Chunk</em> as well as its content. The content must be HTML, either placed in the <em>Chunk Code</em> field below or in a static external file, and may include MODX tags. Note, however, that PHP code will not run in this element.';
$_lang['chunk_tag_copied'] = 'Chunk tag copied!';
$_lang['chunk_title'] = 'チャンクの新規作成/編集';
$_lang['chunk_untitled'] = '無名のチャンク';
$_lang['chunks'] = 'チャンク';

// Temporarily match old keys to new ones to ensure compatibility
// --fields
$_lang['chunk_desc_category'] = $_lang['chunk_category_desc'];
$_lang['chunk_desc_description'] = $_lang['chunk_description_desc'];
$_lang['chunk_desc_name'] = $_lang['chunk_name_desc'];
$_lang['chunk_lock_msg'] = $_lang['chunk_lock_desc'];

// --tabs
$_lang['chunk_msg'] = $_lang['chunk_tab_general_desc'];
