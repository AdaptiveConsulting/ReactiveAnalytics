import React from "react"

import { AppQuery } from "@/common/AppQuery"
import { HistoryWrapper } from "@/common/StyledComponents"

import { StockHistoryChart } from "./components/StockHistoryChart"
import StockHistoryConnection from "./graphql/StockHistoryConnection.graphql"
import {
  StockHistoryQuery,
  StockHistoryQueryVariables,
} from "./graphql/types/StockHistoryQuery"

const History = ({ id }: { id: string }) => {
  return (
    <>
      <AppQuery<StockHistoryQuery, StockHistoryQueryVariables>
        query={StockHistoryConnection}
        variables={{ id }}
      >
        {StockHistoryChart}
      </AppQuery>
    </>
  )
}

export const StockHistoryContainer = ({ id }: { id: string }) => (
  <HistoryWrapper>
    <History id={id} />
  </HistoryWrapper>
)

export default StockHistoryContainer
