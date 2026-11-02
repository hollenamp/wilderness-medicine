<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailLogSetting extends Model
{
    protected $fillable = [
        'enabled',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    public static function current(): self
    {
        return static::query()->firstOrCreate(['id' => 1], ['enabled' => true]);
    }
}
