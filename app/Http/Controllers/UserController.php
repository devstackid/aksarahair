<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {

        $users = User::orderBy('role', 'asc')->get();
        return Inertia::render('Dashboard/User/Index', [
            "users" => $users,
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/User/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|regex:/^\S*$/u',
            'role' => 'required|in:admin,staff',
        ]);

        User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('dashboard.users.add')->with('success', 'User berhasil ditambahkan!');
    }

    public function edit(Request $request, User $user)
    {


        return Inertia::render('Dashboard/User/Edit', [
            // 'auth' => $auth,
            'userAccount' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'password' => 'nullable|string|min:8|regex:/^\S*$/',
            'role' => 'required|in:admin,staff,mitra',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('dashboard.users');
    }



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        $idsToDelete = array_filter($request->ids, fn($id) => $id != auth()->id());

        User::whereIn('id', $idsToDelete)->delete();

        return redirect()->route('dashboard.users')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(User $user)
    {
        if ($user->id == auth()->id()) {
            return redirect()->route('dashboard.users')->with('error', 'Anda tidak dapat menghapus akun anda sendiri.');
        }

        $user->delete();

        return redirect()->route('dashboard.users')->with('success', 'Pengguna berhasil dihapus.');
    }
}
