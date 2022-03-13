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

Route::prefix('books')->group(function () {
    Route::get('/condition', [BookController::class, 'showBookByFilterSortPagi']);
    Route::get('/onsale', [BookController::class, 'showTop10OnSaleBooks']);
    Route::get('/recommended', [BookController::class, 'showTop8RecommendedBooks']);
    Route::get('/popular', [BookController::class, 'showTop8PopularBooks']);
    Route::get('/{id}', [BookController::class, 'show']);
});

Route::prefix('categories')->group(function () {
    Route::get('/name-shoppage', [CategoryController::class, 'show5CategoryName']);
});

Route::prefix('users')->group(function () {
    Route::get('/full-name/{id}', [UserController::class, 'showUserFullName']);
});

Route::prefix('authors')->group(function () {
    Route::get('/name-shoppage', [AuthorController::class, 'show10AuthorNames']);
});

Route::prefix('reviews')->group(function () {
    Route::resource('', ReviewController::class);
    Route::get('/{id}', [ReviewController::class, 'showReviewOfBook']);
    Route::get('/total/{id}', [ReviewController::class, 'showBookReviewTotal']);
    Route::get('/avg/{id}', [ReviewController::class, 'showBookReviewAvgStar']);
    Route::get('/listing/{id}', [ReviewController::class, 'showBookReviewListing']);
    Route::get('/condition/{id}', [ReviewController::class, 'showBookReviewCondition']);
});

Route::prefix('cart')->group(function () {
    Route::get('', [CartController::class, 'cartList']);
    Route::post('', [CartController::class, 'addToCart']);
    Route::get('/total', [CartController::class, 'totalCart']);
    Route::get('/total-qty', [CartController::class, 'totalQuantity']);
    Route::get('/{id}', [CartController::class, 'getCartDetail']);
    Route::put('/update-cart', [CartController::class, 'updateCart']);
    Route::put('/update-cart-increment', [CartController::class, 'updateCartIncrement']);
    Route::put('/update-cart-decrement', [CartController::class, 'updateCartDecrement']);
    Route::post('/remove', [CartController::class, 'removeCart']);
});
Route::get('/clear', [CartController::class, 'clearAllCart']);
