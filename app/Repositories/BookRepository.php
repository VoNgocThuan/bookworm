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
    public function create(Request $request)
    {
    }
    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
    public function scopeName($query, $request)
    {
        if ($request->has('category_name')) {
            $query->where('category_name', 'LIKE', '%' . $request->category_name . '%');
        }

        return $query;
    }
}
