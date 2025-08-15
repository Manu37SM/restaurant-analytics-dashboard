<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $q = Restaurant::query();

        if ($search = $request->query('search')) {
            $q->where(function($qq) use ($search) {
                $qq->where('name', 'like', "%$search%")
                   ->orWhere('location', 'like', "%$search%")
                   ->orWhere('cuisine', 'like', "%$search%");
            });
        }

        if ($location = $request->query('location')) $q->where('location', $location);
        if ($cuisine = $request->query('cuisine')) $q->where('cuisine', $cuisine);

        $sort = $request->query('sort', 'name');
        $dir  = $request->query('dir', 'asc');
        if (!in_array($sort, ['name','location','cuisine'])) $sort = 'name';
        if (!in_array($dir, ['asc','desc'])) $dir = 'asc';
        $q->orderBy($sort, $dir);

        $per = (int) $request->query('per_page', 10);
        $per = max(1, min(100, $per));

        return response()->json($q->paginate($per));
    }
}
