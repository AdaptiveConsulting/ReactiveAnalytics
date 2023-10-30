import React from "react"
import { Route, Routes } from "react-router-dom"

import { MainLayout } from "./containers"
import { MarketSegment } from "./containers/global-types"
import { Currencies, Stocks } from "./containers/main-layout/Markets"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout market={MarketSegment.STOCK} />}>
        <Route path="stock/:id?" element={<Stocks />} />
      </Route>
      <Route path="/fx/" element={<MainLayout market={MarketSegment.FX} />}>
        <Route path=":id?" element={<Currencies />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
