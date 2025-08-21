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
      if(!Schema::hasTable('orderitems')){
          Schema::create('orderitems', function (Blueprint $table) {
            $table->id();
            $table->string('productName')->nullable(true);
            $table->integer('product_Id')->nullable(true);
            $table->string('variationName')->nullable(true);
            $table->string('imgUrl')->nullable(true);
            $table->integer('quantity')->nullable(true);
            $table->integer('price')->nullable(true);
            $table->foreignId('orderdetail_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
      }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderitems');
    }
};
