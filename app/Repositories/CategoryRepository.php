<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryRepository implements CrudInterface
{
    public function getAll()
    {
        $categories = Category::orderBy('id', 'asc')->get();
        return $categories;
    }
    public function findById($id)
    {
        $categories = Category::with('book')
            ->find($id);
        return $categories;
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
