<?php

use App\Models\Page;
use App\Support\SiteLogo;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Page::query()->each(function (Page $page): void {
            $content = $page->content;

            if (! is_array($content)) {
                return;
            }

            $updated = SiteLogo::remapPageContent($content);

            if ($updated === $content) {
                return;
            }

            $page->forceFill(['content' => $updated])->save();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
