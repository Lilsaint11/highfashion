<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Remove ANY existing full unique index on (user_id, is_default)
        // Get all indexes on the addresses table
        $indexes = DB::select("PRAGMA index_list('addresses')");

        foreach ($indexes as $index) {
            // Check if this index covers both user_id and is_default
            $indexInfo = DB::select("PRAGMA index_info('{$index->name}')");
            $columns = collect($indexInfo)->pluck('name')->toArray();

            if (in_array('user_id', $columns) && in_array('is_default', $columns)) {
                // This is likely the wrong full unique index — drop it
                DB::statement("DROP INDEX IF EXISTS '{$index->name}'");
            }
        }

        // Step 2: Create the correct partial unique index
        // Only one address per user can have is_default = 1
        DB::statement('CREATE UNIQUE INDEX IF NOT EXISTS addresses_user_default_unique ON addresses (user_id) WHERE is_default = 1');
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS addresses_user_default_unique');

        // Optional: re-add a full unique if you want (but not recommended)
        // DB::statement('CREATE UNIQUE INDEX addresses_user_id_is_default_unique ON addresses (user_id, is_default)');
    }
};