import fetchData from "@/lib/fetchData";
import Layout from "@/components/layout";

export default function Page({
  info,
  post: { id, title, pubDate, enclosure, description, category },
}) {
  return (
    <Layout info={info}>
      <h1>{title}</h1>
      <div>{id}</div>
      <div>{category}</div>
      <div>{pubDate}</div>
      <img
        width={250}
        src={enclosure.url}
        alt={enclosure.alt}
        title={enclosure.title}
      />
      <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const key = process.env.NEXT_PUBLIC_KEY;
  console.log("key", key);
  const { artworks, info } = await fetchData(key);
  const post = artworks.find((post) => post.slug === slug);
  return {
    props: { info, post },
  };
}
