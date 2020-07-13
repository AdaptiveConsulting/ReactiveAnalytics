import { useSubscription } from '@apollo/react-hooks'
import React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import {
  ABMHistoryQuery,
  ABMHistoryQueryVariables,
  onStockPriceSubscription,
  onStockPriceSubscriptionVariables,
} from '../../__generated__/types'
import { AppQuery } from '../../common/AppQuery'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import { DataCard } from '../../common/StyledComponents'
import StockPriceSubscription from '../stock-price/graphql/StockPriceSubscription.graphql'
import ABMHistoryConnection from './graphql/ABMHistoryConnection.graphql'

export const ApolloABMHistoryContainer: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  const { loading, data } = useSubscription<onStockPriceSubscription, onStockPriceSubscriptionVariables>(
    StockPriceSubscription,
    {
      shouldResubscribe: true,
      variables: { markets: [id] },
    },
  )

  const onHistoryQueryResults = ({ getPriceHistory }: ABMHistoryQuery): JSX.Element => {
    if (!loading && data && data.getQuotes.latestPrice) {
      getPriceHistory.push({
        __typename: 'FxPricing',
        ask: 0,
        bid: 0,
        creationTimestamp: '',
        mid: data.getQuotes.latestPrice,
        valueDate: '',
      })
    }
    const chartData = getPriceHistory.slice(getPriceHistory.length - 100, getPriceHistory.length)

    return (
      <>
        <DataCard cardType="abm" instrument={id} title={`ABM History - ${id}`}>
          <ResponsiveContainer width="99%" height="99%" minHeight={300}>
            <AreaChart data={chartData} margin={{ left: 0, top: 0, right: -32, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93e4c3" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#93e4c300" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="basisOpen"
                dataKey="mid"
                strokeWidth={2}
                fill="url(#colorUv)"
                dot={false}
                isAnimationActive={false}
                stroke="#93e4c3"
              />
              <YAxis
                type="number"
                allowDecimals={true}
                domain={['dataMin', 'dataMax']}
                tick={{ fontSize: 10 }}
                orientation="right"
                scale="auto"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </DataCard>
      </>
    )
  }

  const from = id.slice(0, 3)
  const to = id.slice(3)

  return (
    <>
      <AppQuery<ABMHistoryQuery, ABMHistoryQueryVariables>
        query={ABMHistoryConnection}
        variables={{ from, to }}
        renderLoadingHeight="275px"
      >
        {onHistoryQueryResults}
      </AppQuery>
    </>
  )
}

export default ApolloABMHistoryContainer
