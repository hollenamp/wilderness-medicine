<?php

namespace App\Support;

class FeaturedCourseLinks
{
    /**
     * @var array<string, string>
     */
    public const BY_TITLE = [
        'Wilderness First Aid' => '/classes/wfa16',
        'Wilderness First Aid Intermediate' => '/classes/wfa24',
        'Advanced Wilderness First Aid' => '/classes/awfa',
        'Wilderness First Responder / WEMT' => '/classes/wfr',
    ];

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    public static function remapWelcomeContent(array $content): array
    {
        $items = $content['courses']['items'] ?? null;

        if (! is_array($items)) {
            return $content;
        }

        foreach ($items as $index => $item) {
            if (! is_array($item)) {
                continue;
            }

            $title = $item['title'] ?? null;

            if (! is_string($title) || ! isset(self::BY_TITLE[$title])) {
                continue;
            }

            $content['courses']['items'][$index]['href'] = self::BY_TITLE[$title];
        }

        return $content;
    }
}
