import { FDC3BrowserProvider } from '../fdc3-browserProvider'
import { FDC3OpenfinProvider } from '../fdc3-openfinProvider'
import { FDC3Provider } from '../fdc3-providerType'

export const getFDC3Provider = (): FDC3Provider => {
  if ('fin' in window) {
    return new FDC3OpenfinProvider()
  }

  return new FDC3BrowserProvider()
}
