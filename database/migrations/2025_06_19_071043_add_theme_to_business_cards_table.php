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
        Schema::table('business_cards', function (Blueprint $table) {
            //
            $table->string('theme');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
            Schema::table('business_cards', function (Blueprint $table) {
               $table->dropColumn('theme'); // themeカラムを削除
           });
    }
};
