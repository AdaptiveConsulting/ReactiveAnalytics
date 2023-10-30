import React from "react"
import { Outlet } from "react-router-dom"

import { MarketSegment } from "@/containers/global-types"
import { PriceTicker } from "@/containers/price-ticker"
import { useSearch } from "@/hooks"

import {
  MainSearchContent,
  SearchGridArea,
  WrapperContent,
} from "../../common/StyledComponents"
import { Search } from "../index"
import Footer from "./Footer"

export const CurrentSymbolLayout = ({
  id,
  market,
}: {
  id?: string
  market: MarketSegment
}) => {
  const { currentSymbol, previousSearch } = useSearch()

  return (
    <WrapperContent>
      <MainSearchContent $hasPreviousSearch={previousSearch ?? false}>
        <SearchGridArea>
          <Search id={id} url={market} market={market} />
          {currentSymbol && <PriceTicker market={market} />}
        </SearchGridArea>
      </MainSearchContent>
      {currentSymbol && <Outlet />}
      <Footer hasNoSearch={!currentSymbol} />
    </WrapperContent>
  )
}
