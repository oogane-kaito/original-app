<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\BusinessCardController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ExchangeRequestController;
use App\Http\Controllers\ExchangeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->group(function () {
    // Business Cards
    Route::get('/business-cards', [BusinessCardController::class, 'index']);
    Route::post('/business-cards', [BusinessCardController::class, 'store']);
    Route::get('/business-cards/{id}', [BusinessCardController::class, 'show']);
    Route::put('/business-cards/{id}', [BusinessCardController::class, 'update']);
    Route::delete('/business-cards/{id}', [BusinessCardController::class, 'destroy']);

    // Links
    Route::post('/business-cards/{businessCardId}/links', [LinkController::class, 'store']);
    Route::delete('/links/{id}', [LinkController::class, 'destroy']);

    // Exchange Requests
    Route::post('/exchange/request', [ExchangeRequestController::class, 'sendRequest']);
    Route::post('/exchange/accept/{id}', [ExchangeRequestController::class, 'acceptRequest']);
    Route::post('/exchange/reject/{id}', [ExchangeRequestController::class, 'rejectRequest']);

    // Exchanges
    Route::post('/exchanges', [ExchangeController::class, 'store']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

require __DIR__.'/auth.php';