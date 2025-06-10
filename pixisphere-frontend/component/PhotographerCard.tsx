// components/PhotographerCard.tsx
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

interface Props {
  photographer: Photographer;
}

export default function PhotographerCard({ photographer }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 transition-transform hover:scale-[1.02]">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="w-full">
        <h2 className="text-lg font-semibold">{photographer.name}</h2>
        <p className="text-sm text-gray-600">{photographer.location}</p>
        <p className="text-sm text-gray-800 font-medium">₹{photographer.price.toLocaleString()} onwards</p>
        <p className="text-sm text-yellow-600">⭐ {photographer.rating}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {photographer.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/photographers/${photographer.id}`}
          className="inline-block mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

