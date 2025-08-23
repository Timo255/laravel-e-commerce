<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Middleware\EnsureEmailIsVerified;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // --- Global Middleware ---
        $middleware->web(prepend: [
            HandleCors::class, // Built-in CORS for web routes
        ]);

        $middleware->api(prepend: [
            HandleCors::class, // Built-in CORS for API routes
            EnsureFrontendRequestsAreStateful::class, // Sanctum session handling
        ]);

        // Middleware aliases
        $middleware->alias([
            'verified' => EnsureEmailIsVerified::class,
        ]);

        // CSRF configuration
        $middleware->validateCsrfTokens(except: [
            '*', // Allow API requests from external clients
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
