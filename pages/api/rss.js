export default function handler(req, res) {
  const feeedTitle = "My-RSS-Feed.xyz";
  const feedDescription =
    "MyRssFeed is a a post aggregator from multiple sources.";
  const url = "https://thingoftheday.xyz/.netlify/functions/rss";
  const imageSide = 150;
  const imageUrl = "https://picsum.photos/" + imageSide + "/" + imageSide;

  const items = [
    {
      title: "Item 1",
      id: 111,
      link: "https://thingoftheday.xyz/category-1/111",
      pubDate: "2021-01-01",
      enclosure: { url: "https://picsum.photos/200/300", type: "image/jpg" },
      category: {
        name: "Category 1",
        domain: "https://thingoftheday.xyz/category-1",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquet nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquet nisl nisl eget nisl.",
    },
    {
      title: "Item 2",
      id: 222,
      link: "https://thingoftheday.xyz/category-2/222",
      pubDate: "2021-01-01",
      enclosure: { url: "https://picsum.photos/200/300", type: "image/jpg" },
      category: {
        name: "Category 2",
        domain: "https://thingoftheday.xyz/category-2",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquet nisl nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquet nisl nisl eget nisl.",
    },
  ];

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
