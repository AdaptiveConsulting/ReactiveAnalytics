import { ButtonLink } from '@/common/StyledComponents'
import styled from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { SidebarDataCard } from '@/common/DataCard'
import { mediaQuery } from '@/rt-theme/mediaQueries'

export const PeersCard = styled(SidebarDataCard)`
  border-top: ${({ theme }) => `1px solid ${theme.secondary.coreSecondary4}`};
  @media ${mediaQuery.tabletL} {
    border-top: none;
  }
  @media ${mediaQuery.tabletS} {
    border-top: ${({ theme }) => `1px solid ${theme.secondary.coreSecondary4}`};
    grid-column: 1/-1;
    grid-row: 2;
  }
  @media ${mediaQuery.mobile} {
    grid-column: 1;
    grid-row: 3;
  }
`

export const PeersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media ${mediaQuery.tabletL} {
    justify-content: flex-start;
  }
`

export const PeersLink = styled(ButtonLink)`
  color: ${({ theme }) => theme.primary.corePrimary4};
  min-width: ${pxToRems(43)};
  &:hover {
    color: ${({ theme }) => theme.primary.corePrimary2};
    background-color: ${({ theme }) => theme.secondary.coreSecondary4};
  }
`
