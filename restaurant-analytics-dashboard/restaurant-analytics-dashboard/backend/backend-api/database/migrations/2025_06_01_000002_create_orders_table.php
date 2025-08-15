<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->unsignedBigInteger('restaurant_id')->index();
            $table->integer('order_amount');
            $table->dateTime('order_time')->index();
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
