/**
 * @name Vue.config.js
 * @description If you don't konw what you are doning, do not change this file.
 * @author SunSeekerX
 * @time 2019-08-13 19:50:20
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 21:46:41
 */

'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// Zopfli Code
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  // publicPath: '/app/liantong/',
  // lintOnSave: false,
  // devServer
  // devServer: {
  //   port: 9529,
  //   open: false,
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   }
  // },
  // configureWebpack
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback)
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99,
          test: productionGzipExtensions
        })
      )
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  // chainWebpack
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  // css
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/theme.scss";`
      }
    }
  }
}
