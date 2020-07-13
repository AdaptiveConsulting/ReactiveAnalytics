import { DataCard } from 'common/StyledComponents'
import { maxBy, minBy, round } from 'lodash'
import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  TickFormatterFunction,
  XAxis,
  YAxis,
} from 'recharts'
import { StockHistoryQuery } from '../../../__generated__/types'
import { getThemeColor, themes, ThemeConsumer } from 'rt-theme'
import { UpdatedChart } from './UpdatedChart'

export const StockHistoryChart = (props: StockHistoryQuery) => {
  const {
    stock: { id, quote, chart },
  } = props

  const previousClose = quote.previousClose
  const chartData = props.stock.chart.filter(
    ({ low, average, high }) => (low && low > 0) || (average && average > 0) || (high && high > 0),
  )

  const { low: lowestPrice } = minBy(chartData, 'low') || { low: undefined }
  const { high: highestPrice } = maxBy(chartData, 'high') || { high: undefined }
  const tickFormatter: TickFormatterFunction = (tick: number) => (tick < 100 ? tick.toFixed(2) : tick.toFixed(0))

  return (
    <>
      <UpdatedChart inputData={chart} height={400} width={800} ratio={1} />
      <ThemeConsumer>
        {({ themeName }) => (
          <DataCard cardType="history" title={id} instrument={id} headingStyle={{ display: 'none' }}>
            <ResponsiveContainer width="99%" height="99%" minHeight={450}>
              <LineChart data={chartData} margin={{ left: -25, top: 0, right: 0, bottom: 0 }}>
                <CartesianGrid
                  verticalFill={[
                    getThemeColor(themes[themeName], color => color.secondary.coreSecondary2) ?? '#F1F2F2',
                    getThemeColor(themes[themeName], color => color.secondary.coreSecondary) ?? '#FFFFFF',
                  ]}
                />
                <ReferenceLine
                  y={previousClose!}
                  strokeDasharray="4 3"
                  stroke={getThemeColor(themes[themeName], color => color.accents.accentPrimary) ?? '#AAABD1'}
                />

                <Line
                  type="linear"
                  dot={false}
                  strokeWidth={2}
                  dataKey="average"
                  stroke={getThemeColor(themes[themeName], color => color.accents.accentPrimary) ?? '#AAABD1'}
                />
                <XAxis
                  tickLine={{ stroke: '#DFDFDF' }}
                  axisLine={{ stroke: '#DFDFDF' }}
                  dataKey="label"
                  interval={round(chartData.length / 12)}
                  tick={{ fontSize: 12, fill: getThemeColor(themes[themeName], color => color.primary.corePrimary5) }}
                  tickSize={12}
                />
                <YAxis
                  type="number"
                  axisLine={{ stroke: '#DFDFDF' }}
                  tickLine={{ stroke: '#DFDFDF' }}
                  allowDecimals={true}
                  domain={[lowestPrice!, highestPrice!]}
                  tick={{ fontSize: 12, fill: getThemeColor(themes[themeName], color => color.primary.corePrimary5) }}
                  tickFormatter={tickFormatter}
                  orientation="left"
                />
              </LineChart>
            </ResponsiveContainer>
          </DataCard>
        )}
      </ThemeConsumer>
    </>
  )
}
