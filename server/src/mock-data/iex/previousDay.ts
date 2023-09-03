import { PreviousDay, previousDay as actual } from "iexcloud_api_wrapper"

const mockPreviousDayData: PreviousDay = {
  symbol: "",
  date: "01/01/2000",
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  volume: 0,
  unadjustedVolume: 0,
  change: 0,
  changePercent: 0,
}

const mockPreviousDay = Object.assign(new PreviousDay(), mockPreviousDayData)

export const previousDay: typeof actual = (symbol) =>
  Promise.resolve({ ...mockPreviousDay, symbol })
