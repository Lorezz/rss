import { useEffect, useState } from "react";
import Parser from "rss-parser";

export default function Home({ host }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const newsUrl = `${host}/api/rss`;
      console.log(newsUrl);
      let feed = null;
      try {
        let parser = new Parser();
        feed = await parser.parseURL(newsUrl);
        console.log("feed", feed);
        setList([...feed.items]);
      } catch (error) {
        console.error("FEED ERROR", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h1>FEED {host}</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {list.map((item) => (
          <li key={item.guid}>
            <h2>{item.title}</h2>
            <img
              src={item.enclosure.url}
              lazyload="true"
              alt={item.title}
              title={item.title}
              width={250}
            />
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const host = process.env.HOST;
  return {
    props: { host },
  };
}
