import styled from "styled-components/macro"

import { SidebarDataCard } from "@/common/DataCard"
import { mediaQuery } from "@/rt-theme/mediaQueries"
import { pxToRems } from "@/utils"

import { Text } from "../../../common/StyledComponents"

export const CompanyDescription = styled(Text)`
  font-size: ${pxToRems(12)};
  line-height: 1.67;
  letter-spacing: 0.09px;
`

export const CompanyLink = styled.a`
  font-size: ${pxToRems(11)};
  text-decoration: underline;
  color: ${({ theme }) => theme.accents.accentPrimary};
  font-style: italic;
  margin: ${pxToRems(6)} 0;
`

export const CompanyCard = styled(SidebarDataCard)`
  padding-top: ${pxToRems(12)};
  @media ${mediaQuery.tabletL} {
    padding-top: 0;
  }
`
