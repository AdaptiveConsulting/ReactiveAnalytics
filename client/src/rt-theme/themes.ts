import { darken } from 'polished'
import { DefaultTheme, keyframes } from 'styled-components'
import { Color, colors } from './colors'
import { baselineFontSize } from './fonts'

export interface IMotion {
  duration: number
  easing: string
}

export interface IColorPair {
  backgroundColor: string
  textColor?: string
}

export interface ITouchable {
  backgroundColor: Color
  textColor: Color

  active: IColorPair
  disabled: IColorPair
}
export type TouchableIntentName = 'primary' | 'secondary' | 'mute'
export type TouchableStyleSet = { [style in TouchableIntentName]: ITouchable }

const createTheme = ({ accents, primary, secondary, motion, button }: DefaultTheme) => ({
  black: '#000000',
  transparent: '#00000000',
  white: '#FFFFFF',

  backgroundColor: primary.corePrimary,

  textColorPrimary: primary.corePrimary1,
  textColorSecondary: primary.corePrimary2,

  fontSizeBaseline: baselineFontSize,

  accents,
  primary,
  secondary,

  motion,
  button,

  overlay: {
    backgroundColor: darken(0.1, primary.corePrimary4),
    textColor: secondary.coreSecondary2,
  },

  tile: {
    inputColor: secondary.coreSecondary4,
  },

  flash: keyframes`
    0% {
      background-color: ${primary.corePrimary};
    }
    50% {
      background-color: ${accents.accentBeAware};
    }
    100% {
      background-color: ${primary.corePrimary};
    }
  `,
})

type GeneratedTheme = ReturnType<typeof createTheme>
export type Theme = DefaultTheme & GeneratedTheme

export type ThemeSelector = (theme: Theme) => Color

function isColor(value: string | ThemeSelector): value is Color {
  return typeof value === 'string' && /^(#|rgb|hsl)/.test(value)
}
export const getThemeColor = (theme: Theme, color: Color | ThemeSelector, fallback?: Color) =>
  typeof color === 'function' ? color(theme) || fallback : isColor(color) ? color : fallback

const light = createTheme(colors.light)
const dark = createTheme(colors.dark)

export const themes = {
  light,
  dark,
}
