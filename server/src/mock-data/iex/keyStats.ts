import { KeyStats, keyStats as actual } from "iexcloud_api_wrapper"

const mockKeyStats: KeyStats = {
  avg10Volume: 10,
  avg30Volume: 10,
  beta: 10,
  companyName: "",
  day200MovingAvg: 10,
  day30ChangePercent: 10,
  day50MovingAvg: 10,
  day5ChangePercent: 1,
  dividendYield: 10,
  employees: 10,
  exDividendDate: "01/01/2000",
  float: 10,
  marketcap: 10,
  maxChangePercent: 1,
  month1ChangePercent: 1,
  month3ChangePercent: 1,
  month6ChangePercent: 1,
  nextDividendDate: "01/01/2000",
  nextEarningsDate: "01/01/2000",
  peRatio: 10,
  sharesOutstanding: 10,
  symbol: "SYM",
  ttmDividendRate: 10,
  ttmEPS: 10,
  week52change: 10,
  week52high: 10,
  week52low: 10,
  year1ChangePercent: 1,
  year2ChangePercent: 1,
  year5ChangePercent: 1,
  ytdChangePercent: 1,
}

export const keyStats: typeof actual = (symbol) =>
  Promise.resolve({ ...mockKeyStats, symbol })
