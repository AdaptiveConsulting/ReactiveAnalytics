import { MarketSegment } from '@/containers/global-types'
import React from 'react'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import { FXTicker } from './tickers/FXTicker'
import { StockTicker } from './tickers/StockTicker'

const ApolloPriceTickerContainer: React.FunctionComponent<IApolloContainerProps> = ({ id, market }) => {
  if (market === MarketSegment.FX.toLowerCase()) {
    return <FXTicker id={id} />
  }
  return <StockTicker id={id} />
}

export default ApolloPriceTickerContainer
