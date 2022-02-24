<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
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

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::resource('/orders', OrderController::class);
// });

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books/bookOnSale', [BookController::class, 'showTop10BooksOnSale']);

Route::get('/books/bookRecommended', [BookController::class, 'showTop8BooksRecommended']);

Route::get('/books/bookPopular', [BookController::class, 'showTop8BooksPopular']);

Route::resource('/books', BookController::class);

Route::resource('/categories', CategoryController::class);

Route::resource('/authors', AuthorController::class);

Route::post('/reviews', [ReviewController::class, 'store']);

Route::get('/reviews/{id}', [ReviewController::class, 'showReviewOfBook']);
