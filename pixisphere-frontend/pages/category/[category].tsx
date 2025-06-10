// pages/category/[category].tsx
import { useRouter } from 'next/router';
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

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    async function fetchPhotographers() {
      setLoading(true);
      const res = await fetch('http://localhost:3001/photographers');
      const data = await res.json();

      // data is an array directly, so filter it directly
      const filtered = data.filter((p: Photographer) =>
        p.tags.some(tag => tag.toLowerCase() === (category as string).toLowerCase()) ||
        p.styles.some(style => style.toLowerCase() === (category as string).toLowerCase())
      );

      setPhotographers(filtered);
      setLoading(false);
    }

    fetchPhotographers();
  }, [category]);

  if (loading) return <p className="p-8 text-center">Loading photographers...</p>;

  if (photographers.length === 0)
    return <p className="p-8 text-center">No photographers found in "{category}" category.</p>;

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Photographers in category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photographers.map(p => (
          <div key={p.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
              src={p.profilePic}
              alt={p.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-3">{p.name}</h2>
            <p className="text-gray-600">{p.location}</p>
            <p className="font-semibold mt-1">₹{p.price} onwards</p>
            <p className="text-yellow-600 mt-1">⭐ {p.rating}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[...p.styles, ...p.tags].map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/photographers/${p.id}`}>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
