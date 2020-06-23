import React from 'react'
import { MarketQuery } from '../../__generated__/types'
import { AppQuery } from '../../common/AppQuery'
import { DataContents, Text } from '../../common/StyledComponents'
import styled from 'styled-components/macro'
import MarketsConnection from './graphql/MarketConnection.graphql'
import MarketSubscription from './MarketSubscription'

const ApolloMarketsListContainer = () => {
  const onMarketQueryResults: (data: MarketQuery) => JSX.Element = ({ markets }) => {
    return (
      <DataContents style={{ gridGap: '0.1rem' }}>
        <Text>US Markets</Text>
        <MarketList>
          {markets.map((market) => (
            <MarketSubscription key={market.id || ''} variables={{ markets: [market.id || ''] }} />
          ))}
        </MarketList>
      </DataContents>
    )
  }

  return <AppQuery<MarketQuery, {}> query={MarketsConnection}>{onMarketQueryResults}</AppQuery>
}

const MarketList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
`

export default ApolloMarketsListContainer
