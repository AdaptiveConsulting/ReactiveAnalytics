import { VerticalDataContents, LightText } from '@/common/StyledComponents'
import styled, { css } from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { Text } from '../../../common/StyledComponents'
import { MarketDisplay } from './StockPrice'
import { mediaQuery } from '@/rt-theme/mediaQueries'

interface PriceWrapperProps {
  size?: MarketDisplay
}

export const LatestPrice = styled(LightText)``

export const StockPriceChangeWrapper = styled.div<{ change: number }>`
  display: grid;
  font-weight: 500;
  grid-gap: 0.25em;
  grid-auto-flow: column;
  align-items: center;
  align-self: end;
  margin-left: ${pxToRems(4)};
  ${Text} {
    color: ${({ theme, change }) => (change < 0 ? theme.accents.accentNegative : theme.accents.accentPositive)};
  }
  @media ${mediaQuery.mobile} {
    justify-content: start;
    margin-left: -6px;
  }
`

const StockPriceLarge = css`
  font-size: ${pxToRems(16)};
  line-height: ${pxToRems(12)};
  grid-gap: ${pxToRems(5)} !important;
  grid-template-rows: 1fr !important;
  ${LatestPrice} {
    color: ${({ theme }) => theme.primary.corePrimary1};
    font-size: ${pxToRems(32)};
    @media ${mediaQuery.mobile} {
      font-size: ${pxToRems(16)};
    }
  }
  ${StockPriceChangeWrapper} {
    margin-left: 0 !important;
    @media ${mediaQuery.mobile} {
      font-size: ${pxToRems(13)};
    }
  }
`

export const StockPriceWrapper = styled(VerticalDataContents)<PriceWrapperProps>`
  min-width: ${pxToRems(240)};
  align-items: center;
  font-size: ${pxToRems(12)};
  grid-gap: 0.5rem;
  padding: ${pxToRems(4)} 0;
  border-right: 1px solid ${({ theme }) => theme.secondary.coreSecondary3};
  &:last-child {
    border-right: none;
  }
  ${({ size }) => size === MarketDisplay.Large && StockPriceLarge};
  @media ${mediaQuery.desktopS} {
    min-width: ${pxToRems(180)};
  }
  @media ${mediaQuery.mobile} {
    grid-template-rows: 1fr 1fr;
    grid-gap: 0;
    min-width: unset;
  }
`

export const MainPrices = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
`
