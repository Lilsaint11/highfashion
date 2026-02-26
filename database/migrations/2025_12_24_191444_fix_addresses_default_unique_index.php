<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Find and drop any existing unique index on (user_id, is_default)
        $indexes = DB::select("
            SELECT indexname 
            FROM pg_indexes 
            WHERE tablename = 'addresses'
        ");

        foreach ($indexes as $index) {
            $columns = DB::select("
                SELECT a.attname as column_name
                FROM pg_index i
                JOIN pg_class c ON c.oid = i.indrelid
                JOIN pg_class ic ON ic.oid = i.indexrelid
                JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(i.indkey)
                WHERE c.relname = 'addresses' AND ic.relname = ?
            ", [$index->indexname]);

            $columnNames = collect($columns)->pluck('column_name')->toArray();

            if (in_array('user_id', $columnNames) && in_array('is_default', $columnNames)) {
                DB::statement("ALTER TABLE addresses DROP CONSTRAINT IF EXISTS \"{$index->indexname}\"");
            }
        }

        // Step 2: Create correct partial unique index for PostgreSQL
        DB::statement('CREATE UNIQUE INDEX IF NOT EXISTS addresses_user_default_unique ON addresses (user_id) WHERE is_default = true');
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS addresses_user_default_unique');
    }
};