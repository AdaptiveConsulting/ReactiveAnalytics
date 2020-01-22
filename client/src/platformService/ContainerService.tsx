import { OpenfinContainer } from 'openfin/OpenfinService'
import { FDC3OpenfinProvider } from 'containers/fdc3/fdc3-openfinProvider'
import { IContainerService } from './IContainerServices'
import { FDC3BrowserProvider } from 'containers/fdc3/fdc3-browserProvider'
import { BrowserContainer } from 'browser/BrowserService'
import { Provider, Subscribe, ProviderProps } from 'unstated'
import React, { FC } from 'react'

const getContainerService = (): IContainerService => {
  if (typeof fin !== 'undefined') {
    return new OpenfinContainer(new FDC3OpenfinProvider())
  }

  return new BrowserContainer(new FDC3BrowserProvider())
}

export const ContainerService = getContainerService()

export const ContainerServiceProvider: FC<ProviderProps> = props => {
  return <Provider inject={props.inject || [ContainerService]}>{props.children}</Provider>
}

type SubscribeProps = {
  children(instances: IContainerService): React.ReactNode
}

export const ContainerServiceSubscribe: FC<SubscribeProps> = props => {
  return <Subscribe to={[ContainerService]}>{props.children}</Subscribe>
}
