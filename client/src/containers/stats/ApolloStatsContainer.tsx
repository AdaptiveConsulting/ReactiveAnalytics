import * as React from "react"
import { useParams } from "react-router-dom"

import { StatisticsWrapper } from "@/common/StyledComponents"

import { AppQuery } from "../../common/AppQuery"
import { IApolloContainerProps } from "../../common/IApolloContainerProps"
import { Stats } from "./components"
import StatsConnection from "./graphql/StatsConnection.graphql"
import { StatsQuery, StatsQueryVariables } from "./graphql/types/StatsQuery"

const Statistics = () => {
  const id = useParams()["id"] || ""
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
    <Statistics />
  </StatisticsWrapper>
)

export default ApolloStatsContainer
