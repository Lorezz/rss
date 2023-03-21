import axios from "axios";

const query = `
  query feed {
  info {
    name
    url
    image {
      url(imgixParams: {w: "250", h: "100", fit: crop})
      type: mimeType
      alt
      author
    }
    color {
      hex
    }
  }
  posts: allPosts(orderBy: pubDate_DESC) {
    id
    title
    slug
    enclosure: image {
      url(imgixParams: {w: "250", h: "100", fit: crop})
      type: mimeType
      alt
      author
    }
    category
    description
    pubDate
    _updatedAt
  }
  artworks: allArtworks(orderBy: pubDate_DESC) {
    id
    title
    slug
    enclosure: image {
      url(imgixParams: {w: "250", h: "100", fit: crop})
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

export default async function fetchData(key) {
  console.log("fetching data", key);
  if (!key) return;
  try {
    const response = await axios({
      url: "https://graphql.datocms.com/",
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "X-Include-Drafts": "true",
        "X-Exclude-Invalid": "true",
      },
      data: { query },
    });
    return response.data.data;
  } catch (error) {
    // throw error;
  }
}
