<?php

use App\Models\Page;
use App\Support\FeaturedCourseLinks;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $welcome = Page::query()->where('route_name', 'welcome')->first();

        if ($welcome && is_array($welcome->content)) {
            $welcome->update([
                'content' => FeaturedCourseLinks::remapWelcomeContent($welcome->content),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $welcome = Page::query()->where('route_name', 'welcome')->first();

        if (! $welcome || ! is_array($welcome->content)) {
            return;
        }

        $content = $welcome->content;
        $items = $content['courses']['items'] ?? null;

        if (! is_array($items)) {
            return;
        }

        foreach ($items as $index => $item) {
            if (! is_array($item)) {
                continue;
            }

            $href = $item['href'] ?? null;

            if (is_string($href) && str_starts_with($href, '/classes/')) {
                $content['courses']['items'][$index]['href'] = '/contact-us';
            }
        }

        $welcome->update(['content' => $content]);
    }
};
