<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\User;
use Illuminate\Http\Request;

class UserRepository implements CrudInterface
{
    public function getAll()
    {
        $users = User::all();
        return $users;
    }
    public function findById($id)
    {
        $users = User::find($id);
        return $users;
    }
    public function create(Request $request)
    {
       
    }
    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
}
