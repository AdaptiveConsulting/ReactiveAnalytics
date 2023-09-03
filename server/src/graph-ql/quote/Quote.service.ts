import { Quote } from "iexcloud_api_wrapper"
import { Service } from "typedi"

import iex from "../../services/iex"
import { IIexBatchQuote } from "../../types"
import { Subject, NEVER, timer } from "rxjs"
import { switchMap, flatMap, tap } from "rxjs/operators"
import { pubsub } from "../../pubsub"
import logger from "../../services/logger"
import { queryResolver } from "../../utils/queryResolver"

interface IMarketSubscription {
  [symbol: string]: {
    listenerCount: number
  }
}

@Service()
export default class {
  private currentSymbols: IMarketSubscription = {}
  private subject = new Subject<string[]>()

  constructor() {
    this.subject
      .pipe(
        switchMap(
          (symbols) => (symbols.length > 0 ? timer(500, 3000) : NEVER),
          (symbols, _) => symbols,
        ),
        tap((symbols) =>
          logger.debug(`Get quotes from IEX Cloud for ${symbols}`),
        ),
        flatMap((symbols) => this.getQuotes(symbols)),
        flatMap((quotes) => quotes),
      )
      .subscribe({
        next: (quote) => {
          logger.debug(
            `Publishing quote for ${this.getQuoteTopic(quote.symbol)}: ${
              quote.latestPrice
            }`,
          )
          pubsub.publish(this.getQuoteTopic(quote.symbol), quote)
        },
        error: (err) => logger.error(`Get quotes error: ${err}`),
      })
  }

  public async getQuote(symbol: string): Promise<Quote> {
    return (await iex.quote(symbol)) as Quote
  }

  public async getQuotes(symbols: string[]): Promise<Quote[]> {
    const batchQuotes: IIexBatchQuote = await queryResolver(() =>
      iex.iexApiRequest(
        `/stock/market/batch?symbols=${symbols.join(",")}&types=quote`,
      ),
    )

    return symbols.map((symbol) => batchQuotes[symbol].quote)
  }

  public getQuoteTopic = (symbol: string) => `MARKET_UPDATE.${symbol}`

  public unsubscribeQuotes(symbols: string[]) {
    symbols.forEach((symbol) => {
      if (this.currentSymbols[symbol]) {
        this.currentSymbols[symbol].listenerCount--
        if (!this.currentSymbols[symbol].listenerCount) {
          delete this.currentSymbols[symbol]
        }
      }
    })

    this.subject.next(Object.keys(this.currentSymbols))
  }

  public subscribeQuotes(symbols: string[]) {
    symbols.forEach((symbol) => {
      if (this.currentSymbols[symbol]) {
        this.currentSymbols[symbol].listenerCount++
      } else {
        this.currentSymbols[symbol] = {
          listenerCount: 1,
        }
      }
    })

    this.subject.next(Object.keys(this.currentSymbols))
  }
}
