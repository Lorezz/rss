import Cors from "cors";
import axios from "axios";
import initMiddleware from "@/lib/init-middleware";

const KEY = process.env.DATO_API_KEY;
const HOST = process.env.HOST;

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

async function doQuery() {
  const query = `query posts {
  posts: allPosts(orderBy: pubDate_DESC) {
    id
    title
    slug
    enclosure: image {
      url
      type: mimeType
      alt
      author
    }
    category
    description
    pubDate
    _updatedAt
  }
}
`;

  const response = await axios({
    url: "https://graphql.datocms.com/",
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      "X-Include-Drafts": "true",
      "X-Exclude-Invalid": "true",
    },
    data: { query },
  });
  return response.data.data.posts;
}

export default async function handler(req, res) {
  await cors(req, res);

  const feeedTitle = "MyRssFeed";
  const feedDescription =
    "MyRssFeed is a a post aggregator from multiple sources.";
  const url = `${HOST}/api/rss`;
  const imageSide = 150;
  const imageUrl = "https://picsum.photos/" + imageSide + "/" + imageSide;

  const posts = await doQuery();
  const items = posts.map((post) => {
    return {
      ...post,
      link: `${HOST}/post/${post.slug}`,
      category: {
        name: post.category,
        domain: `${HOST}/category/${post.category}`,
      },
    };
  });

  const contents = items
    .map((item) => {
      const { enclosure, category, title, link, pubDate } = item;
      return `
    <item>
        <title>${title}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
        <enclosure length="0" type="${enclosure.type}" url="${enclosure.url}"/>
        <category domain="${category.domain}">${category.name}</category>
        <description><![CDATA[ ${item.description} ]]></description>
      </item>
      `;
    })
    .join("");

  const rss = `
 <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${feeedTitle}</title>
      <link href="${url}" rel="self" type="application/rss+xml" />
      <atom:link href="${url}" rel="self" type="application/rss+xml" />
      <description>${feedDescription}</description>
      <image>
        <link>200/300</link>
        <title>Dallas Times-Herald</title>
        <url>${imageUrl}</url>
        <description>${feeedTitle}</description>
        <height>${imageSide}</height>
        <width>${imageSide}</width>
      </image>
      ${contents}
    </channel>
  </rss>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(rss);
}
