import { NewsItem, news as actual } from "iexcloud_api_wrapper"

const mockNewsItem1: NewsItem = {
  datetime: Date.now(),
  hasPaywall: false,
  headline: "headline",
  image: "image",
  lang: "lang",
  related: "related",
  source: "source",
  summary: "summary",
  url: "url1",
}

const mockNewsItem2: NewsItem = {
  datetime: Date.now(),
  hasPaywall: false,
  headline: "headline",
  image: "image",
  lang: "lang",
  related: "related",
  source: "source",
  summary: "summary",
  url: "url2",
}

export const news: typeof actual = () =>
  Promise.resolve([mockNewsItem1, mockNewsItem2])
