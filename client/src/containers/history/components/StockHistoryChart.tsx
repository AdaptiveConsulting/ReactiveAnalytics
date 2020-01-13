import { maxBy, minBy, round } from 'lodash'
import React from 'react'
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, TickFormatterFunction, XAxis, YAxis } from 'recharts'
import { StockHistoryQuery } from '../../../__generated__/types'
import { DataCard } from 'common/StyledComponents'

export const StockHistoryChart = (props: StockHistoryQuery) => {
  const {
    stock: { id, quote },
  } = props
  const previousClose = quote.previousClose
  const chartData = props.stock.chart.filter(
    ({ low, average, high }) => (low && low > 0) || (average && average > 0) || (high && high > 0),
  )

  const { low: lowestPrice } = minBy(chartData, 'low') || { low: undefined }
  const { high: highestPrice } = maxBy(chartData, 'high') || { high: undefined }
  const tickFormatter: TickFormatterFunction = tick => (tick < 100 ? tick.toFixed(2) : tick.toFixed(0))

  return (
    <DataCard cardType="history" title={id} instrument={id}>
      <ResponsiveContainer width="99%" height="99%" minHeight={300}>
        <AreaChart data={chartData} margin={{ left: 0, top: 0, right: -32, bottom: 0 }}>
          <ReferenceLine y={previousClose!} strokeDasharray="4 3" />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7fb3ff" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#7fb3ff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="basisOpen"
            dataKey="average"
            strokeWidth={2}
            fill="url(#colorUv)"
            dot={false}
            isAnimationActive={false}
          />
          <XAxis dataKey="label" interval={round(chartData.length / 12)} tick={{ fontSize: 10 }} tickSize={12} />
          <YAxis
            type="number"
            allowDecimals={true}
            domain={[lowestPrice!, highestPrice!]}
            tick={{ fontSize: 10 }}
            tickFormatter={tickFormatter}
            orientation="right"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DataCard>
  )
}
