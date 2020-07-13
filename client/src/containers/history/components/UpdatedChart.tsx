import React from 'react'
import { Chart, ChartCanvas } from 'react-financial-charts'
import { XAxis, YAxis } from 'react-financial-charts/lib/axes'
import { discontinuousTimeScaleProviderBuilder } from 'react-financial-charts/lib/scale'
import { LineSeries } from 'react-financial-charts/lib/series'
// import { withDeviceRatio, withSize } from 'react-financial-charts/lib/utils'

interface IOHLCData {
  readonly close: number | null
  readonly datetime: string
  readonly high: number | null
  readonly low: number | null
  readonly open: number | null
  readonly volume: number
}

interface ChartProps {
  readonly inputData: IOHLCData[]
  readonly height: number
  readonly width: number
  readonly ratio: number
}

export const UpdatedChart = ({ inputData, height, ratio, width }: ChartProps) => {
  //   const { low: lowestPrice } = minBy(chartData, 'low') || { low: undefined }
  //   const { high: highestPrice } = maxBy(chartData, 'high') || { high: undefined }

  // console.log(chart.)
  // console.log('DATE', new Date())

  // const IOHData: IOHLCData[] = [
  //   {
  //     close: previousClose!,
  //     date: new Date(),
  //     high: 400,
  //     low: 100,
  //     open: 40,
  //     volume: 7,
  //   },
  //   {
  //     close: previousClose!,
  //     date: new Date(),
  //     high: 300,
  //     low: 500,
  //     open: 60,
  //     volume: 8,
  //   },
  // ]

  const yAccessor = (data: IOHLCData) => {
    return data.close ?? 0
  }

  const yExtents = (data: IOHLCData) => {
    return [data.high ?? 0, data.low ?? 0]
  }

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: any) => new Date(d.datetime))

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(inputData)

  const start = xAccessor(data[data.length - 1])
  const end = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [start, end]

  console.log('START_DATA', start)
  console.log('END_DATA', end)

  return (
    <ChartCanvas
      height={400}
      ratio={1}
      width={900}
      data={data}
      seriesName="Data"
      displayXAccessor={displayXAccessor}
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={yExtents}>
        <LineSeries yAccessor={yAccessor} strokeWidth={3} />
        <XAxis />
        <YAxis />
      </Chart>
    </ChartCanvas>
  )
}
