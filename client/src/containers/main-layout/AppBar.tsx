import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Logo from '../../common/Logo'
import { Banner, DragHandle, Link, SwitchThemeButton } from '../../common/StyledComponents'
import OpenfinWindowControls from '../../openfin/OpenfinWindowControls'
import { styled, ThemeName, useTheme } from '../../rt-theme'
import { ContainerService } from 'platformService/ContainerService'

const ThemeControl = () => {
  const { themeName, toggleTheme } = useTheme()
  return (
    <SwitchThemeButton style={{ marginRight: '1rem' }} onClick={toggleTheme}>
      <FontAwesomeIcon
        title="Toggle theme"
        icon={[`fa${themeName === ThemeName.Light ? 'r' : 's'}`, 'lightbulb'] as IconProp}
      />
    </SwitchThemeButton>
  )
}

const AppBar = () => (
  <AppWrapper>
    <Link target="_blank" href="https://weareadaptive.com/">
      <Logo size={1.75} />
    </Link>
    <DragHandle />
    <ThemeControl />
    {ContainerService.agent === 'desktop' && <OpenfinWindowControls />}
  </AppWrapper>
)

const AppWrapper = styled(Banner)`
  grid-template-columns: auto 1fr auto auto;
`

export default AppBar
