import { Context } from 'openfin-fdc3'
import { search_symbols } from '__generated__/types'

export const getStockContext = (symbol: search_symbols): Context => {
  return {
    type: 'fdc3.instrument',
    name: symbol.name,
    id: {
      ticker: symbol.id,
    },
  }
}
