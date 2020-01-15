import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link } from '../../../common/StyledComponents'
import OpenfinService from '../../../openfin/OpenfinService'

const fin = (window as any).fin

const PeerItem: React.FunctionComponent<RouteComponentProps & { symbol: string }> = ({ symbol, history }) => {
  const navClickHandler = async (e: any) => {
    const newSymbol = e.currentTarget.dataset.symbol
    if (OpenfinService.state && OpenfinService.state.openfin) {
      const openfin = OpenfinService.state.openfin
      // we in an openfin app, let's see if we are in a child window
      if (openfin.win.identity.name === openfin.app.identity.uuid) {
        // parent window, proceed
        history.push(`/stock/${newSymbol}`)
        OpenfinService.NavigateToStock(newSymbol)
        OpenfinService.broadcastStock(newSymbol)
      } else {
        // child window, tell parent to navigate
        const parent = await fin.desktop.Window.getParentWindow()
        parent.location.href = `http://localhost:3000/stock/${newSymbol}`
      }
    } else {
      history.push(`/stock/${newSymbol}`)
    }
  }
  return (
    <Link onClick={navClickHandler} data-symbol={symbol} key={symbol}>
      {symbol}
    </Link>
  )
}

export default withRouter(PeerItem)
