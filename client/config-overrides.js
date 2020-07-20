const path = require('path')
const fs = require('fs')
const { babelInclude, override } = require('customize-cra')
const rewireGqlTag = require('react-app-rewire-graphql-tag')
const replaceAll = require('string.prototype.replaceall')
const CopyPlugin = require('copy-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const replaceTokens = config => {
  if (process.env.NODE_ENV === 'development') {
    if (!config.plugins) {
      config.plugins = []
    }

    replaceAll.shim()

    const environment = process.env.ENVIRONMENT_NAME
    const environment_suffix = ` (${process.env.ENVIRONMENT_NAME.toUpperCase()})`
    const scheme = process.env.HTTPS === 'true' ? 'https' : 'http'
    const host_url = `${scheme}://${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'public/manifest.json',
            to: 'manifest.json',
            transform(content) {
              return content.toString().replaceAll('{{environment_suffix}}', environment_suffix)
            },
          },
          {
            from: 'public/openfin/*.json',
            to: 'openfin',
            flatten: true,
            transform(content) {
              return content
                .toString()
                .replaceAll('{{environment}}', environment)
                .replaceAll('{{environment_suffix}}', environment_suffix)
                .replaceAll('{*host_url*}', host_url)
            },
          },
        ],
      }),
    )
  }

  return config
}

module.exports = override(rewireGqlTag, babelInclude([resolveApp('src'), resolveApp('../common')]), replaceTokens)
