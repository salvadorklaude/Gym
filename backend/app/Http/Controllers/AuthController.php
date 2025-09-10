<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Hardcoded users
    private $users = [
        [
            'id' => 1,
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'password', // plain text for demo
            'role' => 'admin',
        ],
        [
            'id' => 2,
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => 'password', // plain text for demo
            'role' => 'user',
        ]
    ];

    // LOGIN (without DB)
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Search user in hardcoded list
        $user = collect($this->users)->firstWhere('email', $validated['email']);

        if (!$user || $validated['password'] !== $user['password']) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Instead of Sanctum token, return a fake token
        $token = base64_encode($user['email'] . '|' . now());

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // REGISTER (just returns error, no DB)
    public function register(Request $request)
    {
        return response()->json([
            'message' => 'Registration disabled in demo mode (use hardcoded accounts).',
        ], 403);
    }

    // LOGOUT (dummy)
    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logged out (demo mode)']);
    }

    // CURRENT USER INFO (fake)
    public function me(Request $request)
    {
        return response()->json(['message' => 'Demo mode, no real user session']);
    }
}
