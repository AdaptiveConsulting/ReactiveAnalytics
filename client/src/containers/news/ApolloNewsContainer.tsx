import React from "react"
import { useParams } from "react-router-dom"

import { AppQuery } from "../../common/AppQuery"
import { News } from "./components"
import NewsConnection from "./graphql/NewsConnection.graphql"
import { NewsQuery, NewsQueryVariables } from "./graphql/types/NewsQuery"

const ApolloNewsContainer = () => {
  const id = useParams()["id"] || ""
  const onNewsQueryResults = ({ news }: NewsQuery): JSX.Element => {
    return <News news={news} id={id} />
  }

  return (
    <AppQuery<NewsQuery, NewsQueryVariables>
      query={NewsConnection}
      variables={{ id }}
      renderLoadingHeight="225px"
    >
      {onNewsQueryResults}
    </AppQuery>
  )
}

export default ApolloNewsContainer
