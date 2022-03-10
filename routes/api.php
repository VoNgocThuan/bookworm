<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/orders', [OrderController::class, 'storeOrder']);
    Route::get('/logout', [AuthController::class, 'logout']);
});

Route::get('/users/full-name/{id}', [UserController::class, 'showUserFullName']);

Route::get('/books/condition', [BookController::class, 'showBookByFilterSortPagi']);

Route::get('/books/onsale', [BookController::class, 'showTop10OnSaleBooks']);

Route::get('/books/recommended', [BookController::class, 'showTop8RecommendedBooks']);

Route::get('/books/popular', [BookController::class, 'showTop8PopularBooks']);

Route::resource('/books', BookController::class);

//Route::resource('/categories', CategoryController::class);

Route::get('/categories/name-shoppage', [CategoryController::class, 'show5CategoryName']);

//Route::resource('/authors', AuthorController::class);

Route::get('/authors/name-shoppage', [AuthorController::class, 'show10AuthorNames']);

Route::resource('/reviews', ReviewController::class);

Route::get('/reviews/{id}', [ReviewController::class, 'showReviewOfBook']);

Route::get('/reviews/total/{id}', [ReviewController::class, 'showBookReviewTotal']);

Route::get('/reviews/avg/{id}', [ReviewController::class, 'showBookReviewAvgStar']);

Route::get('/reviews/listing/{id}', [ReviewController::class, 'showBookReviewListing']);

Route::get('/reviews/condition/{id}', [ReviewController::class, 'showBookReviewCondition']);

Route::get('/cart', [CartController::class, 'cartList']);
Route::post('/cart', [CartController::class, 'addToCart']);
Route::get('/cart/total', [CartController::class, 'totalCart']);
Route::get('/cart/total-qty', [CartController::class, 'totalQuantity']);
Route::get('/cart/{id}', [CartController::class, 'getCartDetail']);
Route::put('/cart/update-cart', [CartController::class, 'updateCart']);
Route::put('/cart/update-cart-increment', [CartController::class, 'updateCartIncrement']);
Route::put('/cart/update-cart-decrement', [CartController::class, 'updateCartDecrement']);
Route::post('/cart/remove', [CartController::class, 'removeCart']);
Route::get('clear', [CartController::class, 'clearAllCart']);
