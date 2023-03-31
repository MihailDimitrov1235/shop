<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{
    User,
    Role,
    Cart
};
use App\Traits\UserTrait;

class UserController extends Controller
{
    use UserTrait;

    public function index()
    {
        $users = $this->getUsers(2);

        return $users;
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($data)) {
            $user = auth()->user()->load(['cart']);
            $token = auth()->user()->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token, 'user' => $user], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function register(Request $request)
    {
        $validator = validator($request->only('name', 'email', 'password'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8'
            ],
            [
                'email' => 'Имейлът вече е регистриран'
            ]
        );

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $roleId = Role::where('name', 'User')->first()->id;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId
        ]);

        Cart::create(['user_id' => $user->id]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function profile()
    {
        $user = auth()->user();

        return response()->json($user, 200);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function store(Request $request)
    {
        $validator = validator($request->only('name', 'email', 'password'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8'
            ],
            [
                'email' => 'email-registered-error'
            ]
        );

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $roleId = Role::where('name', 'User')->first()->id;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId
        ]);

        return response()->json(['user' => $user], 200);
    }

    public function edit(Request $request, $id)
    {
        $validator = validator($request->only('name', 'email'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:users,email,' . $id
            ],
            [
                'email' => 'email-registered-error'
            ]
        );

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return response()->json(['user' => $user], 200);
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        User::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($id)
    {
        $user = User::findOrFail($id);

        return $user;
    }
}
