import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLightbulb as farLightBulb } from '@fortawesome/free-regular-svg-icons'
import { faLightbulb as fasLightBulb } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import apolloClient from './apollo/client'
import GlobalScrollbarStyle from './common/GlobalScrollbarStyle'
import { RouterHelpers } from './helpers'
import styled from 'styled-components/macro'
import GlobalStyle from './rt-theme/globals'
import { ThemeProvider } from './rt-theme/ThemeContext'
import { ContainerServiceProvider } from 'platformService/ContainerService'
library.add(fasLightBulb, farLightBulb)

const App = () => {
  return (
    <ContainerServiceProvider>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ThemeProvider>
          <GlobalScrollbarStyle />
          <ParentContainer>
            <BrowserRouter>
              <Switch>
                {Object.keys(RouterHelpers.RootRouterItems).map((route) => (
                  <Route key={route} exact={true} path={route} component={RouterHelpers.RenderRootRouterElement} />
                ))}
              </Switch>
            </BrowserRouter>
          </ParentContainer>
        </ThemeProvider>
      </ApolloProvider>
    </ContainerServiceProvider>
  )
}

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.primary.corePrimary};
  color: ${({ theme }) => theme.secondary.coreSecondary};
`

export default App
