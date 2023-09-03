import { IResolvers } from "graphql-tools"
import StatsService from "../stats/Stats.service"
import CompanyService from "../company/Company.service"

import iex from "../../services/iex"
import { TickService } from "../tick"
import { QuoteService } from "../quote"
import { Container } from "typedi"
import { queryResolver } from "../../utils/queryResolver"

const companyService = Container.get(CompanyService)
const statsService = Container.get(StatsService)
const tickService = Container.get(TickService)
const quoteService = Container.get(QuoteService)

const resolvers: IResolvers = {
  Query: {
    stock: async (_, args: { id: string }) => {
      return {
        id: args.id.toUpperCase(),
        symbol: args.id,
      }
    },
  },
  Stock: {
    chart: (parent: { id: string }) => {
      return queryResolver(() => tickService.getChart(parent.id))
    },
    company: async (parent: { id: string }) => {
      return queryResolver(() => companyService.getCompany(parent.id))
    },
    stats: async (parent: { id: string }) => {
      return queryResolver(() => statsService.getStats(parent.id))
    },
    peers: async (parent: { id: string }) => {
      return queryResolver(() => iex.peers(parent.id))
    },
    quote: async (parent: { id: string }) => {
      return queryResolver(() => quoteService.getQuote(parent.id))
    },
    price: async (parent: { id: string }) => {
      return queryResolver(() => iex.price(parent.id))
    },
    previous: async (parent: { id: string }) => {
      return queryResolver(() => iex.previousDay(parent.id))
    },
  },
}

export default resolvers
