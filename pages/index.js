import Link from "next/link";
import { useEffect, useState } from "react";
import Parser from "rss-parser";
import fetchData from "@/lib/fetchData";
import Layout from "@/components/layout";
import * as dayjs from "dayjs";

export default function Home({ host, info }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { feedRss } = info;
  useEffect(() => {
    async function getFeed(feedUrl) {
      // const feedUrl = `${feedRss}/api/rss`;
      console.log(feedUrl);
      let feed = null;
      try {
        let parser = new Parser();
        feed = await parser.parseURL(feedUrl);
        console.log("feed", feed);
        setList(feed.items);
      } catch (error) {
        console.error("FEED ERROR", error);
      } finally {
        setLoading(false);
      }
    }
    if (feedRss) {
      getFeed(feedRss);
    }
  }, [feedRss]);

  return (
    <Layout info={info}>
      <h4>{host}</h4>
      <h1>Feed</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {list.map((item) => (
          <li key={item.guid}>
            <h2>{item.title}</h2>

            <img
              src={decodeURIComponent(item.enclosure.url)}
              lazyload="true"
              alt={item.title}
              title={item.title}
              width={250}
            />
            <div>
              <small>{dayjs(item.pubDate).format("YYYY-MM-DD")}</small>
            </div>
            <div>
              <Link href={item.link}>link</Link>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const host = process.env.HOST;
  const key = process.env.NEXT_PUBLIC_KEY;
  const { info } = await fetchData(key);
  return {
    props: { host, info },
  };
}
