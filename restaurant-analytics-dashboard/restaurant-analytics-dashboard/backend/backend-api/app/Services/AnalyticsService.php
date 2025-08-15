<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function restaurantDailyMetrics(int $restaurantId, ?string $start, ?string $end, array $filters)
    {
        $q = DB::table('orders')
            ->selectRaw('DATE(order_time) as day,
                         COUNT(*) as orders_count,
                         SUM(order_amount) as revenue,
                         AVG(order_amount) as avg_order_value')
            ->where('restaurant_id', $restaurantId);

        if ($start) $q->where('order_time', '>=', $start.' 00:00:00');
        if ($end)   $q->where('order_time', '<=', $end.' 23:59:59');
        if (!empty($filters['amount_min'])) $q->where('order_amount', '>=', (int)$filters['amount_min']);
        if (!empty($filters['amount_max'])) $q->where('order_amount', '<=', (int)$filters['amount_max']);
        if (!empty($filters['hour_min']))   $q->whereRaw('HOUR(order_time) >= ?', [(int)$filters['hour_min']]);
        if (!empty($filters['hour_max']))   $q->whereRaw('HOUR(order_time) <= ?', [(int)$filters['hour_max']]);

        $q->groupBy('day')->orderBy('day', 'asc');
        $rows = $q->get();

        $peak = DB::table('orders')
            ->selectRaw('DATE(order_time) as day, HOUR(order_time) as hour, COUNT(*) as cnt')
            ->where('restaurant_id', $restaurantId);

        if ($start) $peak->where('order_time', '>=', $start.' 00:00:00');
        if ($end)   $peak->where('order_time', '<=', $end.' 23:59:59');
        if (!empty($filters['amount_min'])) $peak->where('order_amount', '>=', (int)$filters['amount_min']);
        if (!empty($filters['amount_max'])) $peak->where('order_amount', '<=', (int)$filters['amount_max']);
        if (!empty($filters['hour_min']))   $peak->whereRaw('HOUR(order_time) >= ?', [(int)$filters['hour_min']]);
        if (!empty($filters['hour_max']))   $peak->whereRaw('HOUR(order_time) <= ?', [(int)$filters['hour_max']]);

        $peak = $peak->groupBy('day','hour')->orderBy('day')->orderBy('cnt','desc')->orderBy('hour','asc')->get();

        $peakMap = [];
        foreach ($peak as $r) if (!isset($peakMap[$r->day])) $peakMap[$r->day] = ['hour' => (int)$r->hour, 'orders' => (int)$r->cnt];

        $out = [];
        foreach ($rows as $r) {
            $day = $r->day;
            $out[] = [
                'day' => $day,
                'orders_count' => (int)$r->orders_count,
                'revenue' => (int)$r->revenue,
                'avg_order_value' => round((float)$r->avg_order_value, 2),
                'peak_hour' => $peakMap[$day]['hour'] ?? null,
                'peak_hour_orders' => $peakMap[$day]['orders'] ?? 0,
            ];
        }
        return $out;
    }

    public function topRestaurantsByRevenue(?string $start, ?string $end, int $limit = 3)
    {
        $q = DB::table('orders as o')
            ->join('restaurants as r', 'r.id', '=', 'o.restaurant_id')
            ->selectRaw('o.restaurant_id, r.name, SUM(o.order_amount) as revenue, COUNT(*) as orders')
            ->groupBy('o.restaurant_id', 'r.name')
            ->orderBy('revenue', 'desc')
            ->limit($limit);

        if ($start) $q->where('o.order_time', '>=', $start.' 00:00:00');
        if ($end)   $q->where('o.order_time', '<=', $end.' 23:59:59');

        return $q->get();
    }
}
