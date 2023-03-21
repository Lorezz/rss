import fetchData from "@/lib/fetchData";
import Layout from "@/components/layout";
import Link from "next/link";
export default function Page({ info, artworks }) {
  return (
    <Layout info={info}>
      <h1>artworks</h1>
      <ul>
        {artworks.map((post) => (
          <li key={post.id}>
            <Link href={`/artworks/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const key = process.env.NEXT_PUBLIC_KEY;
  console.log("key", key);

  const { artworks, info } = await fetchData(key);
  return {
    props: { info, artworks },
  };
}
