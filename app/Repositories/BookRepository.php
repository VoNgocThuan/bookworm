<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Book;
use Illuminate\Http\Request;

class BookRepository implements CrudInterface
{
    public function getAll()
    {
        $books = Book::with('author')->get();
        return $books;
    }
    public function findById($id)
    {
        $books = Book::with('author', 'category')->find($id);
        return $books;
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
