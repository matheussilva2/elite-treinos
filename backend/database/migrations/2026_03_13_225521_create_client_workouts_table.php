<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_workouts', function (Blueprint $table) {
            $table->id();
            $table->string('workout_code', 1);
            $table->foreign('workout_code')->references('code')->on('workouts');
            $table->foreignId('client_id')->constrained('clients', 'user_id')->cascadeOnDelete();
            $table->unique(['client_id', 'workout_code']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_workouts');
    }
};
