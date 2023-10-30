import React, { ReactNode } from "react"
import styled, { CSSObject, Interpolation } from "styled-components/macro"

import { pxToRems } from "@/utils"

import { Heading } from "./StyledComponents"

interface IProps {
  children: ReactNode
  style?: CSSObject
  headingStyle?: CSSObject
  title: string | JSX.Element
  instrument: string
}

const DataContents = (props: IProps) => {
  return (
    <VanillaDataCard style={props.style}>
      <Heading style={props.headingStyle}>{props.title}</Heading>
      {props.children}
    </VanillaDataCard>
  )
}

const VanillaDataCard = styled.div<{
  style: Interpolation<React.CSSProperties>
}>`
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
