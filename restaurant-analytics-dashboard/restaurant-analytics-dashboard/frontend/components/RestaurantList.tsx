'use client';
import { useEffect, useState } from 'react';
import { fetchRestaurants } from './api';
import Link from 'next/link';
export function RestaurantList() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [dir, setDir] = useState('asc');
  const [page, setPage] = useState(1);
  useEffect(()=>{ fetchRestaurants({ search, sort, dir, page, per_page: 10 }).then(setData); },[search,sort,dir,page]);
  return (<div className="card p-4 rounded-2xl shadow">
    <div className="flex gap-3 items-center mb-4">
      <input className="px-3 py-2 rounded bg-transparent border w-full" placeholder="Search by name, location, cuisine" value={search} onChange={(e)=>setSearch(e.target.value)} />
      <select className="px-3 py-2 rounded bg-transparent border" value={sort} onChange={(e)=>setSort(e.target.value)}>
        <option value="name">Name</option><option value="location">Location</option><option value="cuisine">Cuisine</option>
      </select>
      <select className="px-3 py-2 rounded bg-transparent border" value={dir} onChange={(e)=>setDir(e.target.value)}>
        <option value="asc">Asc</option><option value="desc">Desc</option>
      </select>
    </div>
    {!data ? <div>Loading...</div> : (<div className="space-y-2">
      {data.data.map((r: any)=>(<Link key={r.id} href={`/restaurants/${r.id}`} className="block">
        <div className="p-3 hover:bg-zinc-800 rounded-lg flex justify-between">
          <div><div className="font-medium">{r.name}</div><div className="text-sm text-zinc-400">{r.location} • {r.cuisine}</div></div>
          <div className="text-sm underline">View</div>
        </div></Link>))}
      <div className="flex items-center justify-between pt-2">
        <button className="px-3 py-1 border rounded" onClick={()=>setPage(Math.max(1,page-1))} disabled={page<=1}>Prev</button>
        <div className="text-sm">Page {data.current_page} / {data.last_page}</div>
        <button className="px-3 py-1 border rounded" onClick={()=>setPage(Math.min(data.last_page,page+1))} disabled={page>=data.last_page}>Next</button>
      </div></div>)}
  </div>);
}