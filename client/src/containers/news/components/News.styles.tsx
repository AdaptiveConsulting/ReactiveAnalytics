import { SidebarDataCard } from '@/common/DataCard'
import styled from 'styled-components'
import { mediaQuery } from '@/rt-theme/mediaQueries'

export const NewsCard = styled(SidebarDataCard)`
  border-top: ${({ theme }) => `1px solid ${theme.secondary.coreSecondary4}`};
  @media ${mediaQuery.tabletL} {
    grid-column: 2;
    grid-row: 1;
    border-top: none;
  }
  @media ${mediaQuery.mobile} {
    border-top: ${({ theme }) => `1px solid ${theme.secondary.coreSecondary4}`};
    grid-column: 1;
    grid-row: 2;
  }
`
