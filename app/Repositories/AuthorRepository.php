<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthorRepository implements CrudInterface
{
    public function getAll()
    {
        $authors = Author::all();
        return $authors;
    }
    public function findById($id)
    {
        $authors = Author::find($id);
        return $authors;
    }
    public function get10AuthorNames()
    {
        $authors = DB::table('author')
            ->select('author_name')
            ->orderBy('author_name')
            ->take(10)
            ->get();

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
}
