<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewRepository implements CrudInterface
{
    public function getAll()
    {
        $reviews = Review::orderBy('id', 'asc')->get();
        return $reviews;
    }
    public function findById($id)
    {
        $reviews = Review::with('book')
            ->find($id);
        return $reviews;
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
