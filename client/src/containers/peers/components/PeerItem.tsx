import React, { MouseEventHandler } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link } from '../../../common/StyledComponents'
import { ContainerService } from 'platformService/ContainerService'

type PeerItemProps = RouteComponentProps & {
  symbol: string
}

const PeerItem: React.FunctionComponent<PeerItemProps> = ({ symbol, history }) => {
  const navClickHandler: MouseEventHandler<HTMLAnchorElement> = async event => {
    const newSymbol = event.currentTarget.dataset.symbol
    const { win, app } = ContainerService.state
    if (win && app && newSymbol && fin) {
      // we in an openfin app, let's see if we are in a child window
      if (win.identity.name === app.identity.uuid) {
        // parent window, proceed
        history.push(`/stock/${newSymbol}`)
        ContainerService.navigateToStock(newSymbol)
      } else {
        // TODO: Add "navigateParent" to ContainerService
        // child window, tell parent to navigate
        // TODO: `getParentWindow` doesn't exist on `OpenFinWindowStatic` - Check if this breaks
        const parent = await (fin.desktop.Window as any).getParentWindow()
        // const parent = fin.desktop.Window.getCurrent().getParentApplication();
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
