'use client';
import { useState } from 'react';
import { TopRestaurants } from '../components/TopRestaurants';
import { RestaurantList } from '../components/RestaurantList';
import { FiltersBar } from '../components/FiltersBar';

export default function Home() {
  const [filters, setFilters] = useState<any>({
    start: '2025-06-22', end: '2025-06-28', amount_min: '', amount_max: '', hour_min: '', hour_max: '',
  });
  return (
    <main className="grid md:grid-cols-3 gap-6">
      <section className="md:col-span-2"><RestaurantList /></section>
      <aside className="md:col-span-1 space-y-6">
        <FiltersBar filters={filters} onChange={setFilters} />
        <TopRestaurants start={filters.start} end={filters.end} />
      </aside>
    </main>
  );
}