import React, { useMemo } from 'react'
import { Route } from 'react-router'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import {
  MainContent,
  MainSearchContent,
  ScrollableArea,
  SearchGridArea,
  WrapperContent,
} from '../../common/StyledComponents'
import { RouterHelpers } from '../../helpers'
import { Search } from '../index'
import Footer from './Footer'
import { MarketSegment } from '@/containers/global-types'
import { PriceTicker } from '@/containers/price-ticker'
import { useSearch } from '@/hooks'

export const CurrentSymbolLayout: React.FunctionComponent<IApolloContainerProps & { market: MarketSegment }> = ({
  id,
  market,
}) => {
  const { currentSymbol, errorMessage, previousSearch } = useSearch()

  const renderedErrorMessage: JSX.Element | null = useMemo(() => {
    if (!(currentSymbol && currentSymbol.id) && id) {
      return (
        <ScrollableArea>
          <MainContent>
            <span>{errorMessage}</span>
          </MainContent>
        </ScrollableArea>
      )
    }
    return null
  }, [currentSymbol, errorMessage, id])

  const renderedRoutes = useMemo(() => {
    return Object.keys(RouterHelpers.MainRouterItems).map(route => (
      <Route key={route} exact={true} path={route} component={RouterHelpers.RenderMainRouterElement} />
    ))
  }, [])

  return (
    <WrapperContent>
      <MainSearchContent hasPreviousSearch={previousSearch ?? false}>
        <SearchGridArea>
          <Search id={id} url={market} market={market} />
          {currentSymbol && <PriceTicker id={id} market={market} />}
        </SearchGridArea>
      </MainSearchContent>
      {renderedErrorMessage || renderedRoutes}
      <Footer hasNoSearch={!currentSymbol} />
    </WrapperContent>
  )
}
