<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'uuid',
        'filename',
        'original_name',
        'mime_type',
        'extension',
        'size',
        'path',
        'disk',
        'alt_text',
        'url',
    ];

    public function galleries(): BelongsToMany
    {
        return $this->belongsToMany(Gallery::class, 'galleries_media')
            ->using(GalleryMedia::class)
            ->withPivot('sort_order', 'title', 'description')
            ->withTimestamps();
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_media');
    }

    protected function url(): Attribute
    {
        return Attribute::get(
            fn () => Storage::disk($this->disk ?? 'public')->url($this->path)
        );
    }
}
