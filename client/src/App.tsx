import { ApolloProvider } from "@apollo/client"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faLightbulb as farLightBulb } from "@fortawesome/free-regular-svg-icons"
import { faLightbulb as fasLightBulb } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import styled from "styled-components/macro"

import apolloClient from "@/apollo/client"
import GlobalScrollbarStyle from "@/common/GlobalScrollbarStyle"
import { PWAToolbar } from "@/containers/main-layout/PWAInstallPrompt"
import { FocusProvider } from "@/containers/search/FocusContext"
import { SearchContextProvider } from "@/containers/search/SearchContext"
import { FDC3Provider } from "@/ra-platforms/fdc3"
import GlobalStyle from "@/rt-theme/globals"
import { ThemeProvider } from "@/rt-theme/ThemeContext"

import AppRoutes from "./Routes"

library.add(fasLightBulb, farLightBulb)

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ThemeProvider>
          <SearchContextProvider>
            <FocusProvider>
              <FDC3Provider>
                <GlobalScrollbarStyle />
                <ParentContainer>
                  <PWAToolbar />
                  <AppRoutes />
                </ParentContainer>
              </FDC3Provider>
            </FocusProvider>
          </SearchContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
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
