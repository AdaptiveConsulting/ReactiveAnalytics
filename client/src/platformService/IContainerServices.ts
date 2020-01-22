import { Context } from 'openfin-fdc3'
import { IWindowConfig } from 'openfin/OpenfinService'
import { _Window } from 'openfin/_v2/api/window/window'
import { Container } from 'unstated'

type WindowIdentity = { name?: string }
type ApplicationIdentity = { uuid: string }
type ContainerState = {
  app: { identity: ApplicationIdentity } | undefined
  win: { identity: WindowIdentity } | undefined
}

type AgentType = 'browser' | 'desktop'

export abstract class IContainerService extends Container<ContainerState> {
  abstract readonly agent: AgentType
  abstract broadcast(context: Context): void
  abstract navigateToStock(symbol: string): void
  abstract OpenWindow(config: IWindowConfig, onClose?: () => void): void
}
