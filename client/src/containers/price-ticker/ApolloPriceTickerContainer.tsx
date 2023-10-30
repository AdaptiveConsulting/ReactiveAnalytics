import React from "react"
import { useParams } from "react-router-dom"

import { IApolloContainerProps } from "@/common/IApolloContainerProps"
import { MarketSegment } from "@/containers/global-types"

import { FXTicker } from "./tickers/FXTicker"
import { StockTicker } from "./tickers/StockTicker"

const ApolloPriceTickerContainer: React.FunctionComponent<
  IApolloContainerProps
> = ({ market }) => {
  const id = useParams()["id"] || ""
  if (market === MarketSegment.FX) {
    return <FXTicker id={id} />
  }
  return <StockTicker id={id} />
}

export default ApolloPriceTickerContainer
