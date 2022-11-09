import { ApolloProvider } from '@apollo/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLightbulb as farLightBulb } from '@fortawesome/free-regular-svg-icons'
import { faLightbulb as fasLightBulb } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import apolloClient from '@/apollo/client'
import GlobalScrollbarStyle from '@/common/GlobalScrollbarStyle'
import { RouterHelpers } from '@/helpers'
import GlobalStyle from '@/rt-theme/globals'
import { ThemeProvider } from '@/rt-theme/ThemeContext'
import { PWAToolbar } from '@/containers/main-layout/PWAInstallPrompt'
import { FDC3Provider } from '@/ra-platforms/fdc3'
import { FocusProvider } from '@/containers/search/FocusContext'
import { SearchContextProvider } from '@/containers/search/SearchContext'

library.add(fasLightBulb, farLightBulb)

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <ThemeProvider>
        <SearchContextProvider>
          <FocusProvider>
            <FDC3Provider>
              <GlobalScrollbarStyle />
              <ParentContainer>
                <PWAToolbar />
                <BrowserRouter>
                  <Switch>
                    {Object.keys(RouterHelpers.RootRouterItems).map(route => (
                      <Route key={route} exact={true} path={route} component={RouterHelpers.RenderRootRouterElement} />
                    ))}
                  </Switch>
                </BrowserRouter>
              </ParentContainer>
            </FDC3Provider>
          </FocusProvider>
        </SearchContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.secondary.coreSecondary1};
  color: ${({ theme }) => theme.primary.corePrimary};
`

export default App
