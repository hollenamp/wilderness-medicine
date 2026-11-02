<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LegacyStoreSeeder extends Seeder
{
    /**
     * Import the archived Drupal store catalog into products.
     */
    public function run(): void
    {
        if (! is_file(database_path('data/legacy-store.json'))) {
            return;
        }

        $this->command->call('store:import-legacy');
    }
}
