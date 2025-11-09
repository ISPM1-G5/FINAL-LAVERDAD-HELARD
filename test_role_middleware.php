<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Auth;
use App\Models\User;

echo "Testing role middleware logic...\n";

// Test admin user
$admin = User::where('email', 'admin@example.com')->first();
if ($admin) {
    echo "Admin user found: " . $admin->email . " - Role: " . $admin->role . "\n";
    echo "Has admin role: " . ($admin->hasRole('admin') ? 'Yes' : 'No') . "\n";
    echo "Has moderator role: " . ($admin->hasRole('moderator') ? 'Yes' : 'No') . "\n";
    echo "Has author role: " . ($admin->hasRole('author') ? 'Yes' : 'No') . "\n";
} else {
    echo "Admin user not found!\n";
}

echo "\n";

// Test moderator user
$moderator = User::where('email', 'moderator@example.com')->first();
if ($moderator) {
    echo "Moderator user found: " . $moderator->email . " - Role: " . $moderator->role . "\n";
    echo "Has admin role: " . ($moderator->hasRole('admin') ? 'Yes' : 'No') . "\n";
    echo "Has moderator role: " . ($moderator->hasRole('moderator') ? 'Yes' : 'No') . "\n";
    echo "Has author role: " . ($moderator->hasRole('author') ? 'Yes' : 'No') . "\n";
} else {
    echo "Moderator user not found!\n";
}

echo "\n";

// Test author user
$author = User::where('email', 'author@example.com')->first();
if ($author) {
    echo "Author user found: " . $author->email . " - Role: " . $author->role . "\n";
    echo "Has admin role: " . ($author->hasRole('admin') ? 'Yes' : 'No') . "\n";
    echo "Has moderator role: " . ($author->hasRole('moderator') ? 'Yes' : 'No') . "\n";
    echo "Has author role: " . ($author->hasRole('author') ? 'Yes' : 'No') . "\n";
} else {
    echo "Author user not found!\n";
}

echo "\n";

// Test subscriber user
$subscriber = User::where('email', 'test@example.com')->first();
if ($subscriber) {
    echo "Subscriber user found: " . $subscriber->email . " - Role: " . $subscriber->role . "\n";
    echo "Has admin role: " . ($subscriber->hasRole('admin') ? 'Yes' : 'No') . "\n";
    echo "Has moderator role: " . ($subscriber->hasRole('moderator') ? 'Yes' : 'No') . "\n";
    echo "Has author role: " . ($subscriber->hasRole('author') ? 'Yes' : 'No') . "\n";
} else {
    echo "Subscriber user not found!\n";
}
