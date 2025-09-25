<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->user();

        // Cek email dari social user, wajib ada untuk updateOrCreate
        $email = $socialUser->getEmail();

        if (!$email) {
            // Bisa redirect balik dengan error message, email wajib
            return redirect()->route('login')->withErrors([
                'email' => 'Tidak dapat mengambil email dari ' . ucfirst($provider) . '. Silakan gunakan metode login lain.'
            ]);
        }

        // UpdateOrCreate user berdasarkan email
        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'id' => (string) Str::uuid(), // buat UUID baru jika user baru
                'name' => $socialUser->getName() ?? $socialUser->getNickname() ?? 'User',
                'email_verified_at' => now(),
                'password' => bcrypt(uniqid()), // password random
                'google_image_url' => $socialUser->getAvatar(),
            ]
        );

        Auth::login($user, true);

        return redirect()->intended('/');
    }
}
