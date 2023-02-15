module.exports = {
  watch:true,
  implementation: 'sass',
  nameFormat: 'dashes',
  exportType: 'default',
  includePaths: ['./src/styles'],
  additionalData: `@use "./src/styles/variables.scss" as *;`,
  ignore: ['**/variables.scss', '**/variables/**'],
}