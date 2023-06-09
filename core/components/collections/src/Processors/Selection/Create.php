<?php
namespace Collections\Processors\Selection;
use Collections\Model\CollectionSelection;
use MODX\Revolution\Processors\Model\CreateProcessor;

/**
 * Create a Selection
 *
 * @package collections
 * @subpackage processors.selection
 */
class Create extends CreateProcessor
{
    public $classKey = CollectionSelection::class;
    public $languageTopics = ['collections:default'];
    public $objectType = 'collections.selection';
    /** @var CollectionSelection $object */
    public $object;

    public function beforeSet()
    {
        $collection = $this->getProperty('collection');
        $resource = $this->getProperty('resource');

        if (empty($collection) || empty($resource)) {
            if (empty($collection)) {
                $this->addFieldError('collection', $this->modx->lexicon('collections.err.selection_ns_collection'));
            }

            if (empty($resource)) {
                $this->addFieldError('resource', $this->modx->lexicon('collections.err.selection_ns_resource'));
            }
        } else {
            if ($this->doesAlreadyExist(['collections' => $collection, 'resource' => $resource])) {
                $this->addFieldError('resource', $this->modx->lexicon('collections.err.selection_ae_resource'));
            }
        }

        return parent::beforeSet();
    }

    public function beforeSave()
    {
        $collection = $this->getProperty('collection');
        $resource = $this->getProperty('resource');

        $menuindex = $this->modx->newQuery(CollectionSelection::class);
        $menuindex->where(['collection' => $collection]);
        $menuindex->sortby('menuindex', 'DESC');
        $menuindex->limit(1);
        $menuindex->select($this->modx->getSelectColumns(CollectionSelection::class, 'CollectionSelection', '', ['menuindex']));

        $menuindex->prepare();
        $menuindex->stmt->execute();

        $lastMenuindex = (int)$menuindex->stmt->fetchColumn(0);

        $this->object->set('collection', $collection);
        $this->object->set('resource', $resource);
        $this->object->set('menuindex', $lastMenuindex + 1);

        return parent::beforeSave();
    }


}
