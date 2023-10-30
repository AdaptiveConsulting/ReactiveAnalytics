import { default as React, useEffect, useState } from "react"
import styled from "styled-components/macro"

import { LogoBottomLabel, LogoSideLabel } from "@/assets/logos"
import { useSearch } from "@/hooks"
import { mediaQuery, screenSize } from "@/rt-theme/mediaQueries"
import { pxToRems } from "@/utils"

const LogoWrapper = styled.div`
  margin: ${pxToRems(32)} 0;
`

const Sidebar = styled.div<{ $hasPreviousSearch: boolean }>`
  display: flex;
  align-items: ${(props) =>
    props.$hasPreviousSearch ? "flex-start" : "center"};
  justify-content: center;
  background: ${({ theme }) => theme.secondary.coreSecondary2};
  width: ${pxToRems(129)};
  grid-row: 2;
  @media ${mediaQuery.tabletL} {
    width: 100%;
    ${LogoWrapper} {
      margin: 0;
    }
  }
`

const AppBar = () => {
  const { previousSearch } = useSearch()
  const [restrictedWidth, setRestrictedWidth] = useState(false)

  useEffect(() => {
    function callback() {
      setRestrictedWidth(window.innerWidth <= screenSize.tabletL)
    }
    callback()
    window.addEventListener("resize", callback)
    return () => window.removeEventListener("resize", callback)
  }, [])

  return (
    <Sidebar $hasPreviousSearch={previousSearch ?? false}>
      <LogoWrapper>
        {restrictedWidth ? (
          <LogoSideLabel size={9} data-testid="logo-side-label" />
        ) : (
          <LogoBottomLabel size={5.5} data-testid="logo-bottom-label" />
        )}
      </LogoWrapper>
      {/* {ContainerService.agent === 'desktop' && <OpenfinWindowControls />} */}
    </Sidebar>
  )
}

export default AppBar
