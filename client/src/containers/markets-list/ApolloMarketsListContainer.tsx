import React from 'react'
import styled from 'styled-components/macro'
import { AppQuery } from '../../common/AppQuery'
import MarketsConnection from './graphql/MarketConnection.graphql'
import MarketSubscription from './MarketSubscription'
import { mediaQuery } from '@/rt-theme/mediaQueries'
import { MarketQuery } from './graphql/types/MarketQuery'
import { useSearch } from '@/hooks'

const ApolloMarketsListContainer = () => {
  const { currentSymbol } = useSearch()
  const onMarketQueryResults = ({ markets }: MarketQuery) => {
    if (!currentSymbol) {
      return null
    }
    return (
      <MarketList>
        {markets.map(market => (
          <MarketSubscription key={market.id || ''} variables={{ markets: [market.id || ''] }} />
        ))}
      </MarketList>
    )
  }

  return <AppQuery<MarketQuery, {}> query={MarketsConnection}>{onMarketQueryResults}</AppQuery>
}

const MarketList = styled.div`
  display: grid;
  grid-auto-flow: column;
  margin: 0 auto;
  @media ${mediaQuery.desktopS} {
    margin: unset;
  }
`

export default ApolloMarketsListContainer
