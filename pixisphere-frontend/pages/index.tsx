import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>📸 Welcome to Pixisphere</h1>
      <p>Explore professional photographers and categories!</p>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/category">
          <button style={{ margin: "1rem", padding: "1rem 2rem" }}>View Categories</button>
        </Link>
        <Link href="/photographers">
          <button style={{ margin: "1rem", padding: "1rem 2rem" }}>View Photographers</button>
        </Link>
      </div>
    </main>
  );
}
