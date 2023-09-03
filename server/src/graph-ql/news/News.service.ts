import { Service } from "typedi"
import iex from "../../services/iex"
import { queryResolver } from "../../utils/queryResolver"

@Service()
export default class {
  public async getNews(symbol: string) {
    return iex.news(symbol)
  }
  public async getLatestNews(symbol: string, last: number) {
    return queryResolver(() => iex.news(symbol, last))
  }
}
