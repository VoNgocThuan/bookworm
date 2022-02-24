<?php

namespace App\Http\Controllers;

use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }
    
    public function index()
    {
        $books = $this->bookRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Book List',
            'data'    => $books
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $books
        ]);
    }

    public function showTop10BooksOnSale()
    {
        $booksOnSale = $this->bookRepository->findTop10BookOnSale();
        if (is_null($booksOnSale)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $booksOnSale
        ]);
    }

    public function showTop8BooksRecommended()
    {
        $booksRecommended = $this->bookRepository->findTop8BookRecommended();
        if (is_null($booksRecommended)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $booksRecommended
        ]);
    }

    public function showTop8BooksPopular()
    {
        $booksPopular = $this->bookRepository->findTop8BookPopular();
        if (is_null($booksPopular)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $booksPopular
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
