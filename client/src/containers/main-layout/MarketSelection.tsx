import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components/macro'

const MarketSelection: React.FunctionComponent<RouteComponentProps & {}> = ({ history, location }) => {
  const [currentMarket, setCurrentMarket] = useState('')

  useEffect(() => {
    const [, market] = location.pathname.split('/')
    if (market) {
      setCurrentMarket(market)
    } else {
      setCurrentMarket('stock')
    }
  }, [location])

  const onMarketClick = (e: React.SyntheticEvent<HTMLLIElement>) => {
    const market = e.currentTarget.dataset.market
    history.push(`/${market}/`)
  }
  return (
    <LeftNav>
      <LeftNavItemFirst style={{ fontWeight: 500 }}>Markets</LeftNavItemFirst>
      <NavItem data-market="fx" active={currentMarket === 'fx'} onClick={onMarketClick}>
        Currencies
      </NavItem>
      <NavItem data-market="stock" active={currentMarket === 'stock'} onClick={onMarketClick}>
        Stocks
      </NavItem>
      <NavItem data-market="index" active={currentMarket === 'index'} style={{ cursor: 'not-allowed' }}>
        Indicies
      </NavItem>
      <NavItem data-market="future" active={currentMarket === 'future'} style={{ cursor: 'not-allowed' }}>
        Futures
      </NavItem>
      <NavItem data-market="bond" active={currentMarket === 'bond'} style={{ cursor: 'not-allowed' }}>
        Bonds
      </NavItem>
      <NavItem data-market="crypto" active={currentMarket === 'crypto'} onClick={onMarketClick}>
        Cryptocurrencies
      </NavItem>
    </LeftNav>
  )
}

const LeftNav = styled.ul`
  display: grid;
  justify-content: start;
  grid-gap: 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(auto, 120px));
  margin: 1rem;
`
const LiStyle = styled.li`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 14px;
`
const LeftNavItemFirst = styled(LiStyle)`
  list-style-type: none;
  font-size: 16px;
  align-self: auto;
`

const NavItem = styled(LiStyle)<{ active: boolean }>`
  list-style-type: none;
  opacity: ${({ active }) => (active ? '1' : '0.52')};
  background: ${({ active, theme }) => (active ? theme.secondary.coreSecondary : 'initial')};
  border-radius: 0.25rem;
  padding: 1rem 2.5rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export default withRouter(MarketSelection)
