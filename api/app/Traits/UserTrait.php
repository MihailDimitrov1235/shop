<?php

namespace App\Traits;
use App\Models\{
    User
};

trait UserTrait {

    public function getUsers($role = 2) {
        $query = User::where('role_id', $role);

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
}