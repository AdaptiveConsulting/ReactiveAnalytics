import React from 'react'
import styled from 'styled-components'

enum Direction {
  Positive = 'positive',
  Negative = 'negative',
}

const MarketStatus = styled.svg`
  margin-right: -8px;
`

const Arrow = styled.path<{ direction: Direction }>`
  fill: ${({ theme, direction }) =>
    direction === Direction.Negative ? theme.accents.accentNegative : theme.accents.accentPositive};
`

export const MarketStatusIcon: React.FC<{ change: number }> = ({ change }) => (
  <MarketStatus xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0H24V24H0z" />
      {change < 0 ? (
        <Arrow
          direction={Direction.Negative}
          d="M11.106 16.142l-3.238-3.294c-.186-.223-.262-.651-.048-.9.212-.246.621-.239.834.006l2.274 2.316V7.927c0-.34.255-.617.571-.617.316 0 .571.276.571.617v6.343l2.274-2.316c.196-.211.62-.25.834-.007.213.244.145.687-.048.901l-3.238 3.294c-.11.113-.241.168-.393.168-.136-.006-.294-.067-.393-.168z"
        />
      ) : (
        <Arrow
          direction={Direction.Positive}
          d="M11.894 7.477l3.238 3.294c.186.223.262.651.048.9-.212.246-.621.24-.834-.006L12.072 9.35v6.343c0 .341-.255.618-.571.618-.316 0-.571-.277-.571-.618V9.349l-2.274 2.316c-.196.211-.62.25-.834.007-.213-.244-.145-.687.048-.901l3.238-3.294c.11-.113.241-.168.393-.167.136.005.294.066.393.167z"
        />
      )}
    </g>
  </MarketStatus>
)
