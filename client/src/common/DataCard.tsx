import React from 'react'
import styled, { CSSObject } from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { Heading } from './StyledComponents'

interface IProps {
  style?: CSSObject
  headingStyle?: CSSObject
  title: string | JSX.Element
  instrument: string
}

const DataContents: React.FunctionComponent<IProps> = props => {
  return (
    <VanillaDataCard style={props.style}>
      <Heading style={props.headingStyle}>{props.title}</Heading>
      {props.children}
    </VanillaDataCard>
  )
}

const VanillaDataCard = styled.div`
  display: grid;
  grid-template-columns: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: ${pxToRems(24)} ${pxToRems(32)};
  align-content: baseline;
`

export const SidebarDataCard = styled.div`
  ${VanillaDataCard} {
    padding: ${pxToRems(24)} ${pxToRems(20)};
  }
`

export default DataContents
