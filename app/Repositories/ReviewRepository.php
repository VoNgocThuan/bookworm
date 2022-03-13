<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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

    public function getBookReviewListing($bookId)
    {
        $reviews = DB::table('review')
            ->where('book_id', $bookId)
            ->select('rating_start as star', DB::raw('count(id) as count'))
            ->groupBy('rating_start')
            ->get();

        return $reviews;
    }

    public function getBookReviewTotal($bookId)
    {
        $reviews = DB::table('review')
            ->where('book_id', $bookId)
            ->count('book_id');

        return $reviews;
    }

    public function getBookReviewAvgStar($bookId)
    {
        $reviews = DB::table('review')
            ->where('book_id', $bookId)
            ->avg('rating_start');

        return $reviews;
    }

    public function getBookReviewCondition(Request $request, $bookId)
    {
        $filterArray = $request->query("filter");
        $sortArray = $request->query("sort");
        $paginateValue = $request->query("paginate");

        if (is_array($filterArray) || is_object($filterArray)) {
            foreach ($filterArray as $key => $value) {
                $filterKey = $key;
                $filterValue = $value;
            }
        }

        foreach ($sortArray as $key => $value) {
            $sortKey = $key;
            $sortValue = $value;
        }

        switch ($sortValue) {
            case ('newestToOldest'):
                if ($request->has("filter")) {
                    $reviews = Review::where('book_id', $bookId)
                        ->where('rating_start', $filterValue)
                        ->orderByDesc('review_date')
                        ->paginate($paginateValue);
                } else {
                    $reviews = Review::where('book_id', $bookId)
                        ->where('book_id', $bookId)
                        ->orderByDesc('review_date')
                        ->paginate($paginateValue);
                }
                return $reviews;
                break;
            case ('oldestToNewest'):
                if ($request->has("filter")) {
                    $reviews = Review::where('book_id', $bookId)
                        ->where('book_id', $bookId)
                        ->where('rating_start', $filterValue)
                        ->orderBy('review_date')
                        ->paginate($paginateValue);
                } else {
                    $reviews = Review::where('book_id', $bookId)
                        ->where('book_id', $bookId)
                        ->orderBy('review_date')
                        ->paginate($paginateValue);
                }
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
        $reviews->review_date = Carbon::now();
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
