import Link from "next/link";

export default function Layout({ info, children }) {
  return (
    <div>
      <div
        style={{
          padding: 2,
          backgroundColor: info?.color?.hex || "black",
        }}
      >
        <h1 style={{ color: "white", margin: 2 }}>{info.name}</h1>
      </div>
      <div>
        <nav>
          <li>
            <Link href="/">Feed</Link>
          </li>
          <li>
            <Link href="/posts">posts</Link>
          </li>
          <li>
            <Link href="/artworks">artworks</Link>
          </li>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
