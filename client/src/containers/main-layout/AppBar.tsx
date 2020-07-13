import { ContainerService } from 'platformService/ContainerService'
import { default as React, useContext, useRef, useLayoutEffect } from 'react'
import styled from 'styled-components/macro'
import { pxToRems } from 'utils'
import OpenfinWindowControls from '../../openfin/OpenfinWindowControls'
import { useTheme } from '../../rt-theme'
import { SearchContext } from '../search/SearchContext'
import { mediaQuery, screenSize } from 'rt-theme/mediaQueries'
import { LogoTextSide, LogoTextBottom } from 'assets/logos'

const LogoWrapper = styled.div`
  margin: ${pxToRems(32)} 0;
`

const Sidebar = styled.div<{ hasPreviousSearch: boolean }>`
  display: flex;
  align-items: ${({ hasPreviousSearch }) => (hasPreviousSearch ? 'flex-start' : 'center')};
  justify-content: center;
  background: ${({ theme }) => theme.secondary.coreSecondary2};
  width: ${pxToRems(129)};
  @media ${mediaQuery.tabletL} {
    align-items: flex-end;
    width: 100%;
    ${LogoWrapper} {
      margin: 0;
    }
  }
`

const AppBar = () => {
  const { toggleTheme } = useTheme()
  const { previousSearch } = useContext(SearchContext)
  const logoBottomRef = useRef<HTMLDivElement>(null)
  const logoSideRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    function callback() {
      if (!logoBottomRef.current || !logoSideRef.current) {
        return
      }
      const isSmall = window.innerWidth <= screenSize.tabletL
      logoBottomRef.current.style.display = isSmall ? 'none' : 'block'
      logoSideRef.current.style.display = isSmall ? 'block' : 'none'
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])

  return (
    <Sidebar hasPreviousSearch={previousSearch ?? false}>
      <LogoWrapper onDoubleClick={toggleTheme}>
        <div ref={logoBottomRef}>
          <LogoTextBottom size={5.5} />
        </div>
        <div ref={logoSideRef}>
          <LogoTextSide size={9} />
        </div>
      </LogoWrapper>
      {ContainerService.agent === 'desktop' && <OpenfinWindowControls />}
    </Sidebar>
  )
}

export default AppBar
