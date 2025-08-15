<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $q = Order::query();

        if ($rid = $request->query('restaurant_id')) $q->where('restaurant_id', $rid);
        if ($start = $request->query('start')) $q->where('order_time', '>=', $start.' 00:00:00');
        if ($end = $request->query('end')) $q->where('order_time', '<=', $end.' 23:59:59');
        if ($amin = $request->query('amount_min')) $q->where('order_amount', '>=', (int)$amin);
        if ($amax = $request->query('amount_max')) $q->where('order_amount', '<=', (int)$amax);
        if ($hmin = $request->query('hour_min')) $q->whereRaw('HOUR(order_time) >= ?', [(int)$hmin]);
        if ($hmax = $request->query('hour_max')) $q->whereRaw('HOUR(order_time) <= ?', [(int)$hmax]);

        $q->orderBy('order_time', 'desc');
        $per = (int) $request->query('per_page', 20);
        $per = max(1, min(200, $per));
        return response()->json($q->paginate($per));
    }
}
