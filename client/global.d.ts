declare module 'styled-components/macro' {
  import { ThemedStyledComponentsModule, ThemedBaseStyledInterface } from 'styled-components'
  import { Theme } from './themes'

  const ModuleInterface: ThemedStyledComponentsModule<Theme>

  export const createGlobalStyle: typeof ModuleInterface.createGlobalStyle
  export const css: typeof ModuleInterface.css
  export const keyframes: typeof ModuleInterface.keyframes
  export const Keyframes: typeof ModuleInterface.Keyframes
  export const isStyledComponent: typeof ModuleInterface.isStyledComponent
  export const ServerStyleSheet: typeof ModuleInterface.ServerStyleSheet
  export const StyleSheetManager: typeof ModuleInterface.StyleSheetManager
  export const ThemeConsumer: typeof ModuleInterface.ThemeConsumer
  export const ThemeContext: typeof ModuleInterface.ThemeContext
  export const ThemeProvider: typeof ModuleInterface.ThemeProvider
  export const withTheme: typeof ModuleInterface.withTheme
  export default ModuleInterface.default
}
