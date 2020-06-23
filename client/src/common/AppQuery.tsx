import { QueryResult } from '@apollo/react-common'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import { DocumentNode } from 'graphql'
import React, { ReactNode } from 'react'
import styled from 'styled-components/macro'
import AdaptiveLoader from '../common/AdaptiveLoader'
import { AppQueryForcePoller } from './AppQueryForceRetry'

const LoadableStyle = styled.div<{ minWidth?: string; minHeight?: string }>`
  width: 100%;
  min-width: ${({ minWidth = '100%' }) => minWidth};
  height: 100%;
  min-height: ${({ minHeight = '100%' }) => minHeight};
  border-radius: 0.1875rem;
  background-color: ${({ theme }) => theme.primary.corePrimary};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.59;
  fill: ${({ theme }) => theme.textColor};
`

export const AppQueryDefaultLoadingIndicator: React.FunctionComponent<{ renderLoadingHeight?: string }> = React.memo(
  ({ renderLoadingHeight }) => (
    <LoadableStyle minHeight={renderLoadingHeight}>
      <AdaptiveLoader size={50} speed={1.4} />
    </LoadableStyle>
  ),
)

interface IAppQueryProps<Data, Variables> {
  query: DocumentNode
  children: (data: Data, result: QueryResult<Data, Variables>) => ReactNode
  renderNetworkStatus?: (networkStatus: NetworkStatus, result: QueryResult<Data, Variables>) => ReactNode
  renderError?: (error: Error, result: QueryResult<Data, Variables>) => ReactNode
  renderNoData?: (result: QueryResult<Data, Variables>) => ReactNode
  renderLoadingHeight?: string
  variables?: Variables
}

export const AppQuery = <Data, Variables>({ query, variables, ...props }: IAppQueryProps<Data, Variables>) => {
  const result = useQuery(query, { variables })

  const defaultRenderNetworkStatus = (networkStatus: NetworkStatus, _: QueryResult<Data, Variables>) => {
    if (networkStatus === NetworkStatus.loading) {
      return <AppQueryDefaultLoadingIndicator renderLoadingHeight={props.renderLoadingHeight} />
    }
    return null
  }

  const defaultRenderError = (_: Error, queryResult: QueryResult<Data, Variables>) => {
    if (!queryResult.data || Object.entries(queryResult.data).length === 0) {
      return (
        <span>
          Something went wrong
          <span />
        </span>
      )
    }
    return null
  }

  const defaultRenderNoData = (_: QueryResult<Data, Variables>) => {
    return <div>No data</div>
  }

  const onQueryResults = (queryResult: QueryResult<Data, Variables>) => {
    const { children, renderNetworkStatus, renderError, renderNoData } = props

    const networkStatusNode = (renderNetworkStatus || defaultRenderNetworkStatus)(
      queryResult!.networkStatus,
      queryResult,
    )
    if (networkStatusNode) {
      return networkStatusNode
    }
    const errorNode = queryResult.error
      ? (renderError || defaultRenderError)(queryResult!.error!, queryResult)
      : undefined
    if (errorNode) {
      return errorNode
    }
    const noDataNode =
      !queryResult.data || Object.entries(queryResult.data).length === 0
        ? (renderNoData || defaultRenderNoData)(queryResult)
        : undefined
    if (noDataNode) {
      return noDataNode
    }

    return children(queryResult.data!, queryResult)
  }

  return (
    <AppQueryForcePoller result={result} renderLoadingHeight={props.renderLoadingHeight}>
      {onQueryResults(result)}
    </AppQueryForcePoller>
  )
}
