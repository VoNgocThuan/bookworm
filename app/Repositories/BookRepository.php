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
        $books = Book::get();
        return $books;
    }

    public function getBookByFilterSortPagi(Request $request)
    {
        $filterArray = $request->query("filter");
        $sortArray = $request->query("sort");
        $paginateValue = $request->query("paginate");

        if (is_array($filterArray) || is_object($filterArray)) {
            $filter1Key = array();
            $filter1Value = array();
            $filter2Key = array();
            $filter2Value = array();
            foreach ($filterArray as $key => $value) {
                if ($key != 'avg_star') {
                    $filter1Key[] = $key;
                    $filter1Value[] = $value;
                } else {
                    $filter2Key[] = $key;
                    $filter2Value[] = $value;
                }
            }
        }

        foreach ($sortArray as $key => $value) {
            $sortKey = $key;
            $sortValue = $value;
        }

        switch ($sortValue) {
            case ('onSale'):
                if ($request->has("filter")) {
                    if ($filter2Value != null)
                        $books = Book::OnSaleBooks()
                            ->join('review', 'book.id', '=', 'review.book_id')
                            ->selectRaw('avg(review.rating_start) as avg_star')
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->havingRaw('avg(review.rating_start) >= ?', array($filter2Value))
                            ->orderByDesc('reduced_price')
                            ->paginate($paginateValue);
                    else {
                        $books = Book::OnSaleBooks()
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->orderByDesc('reduced_price')
                            ->paginate($paginateValue);
                    }
                    return $books;
                } else {
                    $books = Book::OnSaleBooks()
                        ->orderByDesc('reduced_price')
                        ->paginate($paginateValue);
                    return $books;
                }
                break;
            case ('popularity'):
                if ($request->has("filter")) {
                    if ($filter2Value != null) {
                        $books = Book::PopularBooks()
                            ->selectRaw('avg(review.rating_start) as avg_star')
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->havingRaw('avg(review.rating_start) >= ?', array($filter2Value))
                            ->orderByDesc('total_review')
                            ->paginate($paginateValue);
                    } else {
                        $books = Book::PopularBooks()
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->orderByDesc('total_review')
                            ->paginate($paginateValue);
                    }
                    return $books;
                } else {
                    $books = Book::PopularBooks()
                        ->orderByDesc('total_review')
                        ->paginate($paginateValue);
                    return $books;
                }
                break;
            case ('priceAsc'):
                if ($request->has("filter")) {
                    if ($filter2Value != null) {
                        $books = Book::FeaturedBooks()
                            ->selectRaw('avg(review.rating_start) as avg_star')
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->havingRaw('avg(review.rating_start) >= ?', array($filter2Value))
                            ->orderBy('final_price')
                            ->paginate($paginateValue);
                    } else {
                        $books = Book::Books()
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->orderBy('final_price')
                            ->paginate($paginateValue);
                    }
                    return $books;
                } else {
                    $books = Book::Books()
                        ->orderBy('final_price')
                        ->paginate($paginateValue);

                    return $books;
                }
                break;
            case ('priceDesc'):
                if ($request->has("filter")) {
                    if ($filter2Value != null) {
                        $books = Book::FeaturedBooks()
                            ->selectRaw('avg(review.rating_start) as avg_star')
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->havingRaw('avg(review.rating_start) >= ?', array($filter2Value))
                            ->orderByDesc('final_price')
                            ->paginate($paginateValue);
                    } else {
                        $books = Book::Books()
                            ->where(function ($q) use ($filter1Key, $filter1Value) {
                                foreach ($filter1Key as $index => $value) {
                                    $q->where($value, '=', $filter1Value[$index]);
                                }
                            })
                            ->orderByDesc('final_price')
                            ->paginate($paginateValue);
                    }
                    return $books;
                } else {
                    $books = Book::Books()
                        ->orderByDesc('final_price')
                        ->paginate($paginateValue);

                    return $books;
                }
                break;

            default:
                $msg = 'Something went wrong.';
        }
    }

    // public function findById($id)
    // {
    //     $books = Book::with('author', 'category', 'review', 'discount')->find($id);
    //     return $books;
    // }

    public function findById($id)
    {
        $bookDetail = DB::table('book')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->join('author', 'book.author_id', '=', 'author.id')
            ->where('book.id', '=', $id)
            ->select('book.id as book_id', 'book.book_price', 'discount.discount_price', 'book.book_title', 'book.book_cover_photo', 'book.book_summary', 'author.author_name')
            ->get();

        return $bookDetail;
    }

    public function findOnSaleBooks()
    {
        $booksOnSale = Book::OnSaleBooks()
            ->get();

        return $booksOnSale;
    }

    public function findTop10OnSaleBooks()
    {
        $booksOnSale = Book::OnSaleBooks()
            ->orderByDesc('reduced_price')
            ->take(10)
            ->get();

        return $booksOnSale;
    }

    public function findTop8RecommendedBooks()
    {
        $booksRecommended = Book::AvgRatingStarBooks()
            ->orderByDesc('avg_star')
            ->orderBy('final_price')
            ->take(8)
            ->get();

        return $booksRecommended;
    }

    public function findTop8PopularBooks()
    {
        $booksRecommended = Book::PopularBooks()
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
