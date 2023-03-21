import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import fetchData from "@/lib/fetchData";
import getRss from "@/lib/rssUtils";
import * as dayjs from "dayjs";

const HOST = process.env.HOST;
const DEMO1 = process.env.DEMO1;
const DEMO2 = process.env.DEMO2;
const API_KEY = process.env.NEXT_PUBLIC_KEY;

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

function getItems(results, type, host) {
  return results.map((item) => {
    return {
      ...item,
      link: `${host}/${type}/${item.slug}`,
      category: {
        name: item.category,
        domain: `${host}/category/${item.category}`,
      },
    };
  });
}

export default async function handler(req, res) {
  await cors(req, res);

  const demo1 = await fetchData(DEMO1);
  const demo2 = await fetchData(DEMO2);
  const current = await fetchData(API_KEY);

  const itemsDemo1 = getItems(demo1.posts, "posts", demo1.info.url);
  const itemsDemo2 = getItems(demo2.posts, "posts", demo2.info.url);

  const itemsDemo3 = getItems(demo1.artworks, "artworks", demo1.info.url);
  const itemsDemo4 = getItems(demo2.artworks, "artworks", demo2.info.url);

  const items = [
    ...itemsDemo1,
    ...itemsDemo2,
    ...itemsDemo3,
    ...itemsDemo4,
  ].sort((a, b) => {
    return dayjs(b.pubDate).format("x") - dayjs(a.pubDate).format("x");
  });

  const imageSide = 50;
  const feed = {
    title: current.info.name,
    imageUrl: encodeURI(current.image.url),
    imageSide,
    description: "MyRssFeed is a a post aggregator from multiple sources.",
    url: `${HOST}/api/rss`,
    items,
  };
  const rss = getRss(feed);

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(rss);
}
