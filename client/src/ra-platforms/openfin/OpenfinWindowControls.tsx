import {
  faWindowMaximize,
  faWindowRestore,
} from "@fortawesome/free-regular-svg-icons"
import { faMinus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import OpenFin from "@openfin/core"
import React, { CSSProperties, useEffect, useState } from "react"
import styled from "styled-components/macro"

interface IProps {
  styles?: CSSProperties
}

const OpenfinWindowControls: React.FunctionComponent<IProps> = ({ styles }) => {
  const [window, setWindow] = useState<OpenFin.Window | undefined>()
  const [maximized, setMaximized] = useState(false)
  useEffect(() => {
    const getWindow = async () => {
      const currentWindow = await fin.Window.getCurrent()
      setWindow(currentWindow)
      currentWindow.addListener("maximized", () => setMaximized(true))
      currentWindow.addListener("restored", () => setMaximized(false))
    }
    getWindow()
  }, [])

  const minimizeClickHandler = async () => {
    if (window) {
      window.minimize()
    }
  }

  const maximizeClickHandler = async () => {
    if (window) {
      window.maximize()
    }
  }

  const closeClickHandler = async () => {
    if (window) {
      window.close()
    }
  }

  const restoreClickHandler = async () => {
    if (window) {
      window.restore()
    }
  }

  return (
    <AppControlContainer style={styles}>
      <NormalButton onClick={minimizeClickHandler}>
        <FontAwesomeIcon icon={faMinus} title="Minimize" />
      </NormalButton>
      {maximized ? (
        <NormalButton onClick={restoreClickHandler}>
          <FontAwesomeIcon icon={faWindowRestore} title="Restore" />
        </NormalButton>
      ) : (
        <NormalButton onClick={maximizeClickHandler}>
          <FontAwesomeIcon icon={faWindowMaximize} title="Maximize" />
        </NormalButton>
      )}
      <CloseButton onClick={closeClickHandler}>
        <FontAwesomeIcon icon={faTimes} title="Close" />
      </CloseButton>
    </AppControlContainer>
  )
}

const AppControlContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  cursor: pointer;
  height: 100%;
`

const AppButton = styled.button`
  padding: 1.25rem;
`
const NormalButton = styled(AppButton)`
  &:hover {
    background-color: ${({ theme }) => theme.secondary.coreSecondary4};
    color: ${({ theme }) => theme.primary.corePrimary4};
  }
`

const CloseButton = styled(AppButton)`
  &:hover {
    background-color: #ff3542;
  }
`

export default OpenfinWindowControls
