<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class , 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('/orders', OrderController::class);
});

Route::resource('/books', BookController::class);

Route::resource('/categories', CategoryController::class);

Route::resource('/authors', AuthorController::class);

Route::post('/reviews', [ReviewController::class , 'store']);

Route::get('/reviews/{id}', [ReviewController::class, 'showReviewOfBook']);