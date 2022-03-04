<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryRepository implements CrudInterface
{
    public function getAll()
    {
        $categories = Category::all();
        return $categories;
    }
    public function findById($id)
    {
        $categories = Category::find($id);
        return $categories;
    }
    public function get5CategoryNames()
    {
        $categories = DB::table('category')
            ->select('category_name')
            ->orderBy('category_name')
            ->take(5)
            ->get();

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
