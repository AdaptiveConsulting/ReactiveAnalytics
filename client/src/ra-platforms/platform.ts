import { PlatformType } from './types'
import { search_symbols } from '@/containers/search/graphql/types/search'

export interface Platform {
  readonly name: string
  readonly type: PlatformType

  readonly symbolSelected: (symbol: search_symbols) => void
  readonly openUrl: (href: string) => void
}

export abstract class PlatformBase implements Platform {
  abstract readonly name: string
  abstract readonly type: PlatformType

  readonly openUrl = (href: string) => {
    window.open(href)
  }

  readonly symbolSelected = (symbol: search_symbols) => {}
}
