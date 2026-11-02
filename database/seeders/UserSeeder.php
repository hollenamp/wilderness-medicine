<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@advantagemediapartners.com',
            'admin' => 1,
            'password' => 'bcfddb14!DPbpzr?dBJ',
        ]);

    }
}
