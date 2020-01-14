import Fdc3Context from 'containers/fdc3/fdc3-context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import { SearchContext, SearchContextActionTypes } from './SearchContext'
import { SearchErrorCard } from './SearchErrorCard'

interface IProps extends IApolloContainerProps {
  url?: string
  market: MarketSegment
}

type Props = RouteComponentProps & IProps

const ApolloSearchContainer: React.FunctionComponent<Props> = ({ id, history, url, market }: Props) => {
  const [currentText, setCurrentText] = useState<string>('')

  const { currentSymbol, searching, dispatch } = useContext(SearchContext)
  const currencyPairContext = useContext(Fdc3Context)

  const hasCurrencyPairContext = currencyPairContext && currencyPairContext.market === 'CURRENCY'
  const instrumentId = hasCurrencyPairContext ? currencyPairContext.name : id
  const placeholderTest = {
    crypto: 'Enter a crypto currency or ticket symbol...',
    currency: 'Enter a currency pair...',
    stock: 'Enter a stock or symbol...',
  }

  const handleChange = useCallback(
    (symbol: search_symbols | null) => {
      if (dispatch) {
        dispatch({
          type: SearchContextActionTypes.SelectedSymbol,
          payload: { searching: false, currentSymbol: symbol },
        })
      }
      if (symbol) {
        history.push(`/${url}/${symbol.id}`)
        OpenfinService.NavigateToStock(symbol.id)
      } else {
        history.push(`/${url}`)
      }
    },
    [dispatch, history, url],
  )

  useEffect(() => {
    if (dispatch) {
      if (instrumentId) {
        dispatch({
          type: SearchContextActionTypes.FindSymbol,
          payload: { searching: true, currentSymbol: null },
        })
      } else {
        dispatch({
          type: SearchContextActionTypes.ClearedSymbol,
          payload: { searching: false, currentSymbol: null },
        })
      }
    }
  }, [dispatch, instrumentId])

  useEffect(() => {
    if (searching && dispatch && instrumentId) {
      let foundSymbol: search_symbols | undefined
      apolloClient
        .query<CompanyQuery, CompanyQueryVariables>({
          query: SearchbarConnection,
          variables: { id: instrumentId.toUpperCase() },
        })
        .then((result: any) => {
          if (result.data && result.data.stock) {
            foundSymbol = {
              __typename: 'SearchResult',
              id: result.data.stock.id,
              name: result.data.stock.company.name,
            } as search_symbols
            if (result.data.stock.id === instrumentId.toUpperCase()) {
              dispatch({
                type: SearchContextActionTypes.FoundSymbol,
                payload: { searching: false, currentSymbol: foundSymbol },
              })
              if (hasCurrencyPairContext) {
                history.replace(`/${url}/${result.data.stock.id}`)
                OpenfinService.NavigateToStock(result.data.stock.id)
              }
            } else {
              throw new Error('Returned symbol does not match requested symbol.')
            }
          } else {
            throw new Error('Symbol not recognized.')
          }
        })
        .catch(ex => {
          console.error(ex)
          dispatch({
            type: SearchContextActionTypes.UnrecognizedSymbol,
            payload: {
              searching: false,
              currentSymbol: null,
              errorMessage: (
                <SearchErrorCard id={instrumentId} market={market} foundSymbol={foundSymbol} onClick={handleChange} />
              ),
            },
          })
        })
    }
  }, [dispatch, market, url, handleChange, hasCurrencyPairContext, history, instrumentId, searching])

  const onTextChange = (text: string) => {
    setCurrentText(text)
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
