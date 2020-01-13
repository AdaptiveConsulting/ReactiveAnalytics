import React from 'react'

import { AppQuery } from 'common/AppQuery'
import { IApolloContainerProps } from 'common/IApolloContainerProps'
import { StockHistoryQuery, StockHistoryQueryVariables } from '../../__generated__/types'
import { StockHistoryChart } from './components/StockHistoryChart'
import StockHistoryConnection from './graphql/StockHistoryConnection.graphql'

export const StockHistoryContainer: React.FC<IApolloContainerProps> = ({ id }) => {
  return (
    <>
      <AppQuery<StockHistoryQuery, StockHistoryQueryVariables> query={StockHistoryConnection} variables={{ id }}>
        {StockHistoryChart}
      </AppQuery>
    </>
  )
}

export default StockHistoryContainer
