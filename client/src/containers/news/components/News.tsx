import React from 'react'
import { DataCard, DataContents, Text } from '../../../common/StyledComponents'
import styled from 'styled-components/macro'
import { default as NewsItem, INewsArticle } from './NewsItem'

const News: React.FunctionComponent<{ news: INewsArticle[]; id: string }> = ({ news, id }) => (
  <DataCard cardType="news" title="News" instrument={id}>
    <NewsDataContents>
      {news.length > 0 ? (
        news.map((newsItem) => <NewsItem key={newsItem.id} {...newsItem} />)
      ) : (
        <Text>There is no news</Text>
      )}
    </NewsDataContents>
  </DataCard>
)

const NewsDataContents = styled(DataContents)`
  & a {
    border-bottom: 1px #54606d solid;
  }

  & a:last-child {
    border-bottom: none;
  }
`

export default News
