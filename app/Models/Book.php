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

    public function scopeFeaturedBook()
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
}
