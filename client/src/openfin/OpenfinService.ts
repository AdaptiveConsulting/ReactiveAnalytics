/** The Apollo cache seems to use a deep copy of an object and failed on storing functions.
 *  So we will store a globally accessible instance of Openfin.
 */
import { _Window } from 'openfin/_v2/api/window/window'
import { Context } from 'openfin-fdc3'
import { FDC3Provider } from 'containers/fdc3/fdc3-providerType'
import { IContainerService } from 'platformService/IContainerServices'

export interface IWindowConfig {
  name: string
  url: string
}

export class OpenfinContainer extends IContainerService {
  public readonly agent = 'desktop'
  private readonly windows: Map<string, fin.OpenFinWindow> = new Map()
  private readonly fdc3: FDC3Provider

  constructor(fdc3Provider: FDC3Provider) {
    super()
    this.state = { win: undefined, app: undefined }
    this.fdc3 = fdc3Provider
    if (typeof fin !== 'undefined') {
      this.loadOpenfin()
    }
  }

  public broadcast(context: Context) {
    this.fdc3.broadcast(context)
  }

  public navigateToStock(symbol: string) {
    this.windows.forEach(async (window, name) => {
      // typings don't match functions
      // const newWindow = await (window as any).getNativeWindow()
      // newWindow.history.pushState(null,null, `/${name}/${symbol}`)
      window.navigate(`http://localhost:3000/${name}/${symbol}`)
    })
  }

  public async OpenWindow(config: IWindowConfig, onClose?: () => void) {
    const { name, url } = config
    const win = new fin.desktop.Window(
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

  private async loadOpenfin() {
    const app = await fin.Application.getCurrent()
    const win = await fin.Window.getCurrent()
    this.setState({ app, win })
  }
}
