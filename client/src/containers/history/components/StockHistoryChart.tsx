import React from 'react'
import { StockHistoryQuery } from '../../../__generated__/types'
import { InteractiveLineChart } from './InteractiveLineChart'

export const StockHistoryChart = (props: StockHistoryQuery) => <InteractiveLineChart data={props.stock.chart} />
