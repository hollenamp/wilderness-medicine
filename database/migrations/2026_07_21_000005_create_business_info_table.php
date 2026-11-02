<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_info', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('business_phone')->nullable();
            $table->string('business_phone_two')->nullable();
            $table->string('business_sms')->nullable();
            $table->string('business_sms_two')->nullable();
            $table->string('business_email')->nullable();
            $table->text('business_address')->nullable();
            $table->text('business_hours')->nullable();
            $table->string('tagline')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_info');
    }
};
