import { usePlatform } from '@/ra-platforms'
import React, { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import apolloClient from '../../apollo/client'
import AdaptiveLoader from '../../common/AdaptiveLoader'
import { AppQuery } from '../../common/AppQuery'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import { search as SimpleSearchQuery, searchVariables, search_symbols } from './graphql/types/search'
import { searchQuery, searchQueryVariables } from './graphql/types/searchQuery'
import { SearchInput } from './components'
import SearchConnection from './graphql/SearchConnection.graphql'
import SimpleSearchConnection from './graphql/SimpleSearchConnection.graphql'
import { SearchContextActionTypes } from './SearchContext'
import { SearchErrorCard } from './SearchErrorCard'
import { MarketSegment } from '@/containers/global-types'
import { checkIncomingSymbol } from './components'
import { useSearch, useFDC3Context } from '@/hooks'

interface IProps extends IApolloContainerProps {
  url?: string
  market: MarketSegment
}

type Props = RouteComponentProps & IProps

const ApolloSearchContainer: React.FunctionComponent<Props> = ({ id, history, url, market }) => {
  const [currentText, setCurrentText] = useState<string>('')

  const { currentSymbol, refetchAttempts, searching, dispatch } = useSearch()

  const placeholderText = 'Enter a stock, symbol, or currency pair...'

  const platform = usePlatform()
  const { fdc3Symbol, clearSymbol } = useFDC3Context()

  const handleChange = useCallback(
    (symbol: search_symbols | null) => {
      if (dispatch) {
        ReactGA.event({
          category: 'RA - Search',
          action: 'search',
          label: symbol?.id,
          transport: 'beacon',
        })
        dispatch({
          type: SearchContextActionTypes.SelectedSymbol,
          payload: { currentSymbol: symbol },
        })
      }
      if (symbol) {
        clearSymbol()
        // This causes a loop with itself which will need addressing if this funtionality is one day required.
        // platform.symbolSelected(symbol)
        history.push(`/${(symbol.marketSegment || url || '').toLowerCase()}/${symbol.id}`)
      } else {
        history.push(`/${url}`)
      }
    },
    [dispatch, history, url, platform],
  )

  useEffect(() => {
    ;(async function () {
      if (fdc3Symbol) {
        const checkedSymbol = await checkIncomingSymbol(fdc3Symbol)
        if (checkedSymbol) {
          handleChange(checkedSymbol)
        } else {
          console.info(`The FDC3 symbol ${fdc3Symbol} did not match any known symbols`)
        }
      }
    })()
  }, [fdc3Symbol, handleChange])

  useEffect(() => {
    if (dispatch) {
      if (id) {
        dispatch({ type: SearchContextActionTypes.FindSymbol })
      } else {
        dispatch({ type: SearchContextActionTypes.ClearedSymbol })
      }
    }
  }, [dispatch, id])

  useEffect(() => {
    if (searching && dispatch && id) {
      apolloClient
        .query<searchQuery, searchQueryVariables>({
          errorPolicy: 'all',
          query: SearchConnection,
          variables: { id: id.toUpperCase(), market: market.toUpperCase() },
        })
        .then(result => {
          if (result.data && result.data.symbol) {
            if (result.data.symbol.id === id.toUpperCase()) {
              dispatch({
                type: SearchContextActionTypes.FoundSymbol,
                payload: { currentSymbol: result.data.symbol },
              })
              return Promise.resolve()
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
              errorMessage: <SearchErrorCard id={id} market={market} onClick={handleChange} />,
            },
          })
        })
    }
  }, [dispatch, history, id, market, refetchAttempts, searching, url, handleChange])

  const onTextChange = (text: string) => {
    setCurrentText(text)
  }

  const onSearchInputResults = (
    stockSearch: SimpleSearchQuery | null,
    fxSearch?: SimpleSearchQuery | null,
  ): JSX.Element => {
    if (!(currentSymbol && currentSymbol.id) && id && searching) {
      return <AdaptiveLoader size={50} speed={1.4} />
    }

    const stockSymbols = stockSearch ? stockSearch.symbols.map(s => ({ ...s, marketSegment: MarketSegment.STOCK })) : []
    const fxSymbols = fxSearch ? fxSearch.symbols.map(s => ({ ...s, marketSegment: MarketSegment.FX })) : []
    const symbols = stockSymbols
      .concat(fxSymbols)
      .sort((a, b) => {
        switch (true) {
          case a.id === currentText.toUpperCase():
            return -1
          case b.id === currentText.toUpperCase():
            return 1
          case a.id < b.id:
            return -1
          default:
            return 1
        }
      })
      .slice(0, 9)

    return (
      <SearchInput
        initialItem={currentSymbol ? currentSymbol : null}
        items={symbols}
        maxItems={8}
        onChange={handleChange}
        onTextChange={onTextChange}
        placeholder={placeholderText}
        currentText={currentText}
      />
    )
  }

  return (
    <AppQuery<SimpleSearchQuery, searchVariables>
      query={SimpleSearchConnection}
      variables={{ text: currentText.toUpperCase(), marketSegment: MarketSegment.STOCK }}
      renderNoData={() => null}
    >
      {(stockSearch: SimpleSearchQuery) => {
        return (
          <AppQuery<SimpleSearchQuery, searchVariables>
            query={SimpleSearchConnection}
            variables={{ text: currentText.toUpperCase(), marketSegment: MarketSegment.FX }}
            renderNoData={() => onSearchInputResults(stockSearch)}
          >
            {(fxSearch: SimpleSearchQuery) => onSearchInputResults(stockSearch, fxSearch)}
          </AppQuery>
        )
      }}
    </AppQuery>
  )
}

export default withRouter(ApolloSearchContainer)
