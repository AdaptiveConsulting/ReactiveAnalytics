import { Service } from "typedi"

import iex from "../../services/iex"
import { queryResolver } from "../../utils/queryResolver"

@Service()
export default class {
  public async getChart(symbol: string) {
    return queryResolver(() => iex.history(symbol, { period: "1d" }))
  }
}
