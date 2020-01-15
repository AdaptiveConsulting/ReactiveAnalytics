/** The Apollo cache seems to use a deep copy of an object and failed on storing functions.
 *  So we will store a globally accessible instance of Openfin.
 */
import { _Window } from 'openfin/_v2/api/window/window'
import { Application } from 'openfin/_v2/main'
import React from 'react'
import { Container, Provider, Subscribe } from 'unstated'
import { search_symbols } from '__generated__/types'
import { getStockContext } from './util'
import { FDC3Provider } from '../containers/fdc3/fdc3-providerType'
import { getFDC3Provider } from '../containers/fdc3/fdc3-util/getFDC3Provider'

const fin = (window as any).fin

interface IOpenfinState {
  openfin?: {
    app: Application
    win: _Window
  }
}

interface IWindowConfig {
  name: string
  url: string
}

export class OpenfinContainer extends Container<IOpenfinState> {
  private readonly windows: Map<string, _Window> = new Map()
  private readonly fdc3: FDC3Provider

  constructor(fdc3Provider: FDC3Provider) {
    super()
    this.state = {}
    this.fdc3 = fdc3Provider
    if (typeof fin !== 'undefined') {
      this.loadOpenfin()
    }
  }

  public NavigateToStock(symbol: string) {
    this.windows.forEach(async (window, name) => {
      // typings don't match functions
      // const newWindow = await (window as any).getNativeWindow()
      // newWindow.history.pushState(null,null, `/${name}/${symbol}`)
      window.navigate(`http://localhost:3000/${name}/${symbol}`)
    })
  }

  public broadcastStock(symbol: search_symbols) {
    this.fdc3.broadcast(getStockContext(symbol))
  }

  public async OpenWindow(config: IWindowConfig, onClose?: () => void) {
    const { name, url } = config
    const win = await new fin.desktop.Window(
      {
        autoShow: true,
        frame: false,
        name,
        state: 'normal',
        url,
      },
      () => {
        this.windows.set(name, win)
        if (onClose) {
          win.addEventListener('closed', () => {
            onClose()
            this.windows.delete(name)
          })
        }
      },
    )
  }

  public getWindowHandle(name: string): _Window | undefined {
    return this.windows.get(name)
  }

  private async loadOpenfin() {
    this.setState({
      openfin: {
        app: await fin.Application.getCurrent(),
        win: await fin.Window.getCurrent(),
      },
    })
  }
}

const fdc3EnvProvider = getFDC3Provider()

const OpenfinApi = new OpenfinContainer(fdc3EnvProvider)

export const OpenfinApiProvider = (props: any) => {
  return <Provider inject={props.inject || [OpenfinApi]}>{props.children}</Provider>
}

export const OpenfinApiSubscribe = (props: any) => {
  return <Subscribe to={[OpenfinApi]}>{props.children}</Subscribe>
}

export default OpenfinApi
