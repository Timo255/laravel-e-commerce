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
        Schema::create('orderdetails', function (Blueprint $table) {
            $table->id();
            $table->integer('subtotal')->nullable(false);
            $table->integer('total')->nullable(false);
            $table->string('delivery_status')->nullable(true);
            $table->string('payment_status')->nullable(true);
            $table->string('customerId')->nullable(true);
            $table->foreignId("user_id")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderdetails');
    }
};
