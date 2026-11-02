<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class GalleryMedia extends Pivot
{
    protected $table = 'galleries_media';

    protected $fillable = [
        'gallery_id',
        'media_id',
        'sort_order',
        'title',
        'description',
    ];
}
