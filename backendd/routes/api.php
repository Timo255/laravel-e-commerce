<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\stripeController;
use App\Http\Controllers\ProductController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('images/{image}', function ($image) {
//     $path = public_path('images/' . $image);
//     if (! File::exists($path)) {
//         abort(404);
//     }
//     $file     = File::get($path);
//     $type     = File::mimeType($path);
//     $response = Response::make($file, 200);
//     $response->header("Content-Type", $type);
//     $response->header("Cache-Control", "public, max-age=31536000,etag");
//     return $response;
// });

Route::middleware(['auth:sanctum', 'web'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/orders/{id}', [ProductController::class, 'orders']);
    Route::delete('/order/{id}', [ProductController::class, 'remove']);
});


Route::middleware('cache.headers:max_age=60,etag')->group(function () {
    Route::get('/allproducts', [ProductController::class, 'allProducts']);
    Route::get('/sliderProducts', [ProductController::class, 'sliderProducts']);
    Route::get('/newProducts', [ProductController::class, 'newProducts']);
    Route::get('/offers', [ProductController::class, 'offers']);
    Route::get('/queryProducts', [ProductController::class, 'queryProducts']);
    Route::get('/relatedProducts', [ProductController::class, 'relatedProducts']);
});
// Route::get('/allproducts', [ProductController::class, 'allProducts']);
// Route::get('/sliderProducts', [ProductController::class, 'sliderProducts']);
// Route::get('/newProducts', [ProductController::class, 'newProducts']);
// Route::get('/offers', [ProductController::class, 'offers']);
// Route::get('/queryProducts', [ProductController::class, 'queryProducts']);
// Route::get('/relatedProducts', [ProductController::class, 'relatedProducts']);

Route::post('/checkout', [stripeController::class, 'checkout']);
Route::post('/webhook', [stripeController::class, 'webhook']);
Route::post('/webhooktest', [stripeController::class, 'webhooktest']);
// Route::get('/orders/{id}', [ProductController::class, 'orders']);
