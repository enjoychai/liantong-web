/**
 * @name 
 * @author SunSeekerX
 * @time 2019-12-16 22:43:06
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-16 22:54:49
 */

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { 'modules': false }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
