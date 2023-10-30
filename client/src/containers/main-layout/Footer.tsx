import * as React from "react"
import styled from "styled-components/macro"

import { pxToRems } from "@/utils"

import { MarketsList } from "../index"

export const FooterMarket = styled.div``

const FooterWrapper = styled.div<{ $hasNoSearch: boolean }>`
  display: ${(props) => (props.$hasNoSearch ? "none" : "grid")};
  grid-column: 1 / 3;
  border-top: 1px solid ${({ theme }) => theme.secondary.coreSecondary3};
  margin: 0 ${pxToRems(22)};
  padding: ${pxToRems(10)} 0;
  align-self: self-end;
`

const Footer = ({ hasNoSearch }: { hasNoSearch: boolean }) => (
  <FooterWrapper $hasNoSearch={hasNoSearch}>
    <MarketsList />
  </FooterWrapper>
)

export default Footer
