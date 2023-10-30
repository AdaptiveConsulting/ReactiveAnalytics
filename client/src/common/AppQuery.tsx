import { NetworkStatus, QueryResult, useQuery } from "@apollo/client"
import { DocumentNode } from "graphql"
import React, { ReactNode } from "react"
import styled from "styled-components/macro"

import AdaptiveLoader from "../common/AdaptiveLoader"

const LoadableStyle = styled.div<{ $minWidth?: string; $minHeight?: string }>`
  width: 100%;
  min-width: ${(props) => props.$minWidth || "100%"};
  height: 100%;
  min-height: ${(props) => props.$minHeight || "100%"};
  border-radius: 0.1875rem;
  color: ${({ theme }) => theme.textColorPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.59;
  fill: ${({ theme }) => theme.textColorPrimary};
`

type IndicatorProps = {
  renderLoadingHeight?: string
}
export const AppQueryDefaultLoadingIndicator: React.FunctionComponent<IndicatorProps> =
  React.memo(function LoadingIndicator({
    renderLoadingHeight,
  }: IndicatorProps) {
    return (
      <LoadableStyle $minHeight={renderLoadingHeight}>
        <AdaptiveLoader size={50} speed={1.4} />
      </LoadableStyle>
    )
  })

interface IAppQueryProps<Data, Variables> {
  query: DocumentNode
  children: (data: Data, result: QueryResult<Data, Variables>) => ReactNode
  renderNetworkStatus?: (
    networkStatus: NetworkStatus,
    result: QueryResult<Data, Variables>,
  ) => ReactNode
  renderError?: (
    error: Error,
    result: QueryResult<Data, Variables>,
  ) => ReactNode
  renderNoData?: (result: QueryResult<Data, Variables>) => ReactNode
  renderLoadingHeight?: string
  variables?: Variables
}

export const AppQuery = <Data, Variables>({
  query,
  variables,
  ...props
}: IAppQueryProps<Data, Variables>) => {
  const result = useQuery(query, { variables })

  const errorMessage = (
    <span>
      Something went wrong
      <span />
    </span>
  )

  const defaultRenderNetworkStatus = (
    networkStatus: NetworkStatus,
    _: QueryResult<Data, Variables>,
  ) => {
    if (networkStatus === NetworkStatus.loading) {
      return (
        <AppQueryDefaultLoadingIndicator
          renderLoadingHeight={props.renderLoadingHeight}
        />
      )
    } else if (networkStatus === NetworkStatus.error) {
      return errorMessage
    }
    return null
  }

  const defaultRenderNoData = (_: QueryResult<Data, Variables>) => {
    return <div>No data</div>
  }

  const onQueryResults = (queryResult: QueryResult<Data, Variables>) => {
    const { children, renderNetworkStatus, renderNoData } = props

    const networkStatusNode = (
      renderNetworkStatus || defaultRenderNetworkStatus
    )(queryResult!.networkStatus, queryResult)
    if (networkStatusNode) {
      return networkStatusNode
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

  return <>{onQueryResults(result)}</>
}
