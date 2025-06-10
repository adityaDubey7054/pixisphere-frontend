// pages/photographers/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

type Photographer = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  profilePic: string;
};

export default function PhotographersPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [filtered, setFiltered] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);

  const [locationFilter, setLocationFilter] = useState<string>("");
  const [styleFilter, setStyleFilter] = useState<string>("");

  useEffect(() => {
    async function fetchPhotographers() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/photographers");
        const data = await res.json();
        setPhotographers(data.photographers || data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photographers:", error);
        setLoading(false);
      }
    }
    fetchPhotographers();
  }, []);

  useEffect(() => {
    let filteredList = photographers;

    if (locationFilter) {
      filteredList = filteredList.filter(
        (p) => p.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (styleFilter) {
      filteredList = filteredList.filter((p) =>
        p.styles.some(
          (style) => style.toLowerCase() === styleFilter.toLowerCase()
        )
      );
    }

    setFiltered(filteredList);
  }, [photographers, locationFilter, styleFilter]);

  const locations = Array.from(
    new Set(photographers.map((p) => p.location))
  ).sort();

  const styles = Array.from(
    new Set(photographers.flatMap((p) => p.styles))
  ).sort();

  if (loading) return <p className="p-8 text-center">Loading photographers...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Photographers</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border px-3 py-2 rounded"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
        >
          <option value="">All Styles</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setLocationFilter("");
            setStyleFilter("");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Photographers Grid */}
      {filtered.length === 0 ? (
        <p>No photographers found for selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/photographers/${p.id}`}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={p.profilePic}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-gray-600">{p.location}</p>
                <p className="font-semibold mt-1">₹{p.price} onwards</p>
                <p className="text-yellow-600 mt-1">⭐ {p.rating}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.styles.map((style, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
