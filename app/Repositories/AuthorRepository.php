<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorRepository implements CrudInterface
{
    public function getAll()
    {
        $authors = Author::orderBy('id', 'asc')->get();
        return $authors;
    }
    public function findById($id)
    {
        $authors = Author::with('book')
            ->find($id);
        return $authors;
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
    public function scopeName($query, $request)
    {
        if ($request->has('category_name')) {
            $query->where('category_name', 'LIKE', '%' . $request->category_name . '%');
        }

        return $query;
    }
}
