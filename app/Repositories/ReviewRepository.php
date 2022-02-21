<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewRepository implements CrudInterface
{
    public function getAll()
    {
        $reviews = Review::all();
        return $reviews;
    }
    public function findById($id)
    {
        $reviews = Review::find($id);
        return $reviews;
    }
    public function findReviewOfBook($id)
    {
        $reviews = Review::where('book_id', $id)->get();
        return $reviews;
    }
    public function create(Request $request)
    {
        $reviews = new Review();
        $reviews->book_id = $request->book_id;
        $reviews->review_title = $request->review_title;
        $reviews->review_details = $request->review_details;
        $reviews->rating_start = $request->rating_start;
        $reviews->save();

        return $reviews;
    }
    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
}
