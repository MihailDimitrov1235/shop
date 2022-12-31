<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{
    User,
    Role
};

class UserController extends Controller
{
    public function index()
    {
        $query = User::where('role_id', 2);

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('email')) {
            $query->where('email', 'LIKE', '%'.request()->query('email').'%');
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if(request()->query('total')) {
            $users = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $users = $query->paginate(10)->withQueryString();
        }

        return $users;
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($data)) {
            $user = auth()->user();
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

    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        User::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }
}
