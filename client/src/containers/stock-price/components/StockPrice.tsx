import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Text, VerticalDataContents } from '../../../common/StyledComponents'
import { colors } from '../../../rt-theme'
import styled from 'styled-components/macro'

export interface IStockPriceData {
  change: number | null
  changePercent: number | null
  latestPrice: number | null
}

interface IStockPriceProps {
  symbol?: string
  fontSize?: number
  stockPrice: IStockPriceData | null
  hideChange?: Boolean
}

const StockPrice: React.FunctionComponent<IStockPriceProps> = ({ symbol, fontSize, stockPrice, hideChange }) => {
  if (stockPrice === null) {
    return <div>N/A</div>
  }
  const { change, changePercent, latestPrice } = stockPrice
  const [Icon, color] =
    (change || 0) < 0
      ? [faCaretDown, colors.dark.accents.accentNegative]
      : [faCaretUp, colors.dark.accents.accentPositive]

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
    <StockPriceWrapper size={fontSize}>
      <Text>{symbol}</Text>
      <Text>${fixedFormat(latestPrice)}</Text>
      <StockPriceChangeWrapper isHidden={hideChange} fontColor={color}>
        <FontAwesomeIcon icon={Icon} />
        <Text>{fixedFormat(change)}</Text>
        <Text>|</Text>
        <Text>{fixedFormat(changePercent, true)}%</Text>
      </StockPriceChangeWrapper>
    </StockPriceWrapper>
  )
}
interface IStockPriceWrapperAttrs {
  size?: number
}

const StockPriceWrapper = styled(VerticalDataContents)<IStockPriceWrapperAttrs>`
  font-size: ${({ size }) => `${size}rem` || `inherit`};
  line-height: ${({ size }) => `${size}rem` || `inherit`};
  grid-gap: 0.5rem;
  margin-top: 4px;
`

interface IStockPriceChangeWrapperAttrs {
  fontColor: string
  isHidden: Boolean | undefined
}

const StockPriceChangeWrapper = styled.div<IStockPriceChangeWrapperAttrs>`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'grid')};
  grid-gap: 0.25em;
  grid-auto-flow: column;
  margin-left: 0.5rem;
  color: ${({ fontColor }) => fontColor};
`

export default StockPrice
