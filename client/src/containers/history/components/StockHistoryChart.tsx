import { DataCard } from '@/common/StyledComponents'
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
import { getThemeColor, ThemeConsumer, themes } from '@/rt-theme'
import { StockHistoryQuery } from '../graphql/types/StockHistoryQuery'

export const StockHistoryChart = ({ stock: { id, quote, chart } }: StockHistoryQuery) => {
  const previousClose = quote.previousClose
  const chartData = chart.filter(
    ({ low, average, high }) => (low && low > 0) || (average && average > 0) || (high && high > 0),
  )

  const { low: lowestPrice } = minBy(chartData, 'low') || { low: undefined }
  const { high: highestPrice } = maxBy(chartData, 'high') || { high: undefined }
  const tickFormatter: TickFormatterFunction = (tick: number) => (tick < 100 ? tick.toFixed(2) : tick.toFixed(0))

  if (!chartData.length) {
    return <>No chart data to display</>
  }

  return (
    <ThemeConsumer>
      {({ themeName }) => (
        <DataCard
          title={''}
          instrument={''}
          style={{ alignContent: 'unset', padding: 0 }}
          headingStyle={{ display: 'none' }}
        >
          <ResponsiveContainer width="99%" height="99%" minWidth={650} minHeight={400}>
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
  )
}
