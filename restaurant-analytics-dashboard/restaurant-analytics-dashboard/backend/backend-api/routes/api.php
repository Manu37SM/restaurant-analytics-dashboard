<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AnalyticsController;

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}/metrics', [RestaurantController::class, 'metrics']);
Route::get('/analytics/top-restaurants', [AnalyticsController::class, 'topRestaurants']);
