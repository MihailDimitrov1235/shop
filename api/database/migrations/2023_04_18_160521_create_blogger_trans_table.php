<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogger_trans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blogger_id')->constrained('bloggers')->onDelete('cascade');
            $table->string('name');
            $table->string('occupation');
            $table->longText('description');
            $table->string('lang');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogger_trans');
    }
};
