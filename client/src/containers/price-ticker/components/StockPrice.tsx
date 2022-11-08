import { MarketStatusIcon } from '@/assets/icons'
import React from 'react'
import { BoldText, Text } from '../../../common/StyledComponents'
import { LatestPrice, StockPriceChangeWrapper, StockPriceWrapper, MainPrices } from './StockPrice.styles'

export interface IStockPriceData {
  change: number | null
  changePercent: number | null
  latestPrice: number | null
}

export enum MarketDisplay {
  Large = 'large',
  Small = 'small',
}

export interface IStockPriceProps {
  symbol?: string
  size?: MarketDisplay
  stockPrice: IStockPriceData | null
}

const StockPrice: React.FunctionComponent<IStockPriceProps> = ({ symbol, size, stockPrice }) => {
  if (stockPrice === null) {
    return <div>N/A</div>
  }
  const { change, changePercent, latestPrice } = stockPrice

  const fixedFormat = (e: number | null, isPercentage?: Boolean) => {
    if (e === null) {
      return '-'
    }
    let decimalPlaces = 0
    if (isPercentage) {
      decimalPlaces = e < 1 ? 2 : 0
    } else if (e.toString().indexOf('.') >= 0) {
      decimalPlaces = e.toString().split('.')[1].length || 2
    }
    return (isPercentage ? e * 100 : e).toFixed(decimalPlaces > 4 ? 4 : decimalPlaces)
  }

  return (
    <StockPriceWrapper size={size}>
      <MainPrices>
        <BoldText>{symbol}</BoldText>
        <LatestPrice>${fixedFormat(latestPrice)}</LatestPrice>
      </MainPrices>
      <StockPriceChangeWrapper change={change ?? 0}>
        <MarketStatusIcon change={change ?? 0} />
        <Text>{fixedFormat(change)}</Text>
        <Text>|</Text>
        <Text>{fixedFormat(changePercent, true)}%</Text>
      </StockPriceChangeWrapper>
    </StockPriceWrapper>
  )
}

export default StockPrice
