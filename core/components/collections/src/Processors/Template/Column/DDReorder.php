<?php
namespace Collections\Processors\Template\Column;

use Collections\Model\CollectionTemplateColumn;
use MODX\Revolution\Processors\ModelProcessor;

class DDReorder extends ModelProcessor
{
    public $classKey = CollectionTemplateColumn::class;
    public $languageTopics = ['collections:default'];
    public $objectType = 'collections.template.column';

    public function process()
    {
        $idItem = $this->getProperty('idItem');
        $oldIndex = $this->getProperty('oldIndex');
        $newIndex = $this->getProperty('newIndex');
        $template = $this->getProperty('template');

        if (intval($template) == 0) {
            return $this->failure($this->modx->lexicon('collections.err.template_ns'));
        }

        $items = $this->modx->newQuery($this->classKey);
        $items->where([
            'id:!=' => $idItem,
            'template' => $template,
            'position:>=' => min($oldIndex, $newIndex),
            'position:<=' => max($oldIndex, $newIndex),
        ]);

        $items->sortby('position', 'ASC');

        $itemsColumn = $this->modx->getCollection($this->classKey, $items);

        if (min($oldIndex, $newIndex) == $newIndex) {
            foreach ($itemsColumn as $item) {
                $itemObject = $this->modx->getObject($this->classKey, $item->get('id'));
                $itemObject->set('position', $itemObject->get('position') + 1);
                $itemObject->save();
            }
        } else {
            foreach ($itemsColumn as $item) {
                $itemObject = $this->modx->getObject($this->classKey, $item->get('id'));
                $itemObject->set('position', $itemObject->get('position') - 1);
                $itemObject->save();
            }
        }

        $itemObject = $this->modx->getObject($this->classKey, $idItem);
        $itemObject->set('position', $newIndex);
        $itemObject->save();


        return $this->success('', $itemObject);
    }

}
