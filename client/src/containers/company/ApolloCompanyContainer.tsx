import React from "react"

import { AppQuery } from "../../common/AppQuery"
import { Company } from "./components"
import CompanyConnection from "./graphql/CompanyConnection.graphql"
import {
  CompanyQuery,
  CompanyQueryVariables,
} from "./graphql/types/CompanyQuery"

const ApolloCompanyContainer = ({ id }: { id: string }) => {
  const onCompanyQueryResults = (data: CompanyQuery): JSX.Element => (
    <Company company={data.stock.company} />
  )

  return (
    <AppQuery<CompanyQuery, CompanyQueryVariables>
      query={CompanyConnection}
      variables={{ id }}
      renderLoadingHeight="175px"
    >
      {onCompanyQueryResults}
    </AppQuery>
  )
}

export default ApolloCompanyContainer
