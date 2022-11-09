import { DefaultTheme } from 'styled-components'

export const animations: Pick<DefaultTheme, 'motion'> = {
  motion: {
    duration: 16 * 16,
    easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',

    fast: {
      duration: 16 * 16,
      easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    },

    normal: {
      duration: 16 * 16,
      easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    },

    slow: {
      duration: 16 * 16,
      easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    },
  },
}
