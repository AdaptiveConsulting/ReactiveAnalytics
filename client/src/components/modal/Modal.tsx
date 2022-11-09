import { darken } from 'polished'
import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  opacity: 0.75;

  background: ${({ theme }) => theme.primary.corePrimary};
`

const ModalPanel = styled.div`
  padding: 1rem 1.5rem;
  margin: 0 1rem;

  width: max-content;
  min-width: 16rem;
  max-width: 40rem;

  position: relative;
  z-index: 1;

  background: ${({ theme }) => theme.primary.corePrimary};
  color: ${({ theme }) => theme.secondary.coreSecondary};
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1rem 3rem -1rem ${props => darken(0.1, props.theme.primary.corePrimary)};
`

const Header = styled.div`
  font-size: 1rem;
  line-height: 3rem;
  box-shadow: 0 1px 0 ${({ theme }) => theme.secondary.coreSecondary};
`

const Body = styled.div`
  margin: 1rem 0;
`

interface Props {
  shouldShow?: boolean
  title?: string
}

export const Modal: React.FC<Props> = ({ shouldShow, title, children }) => {
  if (!shouldShow) {
    return <></>
  }
  return (
    <ModalContainer>
      <ModalOverlay />
      <ModalPanel>
        {title && <Header>{title}</Header>}
        <Body>{children}</Body>
      </ModalPanel>
    </ModalContainer>
  )
}
