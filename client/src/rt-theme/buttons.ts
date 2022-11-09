import { DefaultTheme } from 'styled-components'

export const buttons: Pick<DefaultTheme, 'button'> = {
  button: {
    mute: {
      backgroundColor: 'corePrimary',
      textColor: 'coreSecondary',

      active: {
        backgroundColor: 'corePrimary4',
      },
      disabled: {
        backgroundColor: 'corePrimary3',
      },
    },

    primary: {
      backgroundColor: 'accentPositive',
      textColor: 'corePrimary',

      active: {
        backgroundColor: 'accentPositive3',
      },
      disabled: {
        backgroundColor: 'accentNegative3',
      },
    },

    secondary: {
      backgroundColor: 'coreSecondary',
      textColor: 'corePrimary',

      active: {
        backgroundColor: 'coreSecondary3',
      },
      disabled: {
        backgroundColor: 'coreSecondary4',
      },
    },
  },
}
