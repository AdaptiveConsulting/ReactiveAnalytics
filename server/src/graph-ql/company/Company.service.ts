import { Service } from "typedi"
import iex from "../../services/iex"
import { queryResolver } from "../../utils/queryResolver"

@Service()
export default class {
  public async getCompany(symbol: string) {
    return queryResolver(() => iex.company(symbol))
  }
}
