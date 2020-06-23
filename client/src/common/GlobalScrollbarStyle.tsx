import { rgba } from 'polished'
import React from 'react'
import { createGlobalStyle, withTheme } from 'styled-components/macro'
import { Theme } from '../rt-theme'

const ScrollbarGlobal = createGlobalStyle`
body, #root {
  overflow: hidden;
}

body ::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

body ::-webkit-scrollbar-thumb {
  border-radius: 22px;
  background-color: rgba(212, 221, 232, .4);
  height: 16px;
  border: 4.5px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
}

body ::-webkit-scrollbar-corner {
  background-color: rgba(0,0,0,0);
}

body .ag-body ::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
`

const GlobalScrollbarStyle: React.FunctionComponent<{ theme: Theme }> = ({ theme }) => (
  <React.Fragment>
    <ScrollbarGlobal />
    <style>
      {`
        body ::-webkit-scrollbar-thumb {
          background-color: ${rgba(theme.secondary.coreSecondary, 0.2)};
        }
        `}
    </style>
  </React.Fragment>
)

export default withTheme(GlobalScrollbarStyle)
