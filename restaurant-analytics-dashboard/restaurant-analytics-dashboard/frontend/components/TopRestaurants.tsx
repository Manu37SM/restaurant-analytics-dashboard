'use client';
import { useEffect, useState } from 'react';
import { fetchTopRestaurants } from './api';
export function TopRestaurants({ start, end }: any) {
  const [data, setData] = useState<any[]>([]);
  useEffect(()=>{ fetchTopRestaurants({ start, end, limit: 3 }).then(setData); },[start,end]);
  return (<div className="card p-4 rounded-2xl">
    <div className="font-semibold mb-3">Top 3 Restaurants by Revenue</div>
    <div className="space-y-2">
      {data.map((r:any, idx:number)=>(<div key={r.restaurant_id} className="flex justify-between">
        <div>{idx+1}. {r.name}</div><div className="text-zinc-300">₹ {r.revenue}</div>
      </div>))}
    </div>
  </div>);
}