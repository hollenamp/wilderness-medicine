<?php

namespace Database\Seeders;

use App\Models\BusinessInfo;
use Illuminate\Database\Seeder;

class BusinessInfoSeeder extends Seeder
{
    /**
     * Seed Wilderness Medicine Outfitters business details from content.md.
     */
    public function run(): void
    {
        $businessInfo = BusinessInfo::current();

        $businessInfo->forceFill([
            'business_name' => 'Wilderness Medicine Outfitters',
            'business_phone' => '(303) 688-5176',
            'business_email' => 'carl@wildernessmedicine.com',
            'business_address' => '2477 County Road 132, Elizabeth, Colorado 80107',
            'business_hours' => 'Best phone contact: 9:00–10:00 am MT. Class schedules vary.',
            'tagline' => 'Wilderness medicine training since 1967.',
            'linkedin_url' => 'http://www.linkedin.com/pub/carl-weil/11/770/245',
        ])->save();
    }
}
