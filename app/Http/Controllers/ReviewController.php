<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews = $this->reviewRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Review List',
            'data'    => $reviews
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'review_title' => 'required|alpha_num|max:120',
            'review_details' => 'nullable'
        ], [
            'review_title.required' => 'You have not entered the review title!',
            'review_title.alpha_num' => 'Review title content contains only letters or numbers',
            'review_title.max' => 'Review title content must be less than 120 characters in length'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $reviews = $this->reviewRepository->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Review Stored',
            'data'    => $reviews,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showReviewOfBook($id)
    {
        $reviews = $this->reviewRepository->findReviewOfBook($id);
        if (is_null($reviews)) {
            return response()->json([
                'success' => false,
                'message' => 'Review Of Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Review Of Book Details',
            'data'    => $reviews
        ]);
    }

    public function showBookReviewTotal($bookId)
    {
        $reviews = $this->reviewRepository->getBookReviewTotal($bookId);

        return $reviews;
    }

    public function showBookReviewAvgStar($bookId)
    {
        $reviews = $this->reviewRepository->getBookReviewAvgStar($bookId);

        return $reviews;
    }

    public function showBookReviewListing($bookId)
    {
        $reviews = $this->reviewRepository->getBookReviewListing($bookId);

        return $reviews;
    }

    public function showBookReviewCondition(Request $request, $bookId)
    {
        $reviews = $this->reviewRepository->getBookReviewCondition($request, $bookId);

        return $reviews;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
