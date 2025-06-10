// pages/categories.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export default function CategoriesPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/photographers')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setPhotographers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8">Loading photographers...</p>;
  if (error) return <p className="p-8 text-red-600">Error: {error}</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Photographer Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photographers.map((photographer) => (
          <div key={photographer.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={photographer.profilePic}
              alt={photographer.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{photographer.name}</h2>
            <p className="text-gray-500">{photographer.location}</p>
            <p className="text-gray-700 font-medium">₹{photographer.price.toLocaleString()}</p>
            <p className="text-yellow-600">⭐ {photographer.rating}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {photographer.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/photographers/${photographer.id}`}
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
