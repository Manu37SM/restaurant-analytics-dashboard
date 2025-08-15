<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AnalyticsController;

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}/metrics', [AnalyticsController::class, 'restaurantMetrics']);
Route::get('/analytics/top-restaurants', [AnalyticsController::class, 'topRestaurants']);
Route::get('/orders', [OrderController::class, 'index']);
