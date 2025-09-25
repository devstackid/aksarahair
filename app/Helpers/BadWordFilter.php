<?php

namespace App\Helpers;

class BadWordFilter
{
    // daftar kata kasar/vulgar
    protected static $badWords = [
        'kasar1',
        'kasar2',
        'bodoh',
        'anjing',
        'bangsat',
        'tolol',
        'babi',
        'kontol',
        'memek',
        'goblok',
        'kampret',
        'perek',
        'pelacur',
        'lonte',
        'jancok',
        'idiot',
        'gila',
        'setan',
        'iblis',
        'asu',
        'bejad',
        'brengsek',
        'dancok',
        'keparat',
        'ngentot',
        'pepek',
        'pantek',
        'tai',
        'titit',
        'vagina',
        'penis',
        'fuck',
        'bitch',
        'bastard',
        'dick',
        'asshole',
        'slut',
        'whore',
        'motherfucker',
        'shit',
        'jerk',
    ];

    /**
     * Filter teks dan sensor kata kasar menjadi ****
     */
    public static function filter(string $text): string
    {
        foreach (self::$badWords as $word) {
            $pattern = '/\b' . preg_quote($word, '/') . '\b/i'; // case-insensitive
            $text = preg_replace($pattern, str_repeat('*', mb_strlen($word)), $text);
        }

        return $text;
    }
}
