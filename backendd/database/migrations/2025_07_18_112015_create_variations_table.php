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
        Schema::create('variations', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('name')->nullable();;
            $table->string('classname')->nullable();;
            $table->string('textData')->nullable();;
            $table->string('imgUrl')->nullable();;
            $table->integer('priceV')->nullable();;
            $table->string('colorData1')->nullable();;
            $table->integer('productsId')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variations');
    }
};
