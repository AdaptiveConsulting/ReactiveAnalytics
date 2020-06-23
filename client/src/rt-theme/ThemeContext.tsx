import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro'
import { themes } from './themes'

export enum ThemeName {
  Light = 'light',
  Dark = 'dark',
}

interface IContextValue {
  themeName?: string
  setTheme: (selector: { themeName: ThemeName }) => void
}

const ThemeContext = React.createContext<IContextValue>({
  setTheme: () => null,
})

const STORAGE_KEY = 'themeName'

const ThemeStorageProvider: React.FunctionComponent<{ storage?: typeof localStorage | typeof sessionStorage }> = ({
  storage,
  children,
}) => {
  const [initialized, setInitialized] = useState(false)
  const [themeName, setThemeName] = useState<ThemeName>(ThemeName.Dark)

  const internalStorage = storage || localStorage

  const setTheme: (selector: { themeName: ThemeName }) => void = (selector) => {
    if (selector.themeName !== themeName) {
      setThemeName(selector.themeName)
      internalStorage.setItem(STORAGE_KEY, selector.themeName)
    }
  }

  useEffect(() => {
    const setThemeFromStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const storedThemeName = internalStorage.getItem(STORAGE_KEY) as ThemeName
        if (storedThemeName && themes[storedThemeName] != null) {
          setThemeName(storedThemeName)
        }
      }
    }

    if (!initialized) {
      setInitialized(true)
      setThemeName((internalStorage.getItem(STORAGE_KEY) as ThemeName) || ThemeName.Dark)
      window.addEventListener('storage', setThemeFromStorage)
    }
    // return () => { window.removeEventListener('storage', setThemeFromStorage) }
  }, [initialized, internalStorage, themeName])

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <StyledThemeProvider theme={themes[themeName]}>
        <>{children}</>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const toggleTheme = () =>
    setTheme({
      themeName: themeName === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark,
    })
  return { themeName, setTheme, toggleTheme }
}

export const ThemeProvider = ThemeStorageProvider
export const ThemeConsumer = ThemeContext.Consumer
