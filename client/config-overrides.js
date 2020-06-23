const path = require('path')
const fs = require('fs')
const { babelInclude, override, addBabelPlugin } = require('customize-cra')
const rewireGqlTag = require('react-app-rewire-graphql-tag')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = override(
  rewireGqlTag,
  addBabelPlugin('babel-plugin-macros'),
  babelInclude([resolveApp('src'), resolveApp('../common')]),
)
