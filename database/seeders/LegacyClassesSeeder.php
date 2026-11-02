<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LegacyClassesSeeder extends Seeder
{
    /**
     * Import the archived Drupal class pages into courses.
     */
    public function run(): void
    {
        if (! is_file(database_path('data/legacy-classes.json'))) {
            return;
        }

        $this->command->call('classes:import-legacy');
    }
}
