import { PlatformBase } from 'ra-platforms/platform'
import { search_symbols } from 'containers/search/graphql/types/search'

export default class OpenfinPlatform extends PlatformBase {
  readonly name = 'openfin'
  readonly type = 'desktop'

  readonly openUrl = (href: string) => {
    fin.System.openUrlWithBrowser(href)
  }

  readonly symbolSelected = (symbol: search_symbols) => {
    // not currently implemented
  }
}
