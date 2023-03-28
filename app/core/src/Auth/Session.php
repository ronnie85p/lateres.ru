<?php

namespace App\Auth;
use MODX\Revolution\modX;

class Session extends \App\Core 
{
    public $handler;

    function __construct(modX &$modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->handler = $modx->getService('handler', \modSessionHandler::class);
    }

    public function getList($where = [], $options = [])
    {
        $options = array_merge([
            'sortby' => 'access',
            'sortdir' => 'ASC',
            'offset' => 0,
            'limit' => 20,
            'where' => $where,
        ], $options);

        $offset = (int) $options['offset'];
        $limit = (int) $options['limit'];
        $sortby = $options['sortby'];
        $sortdir = $options['sortdir'];
        $where = $options['where'];
        $where = is_array($where) ? $where : [];

        if (!empty($options['user'])) {
            $where['data:RLIKE'] = "modx\.user\.contextTokens\|a\:[0-9]+\:\{s\:[0-9]+\:\"web\";i\:{$options['user']}";
        }

        $q = $this->modx->newQuery(\modSession::class);
        $q->select($this->modx->getSelectColumns(\modSession::class));
        $q->where($where);
        $q->limit($limit, $offset);
        $q->sortby($sortby, $sortdir);

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
 
        foreach ($results as &$item) {
            $item['data'] = $this->unserialize($item['data']);
            $item['active'] = $this->isActive($item);
        }

        return $results;
    }

    public function get($id, $options = [])
    {
        $session = $this->getList(['id' => $id], $options)[0];
        if (empty($session)) {
            return ['active' => false];
        }

        return $session;
    }

    public function isActive($session_data, $ctx = 'web')
    {
        return !empty($session_data['data']['modx.user.contextTokens'][$ctx]);
    }

    public function destroy($id)
    {
        return $this->handler->destroy($id);
    }

    private static function unserialize($session_data) {
        $return_data = array();
        $offset = 0;
        while ($offset < strlen($session_data)) {
            if (!strstr(substr($session_data, $offset), "|")) {
                return false;
            }
            $pos = strpos($session_data, "|", $offset);
            $num = $pos - $offset;
            $varname = substr($session_data, $offset, $num);
            $offset += $num + 1;
            $data = unserialize(substr($session_data, $offset));
            $return_data[$varname] = $data;
            $offset += strlen(serialize($data));
        }
        return $return_data;
    }
}