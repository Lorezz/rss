import fetchData from "@/lib/fetchData";
import Layout from "@/components/layout";
import Link from "next/link";
export default function Page({ info, posts }) {
  return (
    <Layout info={info}>
      <h1>POSTS</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <div>
                <img
                  width={80}
                  src={post.enclosure.url}
                  alt={post.enclosure.alt}
                  title={post.enclosure.title}
                />
                <span style={{ margin: 4 }}>{post.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const key = process.env.NEXT_PUBLIC_KEY;
  const { posts, info } = await fetchData(key);
  return {
    props: { info, posts },
  };
}
