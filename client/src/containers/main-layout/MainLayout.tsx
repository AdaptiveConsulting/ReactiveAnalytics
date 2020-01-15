import React, { useContext, useMemo } from 'react'
import { Route } from 'react-router'
import { MarketSegment } from '../../__generated__/types'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import { AppLayoutRoot, MainSearchContent } from '../../common/StyledComponents'
import { RouterHelpers } from '../../helpers'
import { Search, StockPrice } from '../index'
import AppBar from './AppBar'
import Footer from './Footer'
import { SearchContext, SearchContextProvider } from '../search/SearchContext'
import { MainContent, ScrollableArea } from '../../common/StyledComponents'

const CurrentSymbolLayout: React.FunctionComponent<IApolloContainerProps & { market: MarketSegment }> = ({
  id,
  market,
}) => {
  const { currentSymbol, errorMessage } = useContext(SearchContext)

  const renderedErrorMessage: JSX.Element | null = useMemo(() => {
    if (!(currentSymbol && currentSymbol.id) && id) {
      return (
        <ScrollableArea>
          <MainContent>
            <span>{errorMessage || 'Something went wrong.'}</span>
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
    <>
      <div style={{ padding: '0rem 1rem' }}>
        <MainSearchContent>
          <Search id={id} url={market} market={market} />
          <StockPrice id={id} />
        </MainSearchContent>
      </div>
      {renderedErrorMessage || renderedRoutes}
    </>
  )
}

const MainLayout: React.FunctionComponent<IApolloContainerProps & { market: MarketSegment }> = props => {
  return (
    <AppLayoutRoot>
      <AppBar />
      <SearchContextProvider>
        <CurrentSymbolLayout {...props} />
      </SearchContextProvider>
      <Footer />
    </AppLayoutRoot>
  )
}

export default MainLayout
