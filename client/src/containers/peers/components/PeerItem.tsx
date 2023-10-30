import React, { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

import { PeersLink } from "./Peers.styles"

type PeerItemProps = {
  symbol: string
}

const PeerItem: React.FunctionComponent<PeerItemProps> = ({ symbol }) => {
  const navigate = useNavigate()
  const navClickHandler: MouseEventHandler<HTMLAnchorElement> = async (
    event,
  ) => {
    const newSymbol = event.currentTarget.dataset.symbol

    navigate(`/stock/${newSymbol}`)
  }

  return (
    <PeersLink onClick={navClickHandler} data-symbol={symbol} key={symbol}>
      {symbol}
    </PeersLink>
  )
}

export default PeerItem
