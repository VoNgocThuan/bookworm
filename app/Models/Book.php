<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function discount()
    {
        return $this->hasMany(Discount::class);
    }

    public function scopeOnSaleBooks()
    {
        $onSaleBooks = DB::table('book')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->join('discount', 'book.id', '=', 'discount.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->select('discount.book_id', 'book.book_price', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'author.author_name')
            ->selectRaw('book.book_price - discount.discount_price AS reduced_price')
            ->groupBy('author.author_name', 'discount.book_id', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo');

        return $onSaleBooks;
    }

    public function scopeFeaturedBooks()
    {
        $featuredBooks = DB::table('book')
            ->join('review', 'book.id', '=', 'review.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_price')
            ->selectRaw('(CASE WHEN discount.discount_price is null THEN book.book_price ELSE discount.discount_price END) AS final_price')
            ->groupBy('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo');

        return $featuredBooks;
    }

    public function scopeBooks()
    {
        $books = DB::table('book')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_price')
            ->selectRaw('(CASE WHEN discount.discount_price is null THEN book.book_price ELSE discount.discount_price END) AS final_price')
            ->groupBy('author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo');

        return $books;
    }

    public function scopePopularBooks()
    {
        $popularBooks = Book::FeaturedBooks()
            ->join('category', 'book.category_id', '=', 'category.id')
            ->selectRaw('count(review.book_id) as total_review');

        return $popularBooks;
    }

    public function scopeAvgRatingStarBooks()
    {
        $avgRatingStarBooks = Book::FeaturedBooks()
            ->selectRaw('avg(review.rating_start) as avg_star');

        return $avgRatingStarBooks;
    }

    public function scopeBookDetail($id)
    {
        $bookDetail = DB::table('book')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->leftJoin('review', 'book.review_id', '=', 'review.id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->where('book.id', '=', $id)
            //->selectRaw('avg(review.rating_start) as avg_star')
            //->selectRaw('count()')
            ->select('book.id as book_id', 'book.book_price', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_summary', 'author.author_name')
            ->groupBy('review.book_id', 'author.author_name', 'discount.discount_price', 'book.book_title', 'book.book_price', 'book.book_cover_photo');

        return $bookDetail;
    }
}
