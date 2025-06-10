import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Photographer = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  profilePic: string;
  bio?: string;
};

export default function PhotographerProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchPhotographer() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/photographers/${id}`);
        const data = await res.json();
        setPhotographer(data);
      } catch (error) {
        console.error("Error fetching photographer:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotographer();
  }, [id]);

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;
  if (!photographer) return <p className="p-8 text-center">Photographer not found.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full md:w-64 h-64 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
          <p className="text-gray-600">{photographer.location}</p>
          <p className="text-yellow-600 mt-2">⭐ {photographer.rating}</p>
          <p className="font-semibold mt-2">₹{photographer.price} onwards</p>

          {photographer.bio && (
            <p className="mt-4 text-gray-700">{photographer.bio}</p>
          )}

          <div className="mt-4">
            <h2 className="font-semibold mb-1">Styles:</h2>
            <div className="flex flex-wrap gap-2">
              {photographer.styles.map((style, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold mb-1">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {photographer.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
