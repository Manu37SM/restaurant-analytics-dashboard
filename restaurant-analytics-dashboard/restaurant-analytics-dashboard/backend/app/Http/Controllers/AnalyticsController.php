<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Services\AnalyticsService;

class AnalyticsController extends Controller
{
    public function restaurantMetrics($id, Request $request, AnalyticsService $svc)
    {
        $start = $request->query('start');
        $end   = $request->query('end');
        $filters = [
            'amount_min' => $request->query('amount_min'),
            'amount_max' => $request->query('amount_max'),
            'hour_min'   => $request->query('hour_min'),
            'hour_max'   => $request->query('hour_max'),
        ];

        $key = 'metrics:restaurant:'.$id.':'.md5(json_encode([$start,$end,$filters]));
        $ttl = 300;

        $data = Cache::remember($key, $ttl, function() use ($svc, $id, $start, $end, $filters) {
            return $svc->restaurantDailyMetrics((int)$id, $start, $end, $filters);
        });

        return response()->json($data);
    }

    public function topRestaurants(Request $request, AnalyticsService $svc)
    {
        $start = $request->query('start');
        $end   = $request->query('end');
        $limit = (int) ($request->query('limit', 3));

        $key = 'metrics:top:'.md5(json_encode([$start,$end,$limit]));
        $ttl = 300;

        $data = Cache::remember($key, $ttl, function() use ($svc, $start, $end, $limit) {
            return $svc->topRestaurantsByRevenue($start, $end, $limit);
        });

        return response()->json($data);
    }
}
