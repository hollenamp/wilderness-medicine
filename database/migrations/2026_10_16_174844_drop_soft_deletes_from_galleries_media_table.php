<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Removing an image from a gallery only soft-deleted its pivot row, so it
     * stayed in the gallery. Purge those "removed" rows and drop the column.
     */
    public function up(): void
    {
        DB::table('galleries_media')->whereNotNull('deleted_at')->delete();

        Schema::table('galleries_media', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('galleries_media', function (Blueprint $table) {
            $table->softDeletes();
        });
    }
};
