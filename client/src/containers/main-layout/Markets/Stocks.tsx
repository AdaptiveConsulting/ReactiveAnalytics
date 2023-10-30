import React from "react"
import { useParams } from "react-router-dom"

import { MainGridArea, NewsGridArea } from "../../../common/StyledComponents"
import { Company, History, News, Peers, Stats } from "../../index"

const Stocks = () => {
  const id = useParams()["id"] || ""
  return (
    <>
      <MainGridArea>
        <History id={id} />
        <Stats id={id} />
      </MainGridArea>
      <NewsGridArea>
        <Company id={id} />
        <Peers />
        <News />
      </NewsGridArea>
    </>
  )
}

export default Stocks
