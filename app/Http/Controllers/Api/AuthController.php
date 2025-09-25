<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
{
    $request->validate([
        'name'     => 'required|string|max:100',
        'email'    => 'required|email|unique:users',
        'password' => 'required|string|min:6',
        // opsional: kalau user mau bikin username
        'username' => 'nullable|string|max:50|unique:users',
    ]);

    $user = User::create([
        'name'     => $request->name,
        'username' => $request->username ?? explode('@', $request->email)[0], // auto-isi kalau kosong
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('mobile-token')->plainTextToken;

    return response()->json([
        'user'  => $user,
        'token' => $token,
    ], 201);
}

// LOGIN
public function login(Request $request)
{
    $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('username', $request->username)
        ->orWhere('email', $request->username) // bisa login pakai email juga
        ->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'username' => ['Username atau password salah.'],
        ]);
    }

    $token = $user->createToken('mobile-token')->plainTextToken;

    return response()->json([
        'user'  => $user,
        'token' => $token,
    ]);
}

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }
}
