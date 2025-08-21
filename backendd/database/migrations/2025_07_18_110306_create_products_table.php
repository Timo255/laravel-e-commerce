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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('nameShop')->nullable();
            $table->string('nameProduct')->nullable();
            $table->string('category')->nullable();
            $table->integer('price')->nullable();
            $table->string('img')->nullable();
            $table->string('imgLg439')->nullable();
            $table->string('imgMd309')->nullable();
            $table->string('imgMd360')->nullable();
            $table->string('isSlider')->nullable();
            $table->string('imgProductCard')->nullable();
            $table->string('variationTitle')->nullable();
            $table->string('isOffer')->nullable();
            $table->string('relatedProduct')->nullable();
            $table->integer('quantity')->nullable();
            $table->string('newProduct')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
