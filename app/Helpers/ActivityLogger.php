<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Log;

class ActivityLogger
{
    public static function log(string $message, Request $request)
    {
        if (!Auth::check()) return; // Cegah error jika belum login

        Log::create([
            'id' => Str::uuid(),
            'user_id' => Auth::id(),
            'message' => $message,
            'device' => $request->userAgent(),
            'ip_address' => $request->ip(),
        ]);
    }
}
