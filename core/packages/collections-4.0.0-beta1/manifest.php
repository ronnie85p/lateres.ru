<?php return array (
  'manifest-version' => '1.1',
  'manifest-attributes' => 
  array (
    'readme' => 'Collections [ ![Crowdin](https://d322cqt584bo4o.cloudfront.net/collections/localized.png) ](https://crowdin.com/project/collections)
===========

Collections is a MODX Revolution Extra that adds a custom `CollectionContainer` resource class with the following behaviour:

1. Any direct child resource will be hidden from the Resource Tree in the Manager, and listed in a grid view (similar to Articles) under a dedicated "Children" tab, for which the label can be customized.
2. Any children that themselves have children will be shown in the Tree, to be managed normally.

![Collections Children Grid](http://modx.com/assets/i/blogs/yj/Collections-Grid-View.png)

#### Sub Collections
Just like the MODX Resource Tree itself, Collections supports nesting. You can create a Collection within another Collection. Sub Collection Containers will be displayed in the resource tree and their children will be displayed in the grid view.

#### Drag n Drop
You can drag n drop Resources into a Collections container and if they don\'t have children of their own they will be listed in the grid. If they do have children, they\'ll just remain in the Tree as usual.

### Custom Views
As of version 2.x, Collections supports customizable views. Views are configured in Collections Custom Manager Page (CMP):

![Collections CMP](http://modx.com/assets/i/blogs/yj/Collections-CMP.png)
![Collections New View](http://modx.com/assets/i/blogs/yj/Collections-New-View3.png)

There are specific settings for Collections Resources vs Selections.

### Resources
The official documentation for Collections can be found here: [https://docs.modx.com/extras/revo/collections](https://docs.modx.com/extras/revo/collections)
',
    'license' => 'GNU GENERAL PUBLIC LICENSE
   Version 2, June 1991
--------------------------

Copyright (C) 1989, 1991 Free Software Foundation, Inc.
59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

Preamble
--------

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
License is intended to guarantee your freedom to share and change free
software--to make sure the software is free for all its users.  This
General Public License applies to most of the Free Software
Foundation\'s software and to any other program whose authors commit to
using it.  (Some other Free Software Foundation software is covered by
the GNU Library General Public License instead.)  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
this service if you wish), that you receive source code or can get it
if you want it, that you can change the software or use pieces of it
in new free programs; and that you know you can do these things.

  To protect your rights, we need to make restrictions that forbid
anyone to deny you these rights or to ask you to surrender the rights.
These restrictions translate to certain responsibilities for you if you
distribute copies of the software, or if you modify it.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must give the recipients all the rights that
you have.  You must make sure that they, too, receive or can get the
source code.  And you must show them these terms so they know their
rights.

  We protect your rights with two steps: (1) copyright the software, and
(2) offer you this license which gives you legal permission to copy,
distribute and/or modify the software.

  Also, for each author\'s protection and ours, we want to make certain
that everyone understands that there is no warranty for this free
software.  If the software is modified by someone else and passed on, we
want its recipients to know that what they have is not the original, so
that any problems introduced by others will not reflect on the original
authors\' reputations.

  Finally, any free program is threatened constantly by software
patents.  We wish to avoid the danger that redistributors of a free
program will individually obtain patent licenses, in effect making the
program proprietary.  To prevent this, we have made it clear that any
patent must be licensed for everyone\'s free use or not licensed at all.

  The precise terms and conditions for copying, distribution and
modification follow.


GNU GENERAL PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
---------------------------------------------------------------

  0. This License applies to any program or other work which contains
a notice placed by the copyright holder saying it may be distributed
under the terms of this General Public License.  The "Program", below,
refers to any such program or work, and a "work based on the Program"
means either the Program or any derivative work under copyright law:
that is to say, a work containing the Program or a portion of it,
either verbatim or with modifications and/or translated into another
language.  (Hereinafter, translation is included without limitation in
the term "modification".)  Each licensee is addressed as "you".

Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running the Program is not restricted, and the output from the Program
is covered only if its contents constitute a work based on the
Program (independent of having been made by running the Program).
Whether that is true depends on what the Program does.

  1. You may copy and distribute verbatim copies of the Program\'s
source code as you receive it, in any medium, provided that you
conspicuously and appropriately publish on each copy an appropriate
copyright notice and disclaimer of warranty; keep intact all the
notices that refer to this License and to the absence of any warranty;
and give any other recipients of the Program a copy of this License
along with the Program.

You may charge a fee for the physical act of transferring a copy, and
you may at your option offer warranty protection in exchange for a fee.

  2. You may modify your copy or copies of the Program or any portion
of it, thus forming a work based on the Program, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) You must cause the modified files to carry prominent notices
    stating that you changed the files and the date of any change.

    b) You must cause any work that you distribute or publish, that in
    whole or in part contains or is derived from the Program or any
    part thereof, to be licensed as a whole at no charge to all third
    parties under the terms of this License.

    c) If the modified program normally reads commands interactively
    when run, you must cause it, when started running for such
    interactive use in the most ordinary way, to print or display an
    announcement including an appropriate copyright notice and a
    notice that there is no warranty (or else, saying that you provide
    a warranty) and that users may redistribute the program under
    these conditions, and telling the user how to view a copy of this
    License.  (Exception: if the Program itself is interactive but
    does not normally print such an announcement, your work based on
    the Program is not required to print an announcement.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Program,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Program, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Program.

In addition, mere aggregation of another work not based on the Program
with the Program (or with a work based on the Program) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may copy and distribute the Program (or a work based on it,
under Section 2) in object code or executable form under the terms of
Sections 1 and 2 above provided that you also do one of the following:

    a) Accompany it with the complete corresponding machine-readable
    source code, which must be distributed under the terms of Sections
    1 and 2 above on a medium customarily used for software interchange; or,

    b) Accompany it with a written offer, valid for at least three
    years, to give any third party, for a charge no more than your
    cost of physically performing source distribution, a complete
    machine-readable copy of the corresponding source code, to be
    distributed under the terms of Sections 1 and 2 above on a medium
    customarily used for software interchange; or,

    c) Accompany it with the information you received as to the offer
    to distribute corresponding source code.  (This alternative is
    allowed only for noncommercial distribution and only if you
    received the program in object code or executable form with such
    an offer, in accord with Subsection b above.)

The source code for a work means the preferred form of the work for
making modifications to it.  For an executable work, complete source
code means all the source code for all modules it contains, plus any
associated interface definition files, plus the scripts used to
control compilation and installation of the executable.  However, as a
special exception, the source code distributed need not include
anything that is normally distributed (in either source or binary
form) with the major components (compiler, kernel, and so on) of the
operating system on which the executable runs, unless that component
itself accompanies the executable.

If distribution of executable or object code is made by offering
access to copy from a designated place, then offering equivalent
access to copy the source code from the same place counts as
distribution of the source code, even though third parties are not
compelled to copy the source along with the object code.

  4. You may not copy, modify, sublicense, or distribute the Program
except as expressly provided under this License.  Any attempt
otherwise to copy, modify, sublicense or distribute the Program is
void, and will automatically terminate your rights under this License.
However, parties who have received copies, or rights, from you under
this License will not have their licenses terminated so long as such
parties remain in full compliance.

  5. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Program or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Program (or any work based on the
Program), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Program or works based on it.

  6. Each time you redistribute the Program (or any work based on the
Program), the recipient automatically receives a license from the
original licensor to copy, distribute or modify the Program subject to
these terms and conditions.  You may not impose any further
restrictions on the recipients\' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties to
this License.

  7. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Program at all.  For example, if a patent
license would not permit royalty-free redistribution of the Program by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Program.

If any portion of this section is held invalid or unenforceable under
any particular circumstance, the balance of the section is intended to
apply and the section as a whole is intended to apply in other
circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system, which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  8. If the distribution and/or use of the Program is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Program under this License
may add an explicit geographical distribution limitation excluding
those countries, so that distribution is permitted only in or among
countries not thus excluded.  In such case, this License incorporates
the limitation as if written in the body of this License.

  9. The Free Software Foundation may publish revised and/or new versions
of the General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number.  If the Program
specifies a version number of this License which applies to it and "any
later version", you have the option of following the terms and conditions
either of that version or of any later version published by the Free
Software Foundation.  If the Program does not specify a version number of
this License, you may choose any version ever published by the Free Software
Foundation.

  10. If you wish to incorporate parts of the Program into other free
programs whose distribution conditions are different, write to the author
to ask for permission.  For software which is copyrighted by the Free
Software Foundation, write to the Free Software Foundation; we sometimes
make exceptions for this.  Our decision will be guided by the two goals
of preserving the free status of all derivatives of our free software and
of promoting the sharing and reuse of software generally.

NO WARRANTY
-----------

  11. BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY
FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.  EXCEPT WHEN
OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED
OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.  THE ENTIRE RISK AS
TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU.  SHOULD THE
PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING,
REPAIR OR CORRECTION.

  12. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR
REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING
OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED
TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER
PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

---------------------------
END OF TERMS AND CONDITIONS',
    'changelog' => 'Changelog for Collections.

Collections 4.0.0
===================
- Support for MODX Revolution 3.0.0

Collections 3.7.1
===================
- Fix lexicon typo
- Fix editing from grid

Collections 3.7.0
===================
- Make pagination stateful
- Add CollectionsOnResourceSort custom event
- Add quick create button
- Sync with crowdin
- Fred integration
- Don\'t makeURL for deleted resources & hide view button
- Allow duplicating children
- Fix TV search in selections
- Check permissions before rendering specific action button / context menu action
- Handle edit and view child as classic link, allowing to cmd/ctrl click to open in new tab
- Fix clear filter clearing current folder
- Remove \'overflow: hidden\' to title on main column view to correct visual bug [#219]

Collections 3.6.0
===================
- Add sync tables resolver
- Added 3 options to speed up large child lists (+10K resources)
- Fix D&D sort for Resources in depth > 1

Collections 3.5.0
===================
- Add collections.renderer.boolean renderer
- Add AjaxManager compatibility
- Adjust position of other columns when creating/updating column with position specified
- Add excludeResources option to getSelections snippet
- Prevent Collection\'s view reset after quick resource update
- Use lexicons for the Open button
- Add overflow ellipse to the main-column
- Add area to system settings

Collections 3.4.2
===================
- Fix saving tv values from update from grid
- Fix after save event fired on update from grid

Collections 3.4.1
===================
- Fix Safari endless reloading
- Fix Selections when sorting by menuindex

Collections 3.4.0
===================
- Pass column name to snippet renderer
- Prevent permanent sort breaking D&D sort
- Add Collections.renderer.buttons renderer
- Allow snippet renderer on non-existing column
- Add event names to update from grid processor
- Show folders under collections
- Show breadcrumbs when browsing folders under collections
- Import / Export collection views
- Add quick update for collection & selection children
- Prevent saving columns with snippet renderer from grid
- Add new system settings to show create collection/selection button in tree tool bar
- Display resource id in link resource window
- Adjust colors in collections grid

Collections 3.3.0
===================
- Show assigned templates in Collection\'s view grid
- Fix ignore parents for pdoResources
- Add "Condition for Link resource window" as a setting for Sellection view
- Fix displaying ContentBlocks when content is in separate tab
- Fix checking for template usage in views

Collections 3.2.2
===================
- Fix D&D sort for Collection\'s view columns
- Added Collections.renderer.pagetitleWithIcons
- Improved handler for inline action buttons allowing icons
- Fix D&D sort when menuindex is set as default sort field
- Rename String sort type

Collections 3.2.1
===================
- Fix update from previous versions

Collections 3.2.0
===================
- Add sort type as a new Collection\'s template column setting
- Add permanent sort
- Auto set column label from TV caption or Tagger group name
- Pass columns value as input to snippet renderer
- Add sort type as a new Collection\'s view setting
- Add content disposition as a new Collection\'s view setting
- Add parent as a new Collection\'s view setting
- Make TV columns searchable
- Use modx->getTableName to get table names for Tagger tables
- Show TV\'s default value in grid
- Clear filter use sort field & dir from view
- Prevent error while not passing Resource templates in Collection view

Collections 3.1.1
===================
- Fixed showing (empty) template in child\'s template select box
- Fixed renderer image path
- Fixed D&D reorder children when element or file tree is selected
- Fixed back to collection/selection button for static resources/weblinks/symlinks
- Fixed back to collection/selection button on create new child page

Collections 3.1.0
===================
- Fixed reset filter button in Selections
- Added option to set default values for content type for new children
- Added system setting to modify image path in image renderer
- Allow children under Selections
- Added an option to add quip column
- Fixed selecting templates in Collection view in Revo 2.2.x
- Added option to set default values for hidemenu,published,cacheable,searchable and richtext for new children
- Added option to specify sortby for Selections Resource search query
- Added option to set label for Back to Collection/Selection button
- Fixed displaying selection grid with TVs
- Pass whole row to snippet renderer
- Fixed sorting by TV with dash in name

Collections 3.0.2
===================
- Fixed saving Collections view from Resource\'s settings tab
- Link Resource to Selection can be done by searching ID
- Fixed passing sort dir int uppercase format to getSelections
- Removed parents option from getSelections call

Collections 3.0.1
===================
- Fixed update from grid

Collections 3.0.0
===================
- Added validation for column name if contains a dot
- Added PHP renderer (snippet) that will be used for a column
- Added view option to define Resource Classes that will be available in resource type select
- Added view option to define context menu items
- Added view option to define buttons and their style
- Fixed saving view options from not-activated tab
- Changed default tree icon for Collections in Revo 2.3
- Added getSelections snippet (works with getPage, getCache, etc.)
- Updated view of Collection\'s settings tab
- Updated Collections view
- Added CRC for Selections
- Added back button to Collection\'s children and revert close button to original functionality
- Fire OnBeforeEmptyTrash and OnEmptyTrash when removing Resource via Collections

Collections 2.2.2
===================
- Fixed rendering TV and Tagger columns with dash in name/alias

Collections 2.2.1
===================
- Fixed PHP 5.2 compatibility

Collections 2.2.0
===================
- Added an option to set position of Content field
- Added an options to set Tab\'s and New child\'s button label
- Added Collections.renderer.image for rendering images
- Added tabs to Collection views to split its settings
- Splitted Setting tab to vtabs for Resource settings and Collections settings
- Improved close button in collection\'s childs
- Fixed showing data in TV columns
- Added an option to permanently remove deleted resource
- Fixed duplicate action from context menu
- Added data controller to show resource owerview page
- Fix # being appended to manager url when clicking a button
- Fix strict standards error (PHP 5.4+) in resource/getlist processor
- Fix not working editlink on pagetitle click in grid

Collections 2.1.0
===================
- Added option to duplicate Collection\'s view
- Updated layout for create/update view\'s column
- Added view,update,delete,duplicate,publish items to children\'s grid context menu
- Added children default template, default resource type and allow resource type selection options to collection\'s templates
- Fixed View button
- Fixed logging messages from plugin

Collections 2.0.2
===================
- Fixed datetime renderers

Collections 2.0.1
===================
- Fixed saving collections container in Revolution 2.2.x

Collections 2.0.0
===================
- Added collections templates
- Added ability to create different child type from grid
- Support for Revolution 2.3

Collections 1.3.3
===================
- Remove debugger call :X

Collections 1.3.2
===================
- Hotfix for confirm navigation dialog
- Fixed selecting multiple rows
- Fixed checking for Tagger

Collections 1.3.1
===================
- Release with correct version number

Collections 1.3.0
===================
- Support for Tagger in search field in Children tab
- Added ability to drag and drop child to resource tree to change parent
- English and German lexicon updates

Collections 1.2.0
===================
- Added ability to search via created by full name
- Added ability to search via created by username
- Fixed switching child between two Collections
- Fixed switching great parent to Collections when moving last child
- Fixed child name after creating a duplicate
- Added drag & drop sort by menuindex

Collections 1.1.1
===================
- #20 Fixed after re-save child set show_in_tree 1

Collections 1.1.0
===================
- #9 Added duplicate button
- #10 Added icon for Collection into the Resource tree
- #11 Make grid stateful and added some more columns (until clearing cache grid keeps showed/hidden columns and their order)
- Renamed "Collection container" to "Collection"
- #7 Added German translation (thanks to pepebe)
- #12 Added Czech translation
- #14 Added Dutch translation (thanks to @mark_hamstra)
- #15 Added French translation (thanks to @rtripault)
- #16 #17 Added Russian translation (thanks to vanchelo)
- #18 Fixed show_in_tree conflict

Collections 1.0.0
===================
- Published in MODX extras

Collections 0.8.2
===================
- Finished renaming CollectionsContainer -> CollectionContainer
- Removed chromephp log calls

Collections 0.8.1
===================
- Fixed showing aliases in children grid

Collections 0.8.0
===================
- Renamed CollectionsContainer to CollectionContainer
- Fixed returning proper count of children under Collection Container

Collections 0.7.0
===================
- Added switchback resolver that will switch all Collections Containers back to modDocument and set show_in_tree to 1 for all Collections children on uninstall
- Added support for handle class_key switch from CollectionContainer and to CollectionContainer

Collections 0.6.0
===================
- Fixed proper showing Collections Container under another Collections Container
- Fixed proper showing normal containers with children under CRC
- Added listener for Before Empty Trash event to hide Resources that are under Collections Container and that will not have other children after the trash will be cleaned

Collections 0.5.0
===================
- Updated the plugin to inject JS for handling cancel button in Resource Update panel

Collections 0.4.0
===================
- Added plugin that handles correct setting of show_in_tree parameter for Resources after creating a new Resource or sorting resources

Collections 0.3.0
===================
- Visual improvements for grid with children

Collections 0.2.0
===================
- Extended Resource Update panel with new Tab that contains grid with children


Collections 0.1.0
===================
- Initial release.
',
    'requires' => 
    array (
      'modx' => '>=3.0.0-alpha',
    ),
  ),
  'manifest-vehicles' => 
  array (
    0 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modNamespace',
      'guid' => 'f325b28d9665ba97c0837bfa8e944f17',
      'native_key' => 'collections',
      'filename' => 'MODX/Revolution/modNamespace/e6930cb3cb99339cf7221722b9d59de8.vehicle',
    ),
    1 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '27ad35e396a4a41d595e4ee9370d0765',
      'native_key' => '27ad35e396a4a41d595e4ee9370d0765',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/214814e5b71bdeb042875bc543fe9841.vehicle',
    ),
    2 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '5f30c679c8f2aa504c2a0c4f09e68834',
      'native_key' => '5f30c679c8f2aa504c2a0c4f09e68834',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/d5b397c9856d2748a2d3375a75e1c438.vehicle',
    ),
    3 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => 'a0d8b206d7db351421944337641bf10b',
      'native_key' => 'a0d8b206d7db351421944337641bf10b',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/2d96e9d9bc5fd8bdde891735c67c047e.vehicle',
    ),
    4 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => 'ee3a7cf86f86d1d83cac43c499e894b0',
      'native_key' => 'collections.mgr_date_format',
      'filename' => 'MODX/Revolution/modSystemSetting/28da0260ce5e0e390f398210f7892101.vehicle',
    ),
    5 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => 'ca5af6605f589f828976cd6afd6da114',
      'native_key' => 'collections.mgr_time_format',
      'filename' => 'MODX/Revolution/modSystemSetting/f0e112c998b1ca5b47a7296f5ff6c46e.vehicle',
    ),
    6 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '9f47ef28f83f3966e9a08e06643b56ee',
      'native_key' => 'collections.mgr_datetime_format',
      'filename' => 'MODX/Revolution/modSystemSetting/7bad239d94b854cc61292145a693a815.vehicle',
    ),
    7 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '70c2eee316d83cc35cdc678cef683755',
      'native_key' => 'collections.user_js',
      'filename' => 'MODX/Revolution/modSystemSetting/76b23f7c55c084bfc2389222f7ef5928.vehicle',
    ),
    8 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => 'dbd885543b154e6a609b07bffd8d258b',
      'native_key' => 'collections.user_css',
      'filename' => 'MODX/Revolution/modSystemSetting/7beb5ac141d94d4a71c9a95c694d09ee.vehicle',
    ),
    9 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => 'aeb941ee474ee880ae74f0084df4a20d',
      'native_key' => 'mgr_tree_icon_collectioncontainer',
      'filename' => 'MODX/Revolution/modSystemSetting/1d9e9751a4bd205bebe9f980627d1ad8.vehicle',
    ),
    10 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '99762ea0117a6eedd67f63d37d205a9f',
      'native_key' => 'mgr_tree_icon_selectioncontainer',
      'filename' => 'MODX/Revolution/modSystemSetting/d7a48c95e45c1a2165d97a70468103c1.vehicle',
    ),
    11 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '766e66c1b4e40ad2203cb958fead8232',
      'native_key' => 'collections.renderer_image_path',
      'filename' => 'MODX/Revolution/modSystemSetting/9b7d2ac31528ebc89b7839cfd9b7b89a.vehicle',
    ),
    12 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '281a0bbae46bb8a3bd8856d6e61c03ab',
      'native_key' => 'collections.tree_tbar_collection',
      'filename' => 'MODX/Revolution/modSystemSetting/1f653f5dd4c841e3375c1a1f6545d027.vehicle',
    ),
    13 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modSystemSetting',
      'guid' => '455812123fa51347a3ced24f6db911c3',
      'native_key' => 'collections.tree_tbar_selection',
      'filename' => 'MODX/Revolution/modSystemSetting/665d2de2b8531e6a6d99380ce43c82ff.vehicle',
    ),
    14 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modMenu',
      'guid' => '246d50d8301a315896d0b935f2e7c812',
      'native_key' => 'collections.menu.collection_templates',
      'filename' => 'MODX/Revolution/modMenu/77c5f379e340a470232e0289bffab20b.vehicle',
    ),
    15 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '97e93f48f03466d85ddfadfc305b11cd',
      'native_key' => '97e93f48f03466d85ddfadfc305b11cd',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/c11160578de200ab4435e0beb0a48212.vehicle',
    ),
    16 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => 'e4b9b8a3a1d1e7e1618d451b1a756567',
      'native_key' => 'e4b9b8a3a1d1e7e1618d451b1a756567',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/dccd302438de7c6bbfb7bd3c44a5478a.vehicle',
    ),
    17 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOObjectVehicle',
      'class' => 'MODX\\Revolution\\modCategory',
      'guid' => '2175f3e6f44b81e623e3d108eda77241',
      'native_key' => NULL,
      'filename' => 'MODX/Revolution/modCategory/06f58842f464310066c36040782c9722.vehicle',
    ),
    18 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => 'e80610d087fdb447374a548840480c8b',
      'native_key' => 'e80610d087fdb447374a548840480c8b',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/64d98041fd89ab103c388b6bea97cec2.vehicle',
    ),
    19 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '506b13ea3e60d566f5f19d6dc731ba5c',
      'native_key' => '506b13ea3e60d566f5f19d6dc731ba5c',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/5449c61233b60b70b0967e2d56c6d5a9.vehicle',
    ),
    20 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '6cbc4add36f4d631b192aa435776c9a9',
      'native_key' => '6cbc4add36f4d631b192aa435776c9a9',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/2d8daaa1aadf1f05664679b6e88f2d45.vehicle',
    ),
    21 => 
    array (
      'vehicle_package' => '',
      'vehicle_class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'class' => 'xPDO\\Transport\\xPDOScriptVehicle',
      'guid' => '15448fa5f2d99a5b7e9a1bbf9a59246f',
      'native_key' => '15448fa5f2d99a5b7e9a1bbf9a59246f',
      'filename' => 'xPDO/Transport/xPDOScriptVehicle/0f5d6917dfe6cc667228c15bf89b530a.vehicle',
    ),
  ),
);