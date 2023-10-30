import React, { useState } from "react"

interface FocusContext {
  isFocused: boolean
  setFocus: (isFocused: boolean) => void
}

export const FocusContext = React.createContext<FocusContext>({
  isFocused: false,
  setFocus: () => null,
})

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const setFocus = (isFocused: boolean) => {
    setIsFocused(isFocused)
  }

  return (
    <FocusContext.Provider value={{ isFocused, setFocus }}>
      {children}
    </FocusContext.Provider>
  )
}
