<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    //spublic function getBookReview

    public function getBookReviewCondition(Request $request, $bookId)
    {
        $sortArray = $request->query("sort");
        $paginateValue = $request->query("paginate");

        foreach ($sortArray as $key => $value) {
            $sortKey = $key;
            $sortValue = $value;
        }

        switch ($sortValue) {
            case ('newestToOldest'):
                $reviews = DB::table('review')
                    ->where('book_id', $bookId)
                    ->select('rating_start', DB::raw('count(id) as count'))
                    ->groupBy('rating_start')
                    //->orderByDesc('review_date')
                    ->paginate($paginateValue);

                return $reviews;
                break;
            case ('oldestToNewest'):
                $reviews = DB::table('review')
                    ->where('book_id', $bookId)
                    ->orderBy('review_date')
                    ->paginate($paginateValue);

                return $reviews;

                break;
            default:
                $msg = 'Something went wrong.';
        }
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
