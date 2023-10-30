import React from "react"
import { useParams } from "react-router-dom"

import { MainGridArea } from "@/common/StyledComponents"
import { FXHistory } from "@/containers/history"

const Currencies = () => {
  const { id } = useParams()
  return (
    <MainGridArea>
      <FXHistory id={id} />
    </MainGridArea>
  )
}

export default Currencies
