<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Users table indexes for performance
        Schema::table('users', function (Blueprint $table) {
            if (!$this->hasIndex('users', 'users_email_index')) {
                $table->index('email');
            }
            if (!$this->hasIndex('users', 'users_role_index')) {
                $table->index('role');
            }
            if (!$this->hasIndex('users', 'users_created_at_index')) {
                $table->index('created_at');
            }
        });

        // Personal access tokens (Sanctum) indexes
        if (Schema::hasTable('personal_access_tokens')) {
            Schema::table('personal_access_tokens', function (Blueprint $table) {
                if (!$this->hasIndex('personal_access_tokens', 'personal_access_tokens_tokenable_id_index')) {
                    $table->index('tokenable_id');
                }
                if (!$this->hasIndex('personal_access_tokens', 'personal_access_tokens_expires_at_index')) {
                    $table->index('expires_at');
                }
            });
        }

        // Article interactions indexes
        if (Schema::hasTable('article_interactions')) {
            Schema::table('article_interactions', function (Blueprint $table) {
                if (!$this->hasIndex('article_interactions', 'article_interactions_user_id_index')) {
                    $table->index('user_id');
                }
                if (!$this->hasIndex('article_interactions', 'article_interactions_article_id_index')) {
                    $table->index('article_id');
                }
                if (!$this->hasIndex('article_interactions', 'article_interactions_created_at_index')) {
                    $table->index('created_at');
                }
            });
        }

        // Sessions table indexes
        if (Schema::hasTable('sessions')) {
            Schema::table('sessions', function (Blueprint $table) {
                if (!$this->hasIndex('sessions', 'sessions_user_id_index')) {
                    $table->index('user_id');
                }
                if (!$this->hasIndex('sessions', 'sessions_last_activity_index')) {
                    $table->index('last_activity');
                }
            });
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['email']);
            $table->dropIndex(['role']);
            $table->dropIndex(['created_at']);
        });

        if (Schema::hasTable('personal_access_tokens')) {
            Schema::table('personal_access_tokens', function (Blueprint $table) {
                $table->dropIndex(['tokenable_id']);
                $table->dropIndex(['expires_at']);
            });
        }

        if (Schema::hasTable('article_interactions')) {
            Schema::table('article_interactions', function (Blueprint $table) {
                $table->dropIndex(['user_id']);
                $table->dropIndex(['article_id']);
                $table->dropIndex(['created_at']);
            });
        }

        if (Schema::hasTable('sessions')) {
            Schema::table('sessions', function (Blueprint $table) {
                $table->dropIndex(['user_id']);
                $table->dropIndex(['last_activity']);
            });
        }
    }

    private function hasIndex($table, $index)
    {
        $indexes = Schema::getConnection()
            ->getDoctrineSchemaManager()
            ->listTableIndexes($table);
        
        return array_key_exists($index, $indexes);
    }
};
