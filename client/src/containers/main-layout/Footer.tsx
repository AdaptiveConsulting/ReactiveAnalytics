import * as React from 'react'
import styled from 'styled-components'
import { MarketsList } from '../index'
import { pxToRems } from '@/utils'

export const FooterMarket = styled.div``

const FooterWrapper = styled.div<{ hasNoSearch: boolean }>`
  display: ${({ hasNoSearch }) => (hasNoSearch ? 'none' : 'grid')};
  grid-column: 1 / 3;
  border-top: 1px solid ${({ theme }) => theme.secondary.coreSecondary3};
  margin: 0 ${pxToRems(22)};
  padding: ${pxToRems(10)} 0;
  align-self: self-end;
`

const Footer: React.FC<{ hasNoSearch: boolean }> = ({ hasNoSearch }) => (
  <FooterWrapper hasNoSearch={hasNoSearch}>
    <MarketsList />
  </FooterWrapper>
)

export default Footer
