import { EndOfDay, Intraday, history as actual } from "iexcloud_api_wrapper"

const mockHistoryEOD: EndOfDay = {
  symbol: "",
  change: 15,
  changeOverTime: 16,
  changePercent: 0.1,
  close: 19,
  date: "01/01/2000",
  high: 20,
  label: "EOD",
  low: 11,
  open: 12,
  volume: 13,
  uClose: 14,
  uHigh: 15,
  uLow: 16,
  uOpen: 17,
  uVolume: 18,
}

const mockHistoryIntraDay: Intraday = {
  minute: "1",
  label: "Intra",
  average: 15,
  changeOverTime: 1,
  close: 19,
  date: "01/01/2000",
  high: 10,
  low: 10,
  volume: 10,
  notional: 10,
  numberOfTrades: 10,
  marketHigh: 10,
  marketLow: 10,
  marketAverage: 10,
  marketVolume: 10,
  marketNotional: 10,
  marketNumberOfTrades: 10,
  open: 10,
  marketOpen: 10,
  marketClose: 10,
  marketChangeOverTime: 10,
}

export const history: typeof actual = (symbol) =>
  Promise.resolve(
    new Array(50).fill(true).map(() => ({
      ...mockHistoryIntraDay,
      symbol,
      average: Math.random() * 20,
    })),
  )
