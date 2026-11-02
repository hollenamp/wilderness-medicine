<?php

use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * @var list<string>
     */
    private array $removedRouteNames = ['about', 'faqs', 'reviews', 'services'];

    /**
     * @var list<string>
     */
    private array $removedPaths = ['/about', '/faqs', '/reviews', '/services'];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Page::query()->whereIn('route_name', $this->removedRouteNames)->delete();
        MenuItem::query()->whereIn('url', $this->removedPaths)->delete();

        $welcome = Page::query()->where('route_name', 'welcome')->first();

        if ($welcome && is_array($welcome->content)) {
            $content = $welcome->content;
            $items = $content['courses']['items'] ?? null;

            if (is_array($items)) {
                foreach ($items as $index => $item) {
                    if (! is_array($item)) {
                        continue;
                    }

                    if (($item['href'] ?? null) === '/services') {
                        $content['courses']['items'][$index]['href'] = '/contact-us';
                    }
                }

                $welcome->update(['content' => $content]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
