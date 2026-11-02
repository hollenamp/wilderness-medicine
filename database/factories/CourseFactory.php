<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numerify('###'),
            'nav_label' => null,
            'excerpt' => fake()->paragraph(),
            'content' => '<p>'.fake()->paragraphs(2, true).'</p>',
            'status' => 'draft',
            'published_at' => null,
            'sort_order' => fake()->numberBetween(0, 20),
            'original_url' => null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => now()->subDay(),
        ]);
    }
}
