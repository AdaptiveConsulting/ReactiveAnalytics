import { addContextListener, Context, joinChannel } from "@finos/fdc3"
import React, { useEffect, useState } from "react"

interface FDC3Context {
  fdc3Symbol: string | null
  clearSymbol: () => void
}

export const FDC3Context = React.createContext<FDC3Context>({
  fdc3Symbol: null,
  clearSymbol: () => null,
})

export const FDC3Provider = ({ children }: { children: React.ReactNode }) => {
  const [fdc3Symbol, setCurrentSymbol] = useState<string | null>(null)

  useEffect(() => {
    const setContext = (context: Context) => {
      if (context.type === "fdc3.instrument" && context.id?.ticker) {
        setCurrentSymbol(context.id?.ticker)
      }
    }

    if (window.fdc3) {
      joinChannel("green").then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore ... FDC3 types not caught up with spec yet
        const listener = addContextListener(null, setContext)
        return () => {
          listener.unsubscribe()
        }
      })
    }
  }, [])

  const clearSymbol = () => {
    setCurrentSymbol(null)
  }

  return (
    <FDC3Context.Provider value={{ fdc3Symbol, clearSymbol }}>
      {children}
    </FDC3Context.Provider>
  )
}
