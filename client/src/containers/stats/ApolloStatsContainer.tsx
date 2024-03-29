import * as React from "react"

import { StatisticsWrapper } from "@/common/StyledComponents"

import { AppQuery } from "../../common/AppQuery"
import { IApolloContainerProps } from "../../common/IApolloContainerProps"
import { Stats } from "./components"
import StatsConnection from "./graphql/StatsConnection.graphql"
import { StatsQuery, StatsQueryVariables } from "./graphql/types/StatsQuery"

const Statistics: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  const onStatsQueryResults: (data: StatsQuery) => JSX.Element = ({
    stock,
  }) => {
    return <Stats stock={stock} id={id} />
  }

  return (
    <AppQuery<StatsQuery, StatsQueryVariables>
      query={StatsConnection}
      variables={{ id }}
      renderLoadingHeight="225px"
    >
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
