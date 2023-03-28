<?php

namespace WF\Tools;

use MODX\Revolution\modX;

class Form extends \WF\Tools
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function process(array $data, $params, &$out)
    {
        $out = is_array($out) ? $out : [];

        if (!is_array($params)) {
            $params = array_map('trim', explode(',', $params));
        }
       
        foreach ($params as $param) {
            $parts = array_map('trim', explode(':', $param));
            $field = $parts[0];
            $value = $data[$field];
            for ($i = 1; $i < count($parts); $i++) {
                $tmps = array_map('trim', explode('=', $parts[$i]));
                $method = $tmps[0];
                if (method_exists($this, $method)) {
                    $args = array_map('trim', explode('|', str_replace('^', '', $tmps[1])));
                    $args = array_merge([$value], $args);
                    $out[$field] = call_user_func_array(__NAMESPACE__ . '\\Form::' . $method, $args);
                }
            }
        }

        return true;
    }

    static public function trim($value, $delim = '')
    {
        return trim($value, $delim);
    }

    static public function trimPhone($value)
    {  
        return preg_replace('/([^\+_0-9]|\_)+/', '', $value);
    }

    static public function normalizeText($value)
    {
        return preg_replace('/\s{2,}/', ' ', trim($value));
    }
}