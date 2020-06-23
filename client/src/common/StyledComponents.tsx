import styled from 'styled-components/macro'

import { default as dataCard } from './DataCard'
export const DataCard = dataCard

export const AnalyticsLineChartStyle = styled.div`
  width: 100%;
  height: 100%;
  min-height: 35px; /* Required to avoid JS errors when resizing the height of the browser small enough such
                        that the height of the chart is computed as negative values. -D.S. ARTP-394 */
  overflow-y: hidden;
  .recharts-cartesian-axis-ticks {
    color: #ffffff;
    width: 52px;
    height: 12px;
    opacity: 1;
    font-size: 10px;
  }
`

export const ToolTipStyle = styled.div`
  background-color: #14161c;
  width: 140px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ToolTipChildLeft = styled.div`
  width: 70px;
  opacity: 0.6;
  font-size: 10px;
  color: ${({ theme }) => theme.primary.corePrimary};
`
export const ToolTipChildRight = styled.div`
  width: 30px;
  font-size: 10px;
  color: ${({ theme }) => theme.primary.corePrimary};
`

export const Banner = styled.div`
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  display: grid;
  align-items: center;
  min-width: 100%;
  min-height: 4.5rem;
  background-color: ${({ theme }) => theme.primary.corePrimary};
  color: ${({ theme }) => theme.textColor};
`

export const DataContents = styled.div`
  display: grid;
  grid-gap: 1rem;
`

export const VerticalDataContents = styled(DataContents)`
  grid-auto-flow: column;
  justify-content: start;
`

export const Text = styled.span``

export const LabeledData = styled.div`
  min-height: 1.5rem;
  border-bottom: 1px #54606d solid;
  display: grid;
  grid-template-columns: 1fr auto;
`

export const Title = styled.h1`
  margin-top: 0rem;
  font-size: 1.25rem;
  font-weight: 300;
`

export const Heading = styled(Title)`
  margin-bottom: 1.5rem;
`

export const Subheading = styled.h2`
  font-size: 1.25rem;
  font-weight: 300;
`

export const Caption = styled.span`
  color: ${({ theme, color }) => theme.colors[color || 'white']};
  opacity: 0.59;
  display: block;
  line-height: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`

export const Link = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const StrongLabel = styled(Text)`
  font-weight: 600;
`

export const OpaqueLabel = styled(Text)`
  opacity: 0.59;
`

export const FieldLabel = styled(Text)``

export const SwitchThemeButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  line-height: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  cursor: pointer;

  transition: background-color ${({ theme }) => theme.motion.duration}ms ${({ theme }) => theme.motion.easing};

  &:hover {
    background-color: ${({ theme }) => theme.button.secondary.active.backgroundColor};
    color: ${({ theme }) => theme.button.secondary.textColor};
  }
`

export const PopoutButton = styled('button')`
  .svg-icon {
    stroke: ${({ theme }) => theme.textColor};
    fill: ${({ theme }) => theme.textColor};
  }
`

export const DragHandle = styled.div`
  -webkit-app-region: drag;
  height: 100%;
`

const ContentBase = styled.div`
  display: grid;
  grid-gap: 0.5em;
`

export const MainContent = styled(ContentBase)`
  grid-template-columns: 3fr 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
export const MainInnerContent = styled(ContentBase)`
  align-content: start;
`

export const MainSearchContent = styled(ContentBase)`
  font-size: 2rem;
  line-height: 2rem;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  padding: 1rem;
  position: relative;
  border-bottom: solid 2px ${({ theme }) => theme.primary.corePrimary};
  @media (max-width: 900px) {
    font-size: 1rem;
    line-height: 1rem;
  }
  @media (max-width: 500px) {
    grid-auto-flow: row;
  }
`

export const AppLayoutRoot = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: 100%;
`

export const ScrollableArea = styled.div`
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  padding: 1rem;
  padding-bottom: 2rem;
`
