<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\UserTrait;
use App\Models\{
    User,
    Role
};

class AdminController extends Controller
{
    use UserTrait;

    public function index()
    {
        $admins = $this->getUsers(1);

        return $admins;
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

        $roleId = Role::where('name', 'Admin')->first()->id;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId
        ]);

        return response()->json(['user' => $user], 200);
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        User::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
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

    public function getById($id)
    {
        $user = User::findOrFail($id);

        return $user;
    }
}
