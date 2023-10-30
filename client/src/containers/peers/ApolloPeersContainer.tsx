import React from "react"
import { useParams } from "react-router-dom"

import { AppQuery } from "../../common/AppQuery"
import { Peers } from "./components"
import CompanyConnection from "./graphql/PeersConnection.graphql"
import { PeersQuery, PeersQueryVariables } from "./graphql/types/PeersQuery"

const ApolloPeersContainer = () => {
  const id = useParams()["id"] || ""
  const onCompanyQueryResult = ({
    stock: { peers },
  }: PeersQuery): JSX.Element => {
    return <Peers peers={peers} id={id} />
  }

  return (
    <AppQuery<PeersQuery, PeersQueryVariables>
      query={CompanyConnection}
      variables={{ id }}
      renderLoadingHeight="100px"
    >
      {onCompanyQueryResult}
    </AppQuery>
  )
}

export default ApolloPeersContainer
