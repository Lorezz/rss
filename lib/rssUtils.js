function getContents(items) {
  return items
    .map((item) => {
      const { enclosure, category, title, link, pubDate } = item;
      return `
    <item>
        <title>${title}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
        <enclosure length="0" type="${
          enclosure.type
        }" url="${encodeURIComponent(enclosure.url)}"/>
        <category domain="${category.domain}">${category.name}</category>
        <description><![CDATA[ ${item.description} ]]></description>
      </item>
      `;
    })
    .join("");
}

export default function getRss({
  title,
  description,
  url,
  imageUrl,
  imageSide,
  items,
}) {
  const contents = getContents(items);
  return `
 <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${title}</title>
      <link href="${url}" rel="self" type="application/rss+xml" />
      <atom:link href="${url}" rel="self" type="application/rss+xml" />
      <description>${description}</description>
      <image>
        <link>200/300</link>
        <title>Dallas Times-Herald</title>
        <url>${imageUrl}</url>
        <description>${title}</description>
        <height>${imageSide}</height>
        <width>${imageSide}</width>
      </image>
      ${contents}
    </channel>
  </rss>`;
}
