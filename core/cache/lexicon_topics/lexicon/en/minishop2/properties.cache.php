<?php  return array (
  'ms2_prop_limit' => 'The number of results to limit.',
  'ms2_prop_offset' => 'An offset of resources returned by the criteria to skip',
  'ms2_prop_depth' => 'Integer value indicating depth to search for resources from each parent.',
  'ms2_prop_sortby' => 'The field to sort by. For sorting by product fields you need to add prefix "Data.", for example: "&sortby=`Data.price`"',
  'ms2_prop_sortdir' => 'The direction to sort by',
  'ms2_prop_where' => 'A JSON-style expression of criteria to build any additional where clauses from.',
  'ms2_prop_tpl' => 'The chunk tpl to use for each row.',
  'ms2_prop_toPlaceholder' => 'If not empty, the snippet will save output to placeholder with that name, instead of return it to screen.',
  'ms2_prop_toSeparatePlaceholders' => 'If set, will assign EACH result to a separate placeholder named by this param suffixed with a sequential number (starting from 0).',
  'ms2_prop_showLog' => 'Display additional information about snippet work. Only for authenticated in context "mgr".',
  'ms2_prop_parents' => 'Container list, separated by commas, to search results. By default, the query is limited to the current parent. If set to 0, query not limited.',
  'ms2_prop_resources' => 'Comma-delimited list of ids to include in the results. Prefix an id with a dash to exclude the resource from the result.',
  'ms2_prop_fastMode' => 'If enabled, then in chunk will be only received values ​​from the database. All raw tags of MODX, such as filters, snippets calls will be cut.',
  'ms2_prop_includeContent' => 'Retrieve field "content" from products.',
  'ms2_prop_includeTVs' => 'An optional comma-delimited list of TemplateVar names to include in selection. For example "action,time" give you placeholders [[+action]] and [[+time]].',
  'ms2_prop_includeThumbs' => 'An optional comma-delimited list of Thumbnail sizes to include in selection. For example: "small,medium" give you placeholders [[+small]] and [[+medium]]. Thumbnails must be generted in gallery of product.',
  'ms2_prop_link' => 'Product link ID, which is automatically assigned when you create a new link in the settings.',
  'ms2_prop_master' => 'Master product ID. If specified both "master" and "slave" - query will built for master.',
  'ms2_prop_slave' => 'Slave product ID. If specified "master" this option will be ignored.',
  'ms2_prop_class' => 'Name of class for selection. By default, "msProduct".',
  'ms2_prop_tvPrefix' => 'The prefix for TemplateVar properties, "tv." for example. By default it is empty.',
  'ms2_prop_outputSeparator' => 'An optional string to separate each tpl instance.',
  'ms2_prop_returnIds' => 'If true, snippet will return comma separated string with ids of results instead of chunks.',
  'ms2_prop_return' => 'Method of displaying results.',
  'ms2_prop_showUnpublished' => 'Show unpublished products.',
  'ms2_prop_showDeleted' => 'Show deleted products.',
  'ms2_prop_showHidden' => 'Show products that are hidden in menu.',
  'ms2_prop_showZeroPrice' => 'Show products whose price is zero.',
  'ms2_prop_tplRow' => 'Chunk for template one row of query.',
  'ms2_prop_tplSingle' => 'Chunk for template single row of query.',
  'ms2_prop_tplOuter' => 'Wrapper for template results of snippet work.',
  'ms2_prop_tplEmpty' => 'Chunk that returns when no results.',
  'ms2_prop_tplSuccess' => 'Chunk with successful message about snippet work.',
  'ms2_prop_tplPaymentsOuter' => 'Chunk for templating of a block of possible payment methods.',
  'ms2_prop_tplPaymentsRow' => 'Chunk to process a payment method.',
  'ms2_prop_tplDeliveriesOuter' => 'Chunk for templating of a block of possible shipment methods.',
  'ms2_prop_tplDeliveriesRow' => 'Chunk to process a shipment method.',
  'ms2_prop_options' => 'Comma-separated list of options to output.',
  'ms2_prop_product' => 'Id of the product. If empty, will used id of the current document.',
  'ms2_prop_optionSelected' => 'Name of the active option, for setting attribute "selected"',
  'ms2_prop_optionName' => 'Name of the option for displaying.',
  'ms2_prop_filetype' => 'Type of files for select. You can use "image" for images and extensions for other files. For example "image,pdf,xls,doc".',
  'ms2_prop_optionFilters' => 'Filters by product options via JSON, e.g. {"optionkey:>":10}',
  'ms2_prop_sortbyOptions' => 'Lists options from &sortby for sorting with type via string, e.g. "optionkey:integer,optionkey2:datetime"',
  'ms2_prop_sortGroups' => 'Specifies the order in which option groups are sorted. Accepts both ids and text group names. Send as a string, for example: "22,23,24" or "Dimensions, Electronics, Other".',
  'ms2_prop_sortOptions' => 'Specifies the sorting order for options. Passed as a string, e.g.: "size,color".',
  'ms2_prop_sortOptionValues' => 'Specifies the sort order of option values. Passed as a string, e.g.: "size:SORT_DESC:SORT_NUMERIC:100,color:SORT_ASC:SORT_STRING"',
  'ms2_prop_valuesSeparator' => 'Separator between values in multiple options',
  'ms2_prop_ignoreGroups' => 'Comma-separated groups, whose options do not need to be displayed in the list.',
  'ms2_prop_ignoreOptions' => 'Options that should be ignored by snippet, comma-separated list',
  'ms2_prop_onlyOptions' => 'Show only this comma-separated list of options.',
  'ms2_prop_hideEmpty' => 'Hide options with empty value.',
  'ms2_prop_groups' => 'Show options only by chosen groups (name or id of category separated by comma, "0" means no group).',
  'ms2_prop_tplValue' => 'Chunk for templating of one value for multiple options',
  'ms2_prop_userFields' => 'An associative array of order and user fields in format "order field" => "user field".',
  'ms2_prop_wrapIfEmpty' => 'If true, will output the wrapper specified in &tplWrapper even if the output is empty.',
);