import React, { createContext, Dispatch, useReducer } from 'react'
import { search_symbols } from '../../__generated__/types'

interface IState {
  currentSymbol: search_symbols | null
  errorMessage?: string | JSX.Element
  searching: Boolean
}

export enum SearchContextActionTypes {
  ClearedSymbol = 'clearedSymbol',
  FindSymbol = 'findSymbol',
  FoundSymbol = 'foundSymbol',
  SelectedSymbol = 'selectedSymbol',
  UnrecognizedSymbol = 'unrecognizedSymbol',
}

interface IAction {
  type: SearchContextActionTypes
  payload: IState
}

interface IProvide extends IState {
  dispatch?: Dispatch<IAction>
}

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case SearchContextActionTypes.ClearedSymbol:
    case SearchContextActionTypes.FindSymbol:
    case SearchContextActionTypes.FoundSymbol:
    case SearchContextActionTypes.SelectedSymbol:
    case SearchContextActionTypes.UnrecognizedSymbol:
      return { ...action.payload }
    default:
      return state
  }
}

const initialState: IState = { searching: false, currentSymbol: null }

const SearchContext = createContext<IProvide>(initialState)
const SearchContextConsumer = SearchContext.Consumer

const SearchContextProvider: React.FunctionComponent = props => {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState)
  const value: IProvide = { ...state, dispatch }

  return <SearchContext.Provider value={value}>{props.children}</SearchContext.Provider>
}

export { SearchContext, SearchContextConsumer, SearchContextProvider }
