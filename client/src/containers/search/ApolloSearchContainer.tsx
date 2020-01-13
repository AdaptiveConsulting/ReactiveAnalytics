import Fdc3Context from 'containers/fdc3/fdc3-context'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import {
  MarketSegment,
  search as SimpleSearchQuery,
  search_symbols,
  searchVariables,
  CompanyQuery,
  CompanyQueryVariables,
} from '../../__generated__/types'
import apolloClient from '../../apollo/client'
import { AppQuery } from '../../common/AppQuery'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import OpenfinService from '../../openfin/OpenfinService'
import { SearchInput } from './components'
import SimpleSearchConnection from './graphql/SimpleSearchConnection.graphql'
import SearchbarConnection from './graphql/SearchbarConnection.graphql'

interface IProps extends IApolloContainerProps {
  url?: string
  market: MarketSegment
}

type Props = RouteComponentProps & IProps

const ApolloSearchContainer: React.FunctionComponent<Props> = ({ id, history, url, market }: Props) => {
  const [currentSymbol, setCurrentSymbol] = useState<search_symbols | null>(null)
  const [currentText, setCurrentText] = useState<string>('')

  const currencyPairContext = useContext(Fdc3Context)
  const hasCurrencyPairContext = currencyPairContext && currencyPairContext.market === 'CURRENCY'
  const instrumentId = hasCurrencyPairContext ? currencyPairContext.name : id

  const placeholderTest = {
    crypto: 'Enter a crypto currency or ticket symbol...',
    currency: 'Enter a currency pair...',
    stock: 'Enter a stock or symbol...',
  }

  useEffect(() => {
    if (instrumentId) {
      apolloClient
        .query<CompanyQuery, CompanyQueryVariables>({
          query: SearchbarConnection,
          variables: { id: instrumentId },
        })
        .then((result: any) => {
          if (result.data && result.data.stock) {
            setCurrentSymbol({
              __typename: 'SearchResult',
              id: result.data.stock.id,
              name: result.data.stock.company.name,
            } as search_symbols)

            if (hasCurrencyPairContext) {
              history.replace(`/${url}/${result.data.stock.id}`)
              OpenfinService.NavigateToStock(result.data.stock.id)
            }
          }
        })
    } else {
      setCurrentSymbol(null)
    }
  }, [instrumentId, market, url, hasCurrencyPairContext, history])

  const onTextChange = (text: string) => {
    setCurrentText(text)
  }

  const handleChange = (symbol: search_symbols | null) => {
    setCurrentSymbol(symbol)
    if (symbol) {
      history.push(`/${url}/${symbol.id}`)
      OpenfinService.NavigateToStock(symbol.id)
      OpenfinService.broadcastStock(symbol)
    } else {
      history.push(`/${url}`)
    }
  }

  const onSearchInputResults = ({ symbols }: SimpleSearchQuery): JSX.Element => {
    return (
      <SearchInput
        initialItem={currentSymbol ? currentSymbol : null}
        items={symbols}
        onChange={handleChange}
        onTextChange={onTextChange}
        placeholder={placeholderTest[market.toLowerCase()]}
      />
    )
  }

  return (
    <AppQuery<SimpleSearchQuery, searchVariables>
      query={SimpleSearchConnection}
      variables={{ text: currentText, marketSegment: market.toUpperCase() as MarketSegment }}
    >
      {onSearchInputResults}
    </AppQuery>
  )
}

export default withRouter(ApolloSearchContainer)
