import { Service } from "typedi"
import iex from "../../services/iex"

import { queryResolver } from "../../utils/queryResolver"

@Service()
export default class {
  public async getStats(symbol: string) {
    return queryResolver(() => iex.keyStats(symbol))
  }
}
