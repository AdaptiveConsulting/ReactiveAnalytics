/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyQuery
// ====================================================

export interface CompanyQuery_stock_company {
  __typename: 'Company'
  id: string
  symbol: string
  name: string | null
  website: string | null
  description: string | null
}

export interface CompanyQuery_stock {
  __typename: 'Stock'
  id: string
  company: CompanyQuery_stock_company
}

export interface CompanyQuery {
  stock: CompanyQuery_stock
}

export interface CompanyQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ABMHistoryQuery
// ====================================================

export interface ABMHistoryQuery_getPriceHistory {
  __typename: 'FxPricing'
  ask: number
  bid: number
  mid: number
  valueDate: any
  creationTimestamp: any | null
}

export interface ABMHistoryQuery {
  getPriceHistory: ABMHistoryQuery_getPriceHistory[]
}

export interface ABMHistoryQueryVariables {
  from: string
  to: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HistoryQuery
// ====================================================

export interface HistoryQuery_stock_chart {
  __typename: 'Tick'
  label: string
  datetime: any
  average: number | null
  open: number | null
  low: number | null
  high: number | null
  close: number | null
  volume: number
}

export interface HistoryQuery_stock_quote {
  __typename: 'Quote'
  id: string
  previousClose: number | null
}

export interface HistoryQuery_stock {
  __typename: 'Stock'
  id: string
  chart: HistoryQuery_stock_chart[]
  quote: HistoryQuery_stock_quote
}

export interface HistoryQuery_OLHC {
  __typename: 'OLHC'
  open: number | null
  close: number | null
  low: number | null
  high: number | null
}

export interface HistoryQuery {
  stock: HistoryQuery_stock
  OLHC: HistoryQuery_OLHC
}

export interface HistoryQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntradayQuery
// ====================================================

export interface IntradayQuery_intradayPrices {
  __typename: 'Intraday'
  datetime: any | null
  open: number | null
  close: number | null
  high: number | null
  low: number | null
  volume: number | null
  numberOfTrades: number | null
}

export interface IntradayQuery {
  intradayPrices: IntradayQuery_intradayPrices[]
}

export interface IntradayQueryVariables {
  symbol: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onIntradayPricingSubscription
// ====================================================

export interface onIntradayPricingSubscription_getIntradayPrices {
  __typename: 'Intraday'
  datetime: any | null
  open: number | null
  close: number | null
  high: number | null
  low: number | null
  volume: number | null
  numberOfTrades: number | null
}

export interface onIntradayPricingSubscription {
  getIntradayPrices: onIntradayPricingSubscription_getIntradayPrices[]
}

export interface onIntradayPricingSubscriptionVariables {
  symbol: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StockHistoryQuery
// ====================================================

export interface StockHistoryQuery_stock_chart {
  __typename: 'Tick'
  label: string
  datetime: any
  average: number | null
  open: number | null
  low: number | null
  high: number | null
  close: number | null
  volume: number
}

export interface StockHistoryQuery_stock_quote {
  __typename: 'Quote'
  id: string
  previousClose: number | null
}

export interface StockHistoryQuery_stock {
  __typename: 'Stock'
  id: string
  chart: StockHistoryQuery_stock_chart[]
  quote: StockHistoryQuery_stock_quote
}

export interface StockHistoryQuery {
  stock: StockHistoryQuery_stock
}

export interface StockHistoryQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MarketQuery
// ====================================================

export interface MarketQuery_markets {
  __typename: 'Quote'
  id: string
  companyName: string | null
  change: number | null
  changePercent: number | null
  latestPrice: number | null
}

export interface MarketQuery {
  markets: MarketQuery_markets[]
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onMarketSubscription
// ====================================================

export interface onMarketSubscription_getQuotes {
  __typename: 'Quote'
  id: string
  change: number | null
  changePercent: number | null
  latestPrice: number | null
}

export interface onMarketSubscription {
  getQuotes: onMarketSubscription_getQuotes
}

export interface onMarketSubscriptionVariables {
  markets: string[]
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewsQuery
// ====================================================

export interface NewsQuery_news {
  __typename: 'News'
  id: string
  datetime: any
  headline: string
  source: string
  url: string
  summary: string
  related: string
}

export interface NewsQuery {
  news: NewsQuery_news[]
}

export interface NewsQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PeersQuery
// ====================================================

export interface PeersQuery_stock {
  __typename: 'Stock'
  id: string
  peers: string[]
}

export interface PeersQuery {
  stock: PeersQuery_stock
}

export interface PeersQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchQuery
// ====================================================

export interface searchQuery_symbol {
  __typename: 'SearchResult'
  id: string
}

export interface searchQuery {
  symbol: searchQuery_symbol
}

export interface searchQueryVariables {
  id: string
  market: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search
// ====================================================

export interface search_symbols {
  __typename: 'SearchResult'
  id: string
  name: string
}

export interface search {
  symbols: search_symbols[]
}

export interface searchVariables {
  text: string
  marketSegment: MarketSegment
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StatsQuery
// ====================================================

export interface StatsQuery_stock_stats {
  __typename: 'Stats'
  week52high: number | null
  week52low: number | null
  ttmEPS: number | null
  ttmDividendRate: number | null
  dividendYield: number | null
  peRatio: number | null
  marketcap: number | null
}

export interface StatsQuery_stock_quote {
  __typename: 'Quote'
  id: string
  low: number | null
  high: number | null
  open: number | null
  previousClose: number | null
  latestVolume: number | null
  avgTotalVolume: number | null
}

export interface StatsQuery_stock {
  __typename: 'Stock'
  id: string
  stats: StatsQuery_stock_stats
  quote: StatsQuery_stock_quote
}

export interface StatsQuery {
  stock: StatsQuery_stock
}

export interface StatsQueryVariables {
  id: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onStockPriceSubscription
// ====================================================

export interface onStockPriceSubscription_getQuotes {
  __typename: 'Quote'
  id: string
  change: number | null
  changePercent: number | null
  latestPrice: number | null
}

export interface onStockPriceSubscription {
  getQuotes: onStockPriceSubscription_getQuotes
}

export interface onStockPriceSubscriptionVariables {
  markets: string[]
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Company
// ====================================================

export interface Company_company {
  __typename: 'Company'
  id: string
  symbol: string
  name: string | null
  website: string | null
  description: string | null
}

export interface Company {
  __typename: 'Stock'
  company: Company_company
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: History
// ====================================================

export interface History_chart {
  __typename: 'Tick'
  label: string
  datetime: any
  average: number | null
  open: number | null
  low: number | null
  high: number | null
  close: number | null
  volume: number
}

export interface History_quote {
  __typename: 'Quote'
  id: string
  previousClose: number | null
}

export interface History {
  __typename: 'Stock'
  chart: History_chart[]
  quote: History_quote
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Intraday
// ====================================================

export interface Intraday {
  __typename: 'Intraday'
  datetime: any | null
  open: number | null
  close: number | null
  high: number | null
  low: number | null
  volume: number | null
  numberOfTrades: number | null
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: News
// ====================================================

export interface News {
  __typename: 'News'
  datetime: any
  headline: string
  source: string
  url: string
  summary: string
  related: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Peers
// ====================================================

export interface Peers {
  __typename: 'Stock'
  peers: string[]
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Stats
// ====================================================

export interface Stats_stats {
  __typename: 'Stats'
  week52high: number | null
  week52low: number | null
  ttmEPS: number | null
  ttmDividendRate: number | null
  dividendYield: number | null
  peRatio: number | null
  marketcap: number | null
}

export interface Stats_quote {
  __typename: 'Quote'
  id: string
  low: number | null
  high: number | null
  open: number | null
  previousClose: number | null
  latestVolume: number | null
  avgTotalVolume: number | null
}

export interface Stats {
  __typename: 'Stock'
  stats: Stats_stats
  quote: Stats_quote
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// The type of market
export enum MarketSegment {
  BOND = 'BOND',
  CRYPTO = 'CRYPTO',
  CURRENCY = 'CURRENCY',
  FUTURE = 'FUTURE',
  INDEX = 'INDEX',
  STOCK = 'STOCK',
}

//==============================================================
// END Enums and Input Objects
//==============================================================
