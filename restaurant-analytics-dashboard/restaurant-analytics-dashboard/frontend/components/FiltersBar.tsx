'use client';
import { useState } from 'react';
export function FiltersBar({ filters, onChange }: any) {
  const [local, setLocal] = useState(filters);
  function apply(){ onChange(local); }
  function update(k: string, v: any){ setLocal({ ...local, [k]: v }); }
  return (<div className="card p-4 rounded-2xl shadow space-y-3">
    <div className="font-semibold">Global Filters</div>
    <div className="grid grid-cols-2 gap-2">
      <label className="text-sm">Start
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="date" value={local.start} onChange={(e)=>update('start',e.target.value)} />
      </label>
      <label className="text-sm">End
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="date" value={local.end} onChange={(e)=>update('end',e.target.value)} />
      </label>
      <label className="text-sm">Amount Min
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" value={local.amount_min} onChange={(e)=>update('amount_min',e.target.value)} />
      </label>
      <label className="text-sm">Amount Max
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" value={local.amount_max} onChange={(e)=>update('amount_max',e.target.value)} />
      </label>
      <label className="text-sm">Hour Min
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" min={0} max={23} value={local.hour_min} onChange={(e)=>update('hour_min',e.target.value)} />
      </label>
      <label className="text-sm">Hour Max
        <input className="w-full px-2 py-1 bg-transparent border rounded" type="number" min={0} max={23} value={local.hour_max} onChange={(e)=>update('hour_max',e.target.value)} />
      </label>
    </div>
    <button className="w-full px-3 py-2 border rounded" onClick={apply}>Apply</button>
  </div>);
}