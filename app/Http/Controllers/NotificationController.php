<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
{
    return Notification::whereDate('created_at', now()->toDateString())
        ->orderBy('created_at', 'desc')
        ->get();
}


    public function markAllAsRead()
{
    $user = Auth::user();

    $user->notifications()->wherePivot('read_at', null)->update([
        'notification_users.read_at' => now(),
    ]);

    return;
}


}
