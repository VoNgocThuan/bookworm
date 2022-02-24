<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookRepository implements CrudInterface
{
    public function getAll()
    {
        $books = Book::with('author')->get();
        return $books;
    }

    public function findById($id)
    {
        $books = Book::with('author', 'category', 'review', 'discount')->find($id);
        return $books;
    }

    // public function findbyId($id)
    // {
    //     $bookDetail = DB::table('book')
    //         ->join('category', 'book.category_id', '=', 'category.id')
    //         ->join('discount', 'book.id', '=', 'discount.book_id')
    //         ->join('author', 'book.author_id', '=', 'author.id')
    //         ->where('book.id', '=', $id)
    //         ->select('discount.book_id', 'book.book_price', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_summary', 'author.author_name')
    //         ->get();

    //     return $bookDetail;
    // }

    public function findTop10BookOnSale()
    {
        $booksOnSale = DB::table('book')
            ->join('discount', 'book.id', '=', 'discount.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->select('discount.book_id', 'book.book_price', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'author.author_name')
            ->selectraw('book.book_price - discount.discount_price AS reduced_price')
            ->orderByDesc('reduced_price')
            ->take(10)
            ->get();

        return $booksOnSale;
    }

    public function findTop8BookRecommended()
    {
        $booksRecommended = DB::table('book')
            ->join('review', 'book.id', '=', 'review.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_price')
            ->selectRaw('avg(review.rating_start) as avg_star')
            ->selectRaw('(CASE WHEN discount.discount_price is null THEN book.book_price ELSE discount.discount_price END) AS final_price')
            ->groupBy('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo')
            ->orderByDesc('avg_star')
            ->orderBy('final_price')
            ->take(8)
            ->get();

        return $booksRecommended;
    }

    public function findTop8BookPopular()
    {
        $booksRecommended = DB::table('book')
            ->join('review', 'book.id', '=', 'review.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_price')
            ->selectRaw('count(review.book_id) as total_review')
            ->selectRaw('(CASE WHEN discount.discount_price is null THEN book.book_price ELSE discount.discount_price END) AS final_price')
            ->groupBy('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo')
            ->orderByDesc('total_review')
            ->orderBy('final_price')
            ->take(8)
            ->get();

        return $booksRecommended;
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
