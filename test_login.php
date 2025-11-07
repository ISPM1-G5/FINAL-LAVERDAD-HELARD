<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Auth;
use App\Models\User;

echo "Testing login logic...\n";

$user = User::where('email', 'test@example.com')->first();
if ($user) {
    echo "User found: " . $user->email . "\n";

    if (Auth::attempt(['email' => 'test@example.com', 'password' => 'password123'])) {
        echo "Login successful!\n";
        echo "Authenticated user: " . Auth::user()->email . "\n";
    } else {
        echo "Login failed!\n";
    }
} else {
    echo "User not found!\n";
}
