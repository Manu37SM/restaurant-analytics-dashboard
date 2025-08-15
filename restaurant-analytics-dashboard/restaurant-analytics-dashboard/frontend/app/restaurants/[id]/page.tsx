'use client';
import { useEffect, useState } from 'react';
import { fetchRestaurantMetrics } from '../../../components/api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function RestaurantDetail() {
  const id = Number(window.location.pathname.split('/').pop());
  const [data, setData] = useState<any[]>([]);
  const [start, setStart] = useState('2025-06-22');
  const [end, setEnd] = useState('2025-06-28');
  const [amin, setAmin] = useState(''); const [amax, setAmax] = useState('');
  const [hmin, setHmin] = useState(''); const [hmax, setHmax] = useState('');

  useEffect(()=>{ fetchRestaurantMetrics(id, { start, end, amount_min: amin, amount_max: amax, hour_min: hmin, hour_max: hmax }).then(setData); },[id,start,end,amin,amax,hmin,hmax]);

  return (<main className="space-y-6">
    <div className="card p-4 rounded-2xl">
      <div className="grid md:grid-cols-6 gap-2">
        <label className="text-sm">Start
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
        </label>
        <label className="text-sm">End
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
        </label>
        <label className="text-sm">Amt Min
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" value={amin} onChange={(e)=>setAmin(e.target.value)} />
        </label>
        <label className="text-sm">Amt Max
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" value={amax} onChange={(e)=>setAmax(e.target.value)} />
        </label>
        <label className="text-sm">Hour Min
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" min={0} max={23} value={hmin} onChange={(e)=>setHmin(e.target.value)} />
        </label>
        <label className="text-sm">Hour Max
          <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" min={0} max={23} value={hmax} onChange={(e)=>setHmax(e.target.value)} />
        </label>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4 rounded-2xl">
        <div className="font-semibold mb-2">Daily Orders</div>
        <LineChart width={520} height={260} data={data}>
          <Line type="monotone" dataKey="orders_count" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" /><YAxis /><Tooltip />
        </LineChart>
      </div>
      <div className="card p-4 rounded-2xl">
        <div className="font-semibold mb-2">Daily Revenue</div>
        <BarChart width={520} height={260} data={data}>
          <Bar dataKey="revenue" /><CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" /><YAxis /><Tooltip />
        </BarChart>
      </div>
      <div className="card p-4 rounded-2xl">
        <div className="font-semibold mb-2">Average Order Value</div>
        <LineChart width={520} height={260} data={data}>
          <Line type="monotone" dataKey="avg_order_value" /><CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" /><YAxis /><Tooltip />
        </LineChart>
      </div>
      <div className="card p-4 rounded-2xl">
        <div className="font-semibold mb-2">Peak Order Hour (bars)</div>
        <BarChart width={520} height={260} data={data}>
          <Bar dataKey="peak_hour" /><CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" /><YAxis /><Tooltip />
        </BarChart>
      </div>
    </div>
  </main>);
}