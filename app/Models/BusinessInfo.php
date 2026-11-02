<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessInfo extends Model
{
    protected $table = 'business_info';

    protected $fillable = [
        'business_name',
        'business_phone',
        'business_phone_two',
        'business_sms',
        'business_sms_two',
        'business_email',
        'business_address',
        'business_hours',
        'tagline',
        'logo_path',
        'facebook_url',
        'instagram_url',
        'twitter_url',
        'linkedin_url',
    ];

    public static function current(): self
    {
        $filled = static::query()
            ->whereNotNull('business_name')
            ->where('business_name', '!=', '')
            ->orderBy('id')
            ->first();

        if ($filled) {
            return $filled;
        }

        $existing = static::query()->orderBy('id')->first();

        if ($existing) {
            return $existing;
        }

        return static::query()->create(['business_name' => '']);
    }
}
