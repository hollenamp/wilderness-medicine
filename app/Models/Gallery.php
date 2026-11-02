<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
    ];

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'galleries_media')
            ->using(GalleryMedia::class)
            ->withPivot('sort_order', 'title', 'description')
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }
}
