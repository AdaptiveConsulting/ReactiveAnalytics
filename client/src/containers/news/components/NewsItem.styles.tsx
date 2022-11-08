import styled from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { fonts } from '@/rt-theme/fonts'

export const NewsHeadline = styled.div`
  font-size: ${pxToRems(13)};
  font-family: ${fonts.secondaryFontFamily};
  color: ${({ theme }) => theme.textColorSecondary};
  line-height: 1.54;
  margin-bottom: ${pxToRems(7)};
`

export const NewsCaption = styled.span`
  font-size: ${pxToRems(11)};
  color: ${({ theme }) => theme.primary.corePrimary4};
  font-style: italic;
  opacity: 0.59;
  display: block;
  line-height: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  padding-bottom: ${pxToRems(19)};
`

export const NewsItemContents = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background-color: ${({ theme }) => theme.secondary.coreSecondary4};
    width: calc(100% + 40px);
  }
  &:last-child {
    ${NewsCaption} {
      margin-bottom: 0;
      padding-bottom: 0;
    }
    &:after {
      display: none;
    }
  }
`
