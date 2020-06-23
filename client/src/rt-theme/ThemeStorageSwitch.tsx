import React from 'react'
import Switch, { ReactSwitchProps } from 'react-switch'
import { withTheme } from 'styled-components/macro'
import { Theme, ThemeName, useTheme } from '../rt-theme'

export interface IThemeStorageSwitchProps extends Partial<ReactSwitchProps> {}

const ThemeStorageSwitch: React.FC<IThemeStorageSwitchProps & { theme: Theme }> = ({ theme, ...props }) => {
  const { themeName, toggleTheme } = useTheme()

  return (
    <Switch
      onChange={toggleTheme}
      checked={themeName === ThemeName.Dark}
      checkedIcon={false}
      uncheckedIcon={false}
      height={12}
      width={27}
      handleDiameter={props.handleDiameter}
      offColor={theme.secondary.coreSecondary}
      offHandleColor={theme.secondary.coreSecondary}
      onColor={theme.primary.corePrimary4}
      onHandleColor={theme.primary.corePrimary2}
      activeBoxShadow={`0 0 0 0.125rem ${theme.secondary.coreSecondary4} inset`}
      {...props}
    />
  )
}
ThemeStorageSwitch.defaultProps = {
  handleDiameter: 12,
}

export default withTheme(ThemeStorageSwitch)
