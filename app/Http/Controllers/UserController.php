<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,moderator,editor,author,subscriber',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'created',
            'model_type' => 'User',
            'model_id' => $user->id,
            'new_values' => $user->toArray(),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,moderator,editor,author,subscriber',
        ]);

        $oldValues = $user->toArray();

        $user->update($request->only(['name', 'email', 'role']));

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'updated',
            'model_type' => 'User',
            'model_id' => $user->id,
            'old_values' => $oldValues,
            'new_values' => $user->toArray(),
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $oldValues = $user->toArray();

        $user->delete();

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'deleted',
            'model_type' => 'User',
            'model_id' => $user->id,
            'old_values' => $oldValues,
        ]);

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
