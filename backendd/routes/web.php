<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/allproducts', [ProductController::class, 'allProducts']);
Route::get('/sliderProducts', [ProductController::class, 'sliderProducts']);
Route::get('/newProducts', [ProductController::class, 'newProducts']);
Route::get('/offers', [ProductController::class, 'offers']);
Route::get('/queryProducts', [ProductController::class, 'queryProducts']);
Route::get('/relatedProducts', [ProductController::class, 'relatedProducts']);
// Route::get('/redisPrd', [ProductController::class, 'redisPrd']);

require __DIR__.'/auth.php';
