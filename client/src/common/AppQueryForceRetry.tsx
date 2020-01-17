/*
  AppQueryForcePoller is a component meant to circumvent the
  common 429 status coded error when working in conjunction with
  the IEX sandbox. As of today, this only applies to the
  development environment.
 */
import React, { useState } from 'react'
import { QueryResult } from 'react-apollo'
import { AppQueryDefaultLoadingIndicator } from './AppQuery'

export const APOLLO_QUERY_FORCE_RETRY_IS_ACTIVE: Boolean = process.env.NODE_ENV === 'development'

const APOLLO_QUERY_ERROR_MESSAGE_FOUR_TWO_NINE: string = 'Request failed with status code 429'
const APOLLO_QUERY_FORCE_RETRY_POLLING_DURATION: number = APOLLO_QUERY_FORCE_RETRY_IS_ACTIVE ? 500 : 0

const checkQueryResultErrors = (result: any) => {
  const { errors = [], error = {} } = result
  return [...errors]
    .concat([...(error.graphQLErrors || [])])
    .filter(e => !!e)
    .map(error => error.message)
    .includes(APOLLO_QUERY_ERROR_MESSAGE_FOUR_TWO_NINE)
}

interface IProps {
  pollingIndicator?: JSX.Element
  renderLoadingHeight?: string
  result: QueryResult
}

export const AppQueryForceRefetcher = (result: any, handler: Function) => {
  if (APOLLO_QUERY_FORCE_RETRY_IS_ACTIVE && checkQueryResultErrors(result))
    return setTimeout(handler, APOLLO_QUERY_FORCE_RETRY_POLLING_DURATION)
  return 0
}

export const AppQueryForcePoller: React.FunctionComponent<IProps> = props => {
  const [isPolling, setIsPolling] = useState(false)

  const { startPolling, stopPolling } = props.result

  if (APOLLO_QUERY_FORCE_RETRY_IS_ACTIVE) {
    if (!props.result.data) {
      if (checkQueryResultErrors(props.result)) {
        if (!isPolling) {
          setIsPolling(true)
          startPolling(APOLLO_QUERY_FORCE_RETRY_POLLING_DURATION)
        }
        return (
          props.pollingIndicator || <AppQueryDefaultLoadingIndicator renderLoadingHeight={props.renderLoadingHeight} />
        )
      }
    } else if (isPolling) {
      setIsPolling(false)
      stopPolling()
    }
  }

  return <>{props.children}</>
}