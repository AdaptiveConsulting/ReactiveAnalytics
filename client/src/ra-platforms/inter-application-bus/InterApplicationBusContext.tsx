import React, { useState, useEffect, useRef } from 'react'
import { ChannelProvider } from 'openfin/_v2/main'

interface InterApplicationBusContext {
  selectedSymbol: string | null
  clearSymbol: () => void
}

export const InterApplicationBusContext = React.createContext<InterApplicationBusContext>({
  selectedSymbol: null,
  clearSymbol: () => null,
})

export const InterApplicationBusProvider: React.FC = ({ children }) => {
  const [selectedSymbol, setCurrentSymbol] = useState<string | null>(null)
  const channelProviderRef = useRef<ChannelProvider | null>(null)

  useEffect(() => {
    if (!window.fin || channelProviderRef.current !== null) {
      return
    }
    async function createInterApplicationBusChannel() {
      const CHANNEL_NAME = 'reactive-ecosystem'
      console.info(`About to create InterApplicationBus channel ${CHANNEL_NAME}`)
      try {
        channelProviderRef.current = await window.fin.InterApplicationBus.Channel.create(CHANNEL_NAME)
      } catch (e) {
        console.error(`Failed to create InterApplicationBus channel ${CHANNEL_NAME}`, e)
        return
      }
      try {
        console.info('About to register handler for symbol-selection message')
        channelProviderRef.current.register('symbol-selection', (payload: { symbol: string }) => {
          console.info(`Received selected symbol, setting current symbol to ticker ${payload.symbol}`)
          setCurrentSymbol(payload.symbol)
        })
      } catch (e) {
        console.error('Failed to register handler for symbol-selection message', e)
      }
    }
    createInterApplicationBusChannel()

    return () => {
      channelProviderRef.current?.destroy()
    }
  }, [])

  const clearSymbol = () => {
    setCurrentSymbol(null)
  }

  return (
    <InterApplicationBusContext.Provider value={{ selectedSymbol, clearSymbol }}>
      {children}
    </InterApplicationBusContext.Provider>
  )
}
