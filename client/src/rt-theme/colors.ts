import { DefaultTheme } from 'styled-components'
import { buttons } from './buttons'
import { animations } from './animations'

export type Color = string

export interface PrimaryPalette {
  corePrimary: Color
  corePrimary1: Color
  corePrimary2: Color
  corePrimary3: Color
  corePrimary4: Color
  corePrimary5: Color
}

export interface SecondaryPalette {
  coreSecondary: Color
  coreSecondary1: Color
  coreSecondary2: Color
  coreSecondary3: Color
  coreSecondary4: Color
  coreSecondary5: Color
}

export interface AccentPalette {
  accentPrimary: Color
  accentPrimary1: Color
  accentPrimary2: Color
  accentPositive: Color
  accentPositive1: Color
  accentPositive2: Color
  accentPositive3: Color
  accentBeAware: Color
  accentBeAware1: Color
  accentBeAware2: Color
  accentBeAware3: Color
  accentNegative: Color
  accentNegative1: Color
  accentNegative2: Color
  accentNegative3: Color
  tradingSell: Color
  tradingSell1: Color
  tradingBuy: Color
  tradingBuy1: Color
  shadow: Color
}

export interface ColorPalettes {
  primary: PrimaryPalette
  secondary: SecondaryPalette
  accents: AccentPalette
}

export const light: DefaultTheme = {
  primary: {
    corePrimary: '#323232',
    corePrimary1: '#383838',
    corePrimary2: '#4D4D4D',
    corePrimary3: '#5F5F5F',
    corePrimary4: '#707070',
    corePrimary5: '#828282',
  },
  secondary: {
    coreSecondary: '#FFFFFF',
    coreSecondary1: '#F9FAFA',
    coreSecondary2: '#F1F2F2',
    coreSecondary3: '#EAEBEB',
    coreSecondary4: '#D8D9D9',
    coreSecondary5: '#BFC0C0',
  },
  accents: {
    accentPrimary: '#AAABD1',
    accentPrimary1: '#767791',
    accentPrimary2: '#C3C4DE',
    accentPositive: '#01C38D',
    accentPositive1: '#03A077',
    accentPositive2: '#0C9674',
    accentPositive3: '#99E7D1',
    accentBeAware: '#FF8D00',
    accentBeAware1: '#E57E00',
    accentBeAware2: '#FFC57F',
    accentBeAware3: '#FFE8CC',
    accentNegative: '#FF274B',
    accentNegative1: '#E62343',
    accentNegative2: '#FF92A4',
    accentNegative3: '#FFD3DB',
    tradingSell: '#FF274B',
    tradingSell1: '#FFD3DB',
    tradingBuy: '#2D95FF',
    tradingBuy1: '#BFDEFF',
    shadow: '0 0 20px 0 rgba(0, 0, 0, 0.15)',
  },
  ...buttons,
  ...animations,
}

export const dark: DefaultTheme = {
  primary: {
    corePrimary: '#FFFFFF',
    corePrimary1: '#F9FAFA',
    corePrimary2: '#F1F2F2',
    corePrimary3: '#EAEBEB',
    corePrimary4: '#D8D9D9',
    corePrimary5: '#BFC0C0',
  },
  secondary: {
    coreSecondary: '#323232',
    coreSecondary1: '#383838',
    coreSecondary2: '#4D4D4D',
    coreSecondary3: '#5F5F5F',
    coreSecondary4: '#707070',
    coreSecondary5: '#828282',
  },
  accents: {
    accentPrimary: '#AAABD1',
    accentPrimary1: '#767791',
    accentPrimary2: '#C3C4DE',
    accentPositive: '#01C38D',
    accentPositive1: '#03A077',
    accentPositive2: '#33CFA3',
    accentPositive3: '#99E7D1',
    accentBeAware: '#FF8D00',
    accentBeAware1: '#E57E00',
    accentBeAware2: '#FFC57F',
    accentBeAware3: '#FFE8CC',
    accentNegative: '#FF274B',
    accentNegative1: '#E62343',
    accentNegative2: '#FCA5A5',
    accentNegative3: '#FFD3DB',
    tradingSell: '#FF274B',
    tradingSell1: '#FFD3DB',
    tradingBuy: '#2D95FF',
    tradingBuy1: '#BFDEFF',
    shadow: '0 0 20px 0 rgba(0, 0, 0, 0.45)',
  },
  ...animations,
  ...buttons,
}

export const colors = {
  dark,
  light,
}
