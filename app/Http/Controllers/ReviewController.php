<?php

namespace App\Http\Controllers;

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
        $reviews = $this->reviewRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Review Stored',
            'data'    => $reviews
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
