<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\stripeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/orders/{id}', [ProductController::class, 'orders']);
    Route::delete('/order/{id}', [ProductController::class, 'remove']);
});

// Route::middleware('cache.headers:max_age=60,etag')->group(function () {
//     Route::get('/allproducts', [ProductController::class, 'allProducts']);
//     Route::get('/sliderProducts', [ProductController::class, 'sliderProducts']);
//     Route::get('/newProducts', [ProductController::class, 'newProducts']);
//     Route::get('/offers', [ProductController::class, 'offers']);
//     Route::get('/queryProducts', [ProductController::class, 'queryProducts']);
//     Route::get('/relatedProducts', [ProductController::class, 'relatedProducts']);
// });

Route::get('/allproducts', [ProductController::class, 'allProducts']);
Route::get('/sliderProducts', [ProductController::class, 'sliderProducts']);
Route::get('/newProducts', [ProductController::class, 'newProducts']);
Route::get('/offers', [ProductController::class, 'offers']);
Route::get('/queryProducts', [ProductController::class, 'queryProducts']);
Route::get('/relatedProducts', [ProductController::class, 'relatedProducts']);

Route::post('/checkout', [stripeController::class, 'checkout']);
Route::post('/webhook', [stripeController::class, 'webhook']);
Route::post('/webhooktest', [stripeController::class, 'webhooktest']);
