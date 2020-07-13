import * as React from 'react'
import { StatsQuery, StatsQueryVariables } from '../../__generated__/types'
import { AppQuery } from '../../common/AppQuery'
import { IApolloContainerProps } from '../../common/IApolloContainerProps'
import { Stats } from './components'
import StatsConnection from './graphql/StatsConnection.graphql'
import { StatisticsWrapper } from 'common/StyledComponents'

const Statistics: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  const onStatsQueryResults: (data: StatsQuery) => JSX.Element = ({ stock }) => {
    return <Stats stock={stock} id={id} />
  }

  return (
    <AppQuery<StatsQuery, StatsQueryVariables> query={StatsConnection} variables={{ id }} renderLoadingHeight="225px">
      {onStatsQueryResults}
    </AppQuery>
  )
}

const ApolloStatsContainer: React.FC<IApolloContainerProps> = ({ id }) => (
  <StatisticsWrapper>
    <Statistics id={id} />
  </StatisticsWrapper>
)

export default ApolloStatsContainer
