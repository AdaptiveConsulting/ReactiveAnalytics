import SearchConnection from '../graphql/SearchConnection.graphql'
import apolloClient from '../../../apollo/client'
import { searchQuery, searchQueryVariables } from '../graphql/types/searchQuery'
import { MarketSegment } from '@/containers/global-types'

const makeQuery = async (symbol: string, market: MarketSegment) => {
  return apolloClient
    .query<searchQuery, searchQueryVariables>({
      errorPolicy: 'all',
      query: SearchConnection,
      variables: { id: symbol.toUpperCase(), market: market.toUpperCase() },
    })
    .then(result => {
      return result.data?.symbol
    })
    .catch(() => {
      return null
    })
}

export const checkIncomingSymbol = async (symbol: string) => {
  const stockQuery = await makeQuery(symbol, MarketSegment.STOCK)
  const fxQuery = await makeQuery(symbol, MarketSegment.FX)

  if (fxQuery) {
    return fxQuery
  }
  if (stockQuery) {
    return stockQuery
  }
  return null
}
