import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">Pixisphere</h1>
        </Link>
        <nav>
          <Link href="/categories" className="mr-4 hover:underline">
            Categories
          </Link>
          {/* Add more links if you want */}
        </nav>
      </div>
    </header>
  );
}
