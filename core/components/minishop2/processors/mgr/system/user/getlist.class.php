<?php

// namespace MS2\Processors\Mgr\System\User;

use MODX\Revolution\Processors\Model\GetListProcessor;

// class GetList extends GetListProcessor 
class msUserGetListProcessor extends GetListProcessor
{
    public $classKey = 'modUser';
    public $languageTopics = ['user'];
    public $defaultSortField = 'username';

    /**
    * @param xPDOQuery $c
    *
    * @return xPDOQuery
    */
    public function prepareQueryBeforeCount(xPDO\Om\xPDOQuery $c)
    {
        $c->leftJoin('modUserProfile', 'Profile');

        $id = $this->getProperty('id');
        if (!empty($id) and $this->getProperty('combo')) {
            $c->sortby("FIELD (modUser.id, {$id})", "DESC");
        }

        $query = $this->getProperty('query', '');
        if (!empty($query)) {
            $c->where([
                'modUser.username:LIKE' => "%{$query}%",
                'OR:Profile.fullname:LIKE' => "%{$query}%",
                'OR:Profile.email:LIKE' => "%{$query}%",
            ]);
        }

        return $c;
    }

    /**
    * @param xPDOQuery $c
    *
    * @return xPDOQuery
    */
    public function prepareQueryAfterCount(xPDO\Om\xPDOQuery $c)
    {
        $c->select($this->modx->getSelectColumns('modUser', 'modUser'));
        $c->select($this->modx->getSelectColumns('modUserProfile', 'Profile', '', ['fullname', 'email']));

        return $c;
    }

    public function prepareRow(xPDO\Om\xPDOObject $object)
    {
        $array = $object->toArray();

        if ($this->getProperty('combo')) {
            $array = [
                'id'       => $array['id'],
                'username' => $array['username'],
                'fullname' => !empty($array['fullname']) ? $array['fullname'] : $array['username'],
            ];
        }

        return $array;
    }
}

return 'msUserGetListProcessor';