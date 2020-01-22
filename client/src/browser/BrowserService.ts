import { IContainerService } from 'platformService/IContainerServices'
import { FDC3Provider } from 'containers/fdc3/fdc3-providerType'

export class BrowserContainer extends IContainerService {
  public readonly agent = 'browser'

  constructor(fdc3Provider: FDC3Provider) {
    super()
    this.state = {
      win: { identity: { name: '__BROWSER__' } },
      app: { identity: { uuid: 'APP_ROOT' } },
    }
  }

  public broadcast = () => {}

  public navigateToStock = () => {}

  public OpenWindow = () => {}
}
