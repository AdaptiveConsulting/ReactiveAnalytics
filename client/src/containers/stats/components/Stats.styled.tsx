import styled from 'styled-components'
import { DataContents } from '@/common/StyledComponents'
import { pxToRems } from '@/utils'
import { mediaQuery } from '@/rt-theme/mediaQueries'

export const FieldsWrapper = styled(DataContents)`
  margin-top: ${pxToRems(8)};
  grid-row-gap: ${pxToRems(8)};
  grid-column-gap: ${pxToRems(30)};
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    height: ${pxToRems(4)};
    width: 100%;
    background-color: ${({ theme }) => theme.secondary.coreSecondary1};
  }
  @media ${mediaQuery.tabletS} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
`

export const LabeledData = styled.div`
  font-size: ${pxToRems(12)};
  min-height: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.secondary.coreSecondary3};
  display: grid;
  grid-template-columns: 1fr auto;
  padding: ${pxToRems(7)} ${pxToRems(7)} 0;
`
