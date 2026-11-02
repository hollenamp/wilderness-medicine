<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LegacyBlogSeeder extends Seeder
{
    /**
     * Import the archived Drupal blog posts into blog_posts.
     */
    public function run(): void
    {
        $this->command->call('blog:import-legacy');
    }
}
