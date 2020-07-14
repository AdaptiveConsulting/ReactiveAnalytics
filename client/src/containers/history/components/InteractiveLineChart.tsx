import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import React from 'react'
import { Chart, ChartCanvas } from 'react-financial-charts'
import { XAxis, YAxis } from 'react-financial-charts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-financial-charts/lib/coordinates'
import { discontinuousTimeScaleProviderBuilder } from 'react-financial-charts/lib/scale'
import { AreaSeries } from 'react-financial-charts/lib/series'
import { withDeviceRatio } from 'react-financial-charts/lib/utils'
import { getColor, ThemeConsumer, themes } from 'rt-theme'
import { fonts } from 'rt-theme/fonts'
import { withSize } from '../../../utils/withSize'

interface IOHLCData {
  readonly close: number | null
  readonly datetime: any
  readonly high: number | null
  readonly low: number | null
  readonly open: number | null
  readonly volume: number | null
}

interface ChartProps {
  readonly data: IOHLCData[]
  readonly height: number
  readonly width: number
  readonly ratio: number
}

const FALLBACK_DATA: IOHLCData[] = [
  {
    close: 0,
    datetime: new Date(),
    high: 0,
    low: 0,
    open: 0,
    volume: 0,
  },
  {
    close: 0,
    datetime: new Date(),
    high: 0,
    low: 0,
    open: 0,
    volume: 0,
  },
]

class InteractiveChart extends React.Component<ChartProps> {
  private readonly margin = { left: 30, right: 60, top: 10, bottom: 30 }
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: any) => new Date(d.datetime),
  )

  public render() {
    const { data: inputData, height, ratio, width } = this.props

    const sanitizedData =
      inputData && inputData.length
        ? inputData.filter(({ close, high, low, open }) => !!close || !!high || !!low || !!open)
        : FALLBACK_DATA

    const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(sanitizedData)

    const start = xAccessor(data[data.length - 1])
    const end = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [start, end]

    const timeDisplayFormat = timeFormat('%d %b')
    const pricesDisplayFormat = format('.2f')

    return (
      <ThemeConsumer>
        {({ themeName }) => (
          <ChartCanvas
            height={height}
            ratio={ratio}
            width={width}
            margin={this.margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
          >
            <Chart id={1} yExtents={this.yExtents}>
              <XAxis
                showGridLines
                fontFamily={fonts.primaryFontFamily}
                stroke={getColor(themes[themeName], color => color.secondary.coreSecondary3)}
                tickLabelFill={getColor(themes[themeName], color => color.primary.corePrimary5)}
                tickStroke={getColor(themes[themeName], color => color.primary.corePrimary5)}
              />
              <YAxis
                showGridLines
                fontFamily={fonts.primaryFontFamily}
                stroke={getColor(themes[themeName], color => color.secondary.coreSecondary3)}
                tickLabelFill={getColor(themes[themeName], color => color.primary.corePrimary5)}
                tickStroke={getColor(themes[themeName], color => color.primary.corePrimary5)}
              />
              <AreaSeries
                yAccessor={this.yAccessor}
                strokeWidth={2}
                stroke={getColor(themes[themeName], color => color.accents.accentPrimary)}
              />
              <EdgeIndicator
                itemType="last"
                rectWidth={this.margin.right}
                fill={this.openCloseColor}
                lineStroke={this.openCloseColor}
                yAccessor={this.yEdgeIndicator}
              />
              <MouseCoordinateX rectWidth={this.margin.bottom} displayFormat={timeDisplayFormat} />
              <MouseCoordinateY rectWidth={this.margin.right} displayFormat={pricesDisplayFormat} />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        )}
      </ThemeConsumer>
    )
  }

  private readonly yAccessor = (data: IOHLCData) => {
    return data.close!
  }

  private readonly yExtents = (data: IOHLCData) => {
    return [data.high!, data.low!]
  }

  private readonly openCloseColor = (data: IOHLCData) => {
    return data.close! > data.open! ? '#01C38D' : '#FF274B'
  }

  private readonly yEdgeIndicator = (data: IOHLCData) => {
    return data.close!
  }
}

export const InteractiveLineChart = withSize()(withDeviceRatio()(InteractiveChart))
