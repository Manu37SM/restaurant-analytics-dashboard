# Backend (Laravel) — Restaurant Analytics API

Quick Start
-----------
1) Create a new Laravel app:
```bash
composer create-project laravel/laravel backend-api
cd backend-api
cp -r ../backend/* .
composer require predis/predis
php artisan migrate
php artisan db:seed --class=MockDataSeeder
php artisan serve
```
API at `http://127.0.0.1:8000`

Endpoints
- GET /api/restaurants
- GET /api/restaurants/{id}/metrics
- GET /api/analytics/top-restaurants
- GET /api/orders
