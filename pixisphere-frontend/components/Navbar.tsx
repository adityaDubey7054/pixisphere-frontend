import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold text-blue-600 cursor-pointer">Pixisphere</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="hover:text-blue-500 cursor-pointer">Home</span>
          </Link>
          <Link href="/photographers">
            <span className="hover:text-blue-500 cursor-pointer">Photographers</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
