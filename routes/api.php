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
    Route::resource('/orders', OrderController::class);
    Route::resource('/cart', CartController::class);
});
Route::resource('/users', UserController::class);
Route::get('/users/full-name/{id}', [UserController::class, 'showUserFullName']);
Route::get('/books/condition', [BookController::class, 'showBookByFilterSortPagi']);

Route::get('/books/onsale', [BookController::class, 'showTop10OnSaleBooks']);

Route::get('/books/recommended', [BookController::class, 'showTop8RecommendedBooks']);

Route::get('/books/popular', [BookController::class, 'showTop8PopularBooks']);

Route::resource('/books', BookController::class);

Route::resource('/categories', CategoryController::class);

Route::resource('/authors', AuthorController::class);

Route::post('/reviews', [ReviewController::class, 'store']);

Route::get('/reviews/{id}', [ReviewController::class, 'showReviewOfBook']);