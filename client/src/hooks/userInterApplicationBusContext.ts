import { useContext } from 'react'
import { InterApplicationBusContext } from '../ra-platforms/inter-application-bus/InterApplicationBusContext'

export const useInterApplicationBusContext = () => {
  return useContext(InterApplicationBusContext)
}
