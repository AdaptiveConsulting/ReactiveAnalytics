import styled from 'styled-components'
import { pxToRems } from '@/utils'
import { mediaQuery } from '@/rt-theme/mediaQueries'
import { ButtonLink } from '@/common/StyledComponents'

export const Banner = styled.div<{ isHidden: boolean }>`
  position: relative;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'grid')};
  grid-row: 1;
  grid-column: 1 / -1;
  height: ${pxToRems(56)};
  background-color: ${({ theme }) => theme.primary.corePrimary1};
  color: ${({ theme }) => theme.secondary.coreSecondary};
  align-items: center;
  justify-content: center;
  grid-auto-flow: column;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${pxToRems(129)};
    background-color: ${({ theme }) => theme.primary.corePrimary};
    @media ${mediaQuery.tabletL} {
      display: none;
    }
  }
`

export const CrossButton = styled.div`
  width: ${pxToRems(24)};
  height: ${pxToRems(24)};
  margin-right: ${pxToRems(8)};
  svg path:last-child {
    fill: ${({ theme }) => theme.secondary.coreSecondary5};
  }
  &:hover {
    cursor: pointer;
  }
`

export const BannerText = styled.p`
  font-size: ${pxToRems(13)};
  font-weight: 500;
`

export const InstallButton = styled(ButtonLink)`
  background-color: ${({ theme }) => theme.accents.accentPrimary};
  border: none;
  color: #ffffff;
  padding: ${pxToRems(9)} ${pxToRems(15)};
  margin: 0 10px;
  text-transform: uppercase;
  &:hover {
    background-color: ${({ theme }) => theme.accents.accentPrimary2};
  }
`
