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
        Schema::create('_project', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->String('ProjectName');
            $table->String('Name');
            //$table->text('ShortDescriptionEN')->NULL;
            $table->text('ShortDescriptionBG');
            //$table->longText('DescriptionEN')->NULL;
            $table->longText('DescriptionBG');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_project');
    }
};
