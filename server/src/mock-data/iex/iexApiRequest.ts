import { IIexBatchQuote, IIexQuoteQuery } from "../../types"

const mockQuoteQuery: IIexQuoteQuery = {
  symbol: "",
  companyName: "companyName",
  primaryExchange: "primaryExchange",
  sector: "sector",
  calculationPrice: "calculationPrice",
  open: 10,
  openTime: 10,
  close: 10,
  closeTime: 10,
  high: 10,
  low: 10,
  latestPrice: 10,
  latestSource: "latestSource",
  latestTime: "latestTime",
  latestUpdate: 10,
  latestVolume: 10,
  iexRealtimePrice: 10,
  iexRealtimeSize: 10,
  iexLastUpdated: 10,
  delayedPrice: 10,
  delayedPriceTime: 10,
  extendedPrice: 10,
  extendedChange: 10,
  extendedChangePercent: 10,
  extendedPriceTime: 10,
  previousClose: 10,
  change: 10,
  changePercent: 10,
  iexMarketPercent: 10,
  iexVolume: 10,
  avgTotalVolume: 10,
  iexBidPrice: 10,
  iexBidSize: 10,
  iexAskPrice: 10,
  iexAskSize: 10,
  marketCap: 10,
  peRatio: 10,
  week52High: 10,
  week52Low: 10,
  ytdChange: 10,
}

export const iexApiRequest = (
  requestQuery: string,
): Promise<IIexBatchQuote> => {
  const symbols = requestQuery.split("=")[1].split("&")[0].split(",")
  const mockQuoteQueries: [string, { quote: IIexQuoteQuery }][] = symbols.map(
    (symbol) => [
      symbol,
      {
        quote: { ...mockQuoteQuery, symbol },
      },
    ],
  )

  const mockBatchQuote: IIexBatchQuote = Object.fromEntries(mockQuoteQueries)
  return Promise.resolve(mockBatchQuote)
}
