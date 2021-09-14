<?php

declare (strict_types=1);

namespace LukasHron\FormFiller;

/**
 * Class Filler
 * @package LukasHron\FormFiller
 */
class Filler
{
    public const
        MODE_DEVELOPMENT = false,
        MODE_PRODUCTION = true;

    /**
     * @param null $mode
     */
    public static function enabled($mode = null)
    {
        if (self::detectActiveFromMode($mode)) {
            echo '<script type="text/javascript" async>';
                array_map(function ($file) { echo '(function() {', file_get_contents($file), '})();'; }, [
                    __DIR__ . '/js/FormFiller.js'
                ]);
            echo '</script>';
        }
    }

    /**
     * @param $mode
     * @return bool
     */
    private static function detectActiveFromMode($mode): bool
    {
        if ($mode === self::MODE_DEVELOPMENT) {
            return true;
        }

        return false;
    }
}