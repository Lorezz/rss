import Image from "next/image";
import Parser from "rss-parser";

export default async function Home() {
  const newsUrl = "http://localhost:3000/api/rss";
  console.log(newsUrl);
  let feed = null;
  try {
    let parser = new Parser();
    feed = await parser.parseURL(newsUrl);
  } catch (error) {
    console.error("FEED ERROR", error);
  }
  const list = feed?.items.slice(0, 3) || [];
  console.log(list);
  return (
    <div>
      <h1>hello</h1>
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
