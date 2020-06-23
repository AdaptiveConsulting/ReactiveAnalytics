import React, { useMemo } from 'react'
import { keyframes, Keyframes } from 'styled-components'
import styled from 'styled-components/macro'

const ANIMATION_SPEED = 2
const BAR_NUMBER = 4
const bars: number[] = []
for (let i = 0; i < BAR_NUMBER; i++) {
  bars.push(i)
}

interface IBarProps {
  order: number
  bouceKeyframes: Keyframes
  speed: number
  type: LoaderType
}

const Bar = styled('rect')<IBarProps>`
  animation: ${({ bouceKeyframes }: IBarProps) => bouceKeyframes} ${({ speed }) => speed}s infinite;
  animation-delay: ${({ order, speed }) => order * (speed / 1.3 / BAR_NUMBER)}s;
  fill: ${({ theme }) => theme.secondary.coreSecondary};
  will-change: transform;
`

type LoaderType = 'primary' | 'secondary'

interface IProps {
  size: number | string
  type?: LoaderType
  seperation?: number
  speed?: number
}

const AdaptiveLoader: React.FunctionComponent<IProps> = ({
  size,
  type = 'primary',
  seperation,
  speed = ANIMATION_SPEED,
  children,
}) => {
  const sizeNum = Number(size)
  const barHeight = sizeNum * 0.75
  const barWidth = barHeight / 4
  const seperationDistance = (seperation !== undefined ? seperation : sizeNum / 25) - 0.5
  const moveDistance = barHeight / 3
  const totalBarWidth = barWidth * BAR_NUMBER + seperationDistance * (BAR_NUMBER - 1)
  const extraWidth = sizeNum - totalBarWidth

  const getBounce = (distance: number) => keyframes`
    0% {
      transform: translate(0px,0px);
    }
    50% {
      transform: translate(0px,${distance}px);
    }
    100% {
      transform: translate(0px,0px);
    }
  `

  const bounce = useMemo(() => getBounce(moveDistance), [moveDistance])

  return (
    <svg width={sizeNum} height={sizeNum}>
      {bars.map((_, i) => (
        <Bar
          type={type}
          key={i}
          height={barHeight}
          width={barWidth}
          x={extraWidth / 2 + i * (barWidth + seperationDistance)}
          order={i}
          bouceKeyframes={bounce}
          speed={speed}
        />
      ))}
      {children}
    </svg>
  )
}

export default AdaptiveLoader
