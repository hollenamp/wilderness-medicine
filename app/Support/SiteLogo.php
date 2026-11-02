<?php

namespace App\Support;

class SiteLogo
{
    public const DEFAULT_PATH = '/images/wilderness-medicine-outfitters-logo-color-01.png';

    /**
     * @var array<string, string>
     */
    public const LEGACY_PATHS = [
        '/images/wm-logo.png' => self::DEFAULT_PATH,
        'images/wm-logo.png' => self::DEFAULT_PATH,
    ];

    public static function resolve(?string $path, ?string $fallback = null): string
    {
        $fallback ??= self::DEFAULT_PATH;
        $trimmed = is_string($path) ? trim($path) : '';

        if ($trimmed === '') {
            return $fallback;
        }

        return self::LEGACY_PATHS[$trimmed] ?? $trimmed;
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    public static function remapPageContent(array $content): array
    {
        $logo = $content['hero']['logo'] ?? null;

        if (! is_string($logo)) {
            return $content;
        }

        $content['hero']['logo'] = self::resolve($logo);

        return $content;
    }
}
