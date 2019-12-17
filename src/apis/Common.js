/**
 * @name
 * @author SunSeekerX
 * @time 2019-12-16 23:47:34
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 16:08:12
 */

import axios from '@/utils/Request/index.js'

export default {
  add: ({ code }) => {
    return axios.request({
      url: '/add',
      method: 'post',
      data: {
        code
      }
    })
  },
  getCode({ limit, offset }) {
    return axios.request({
      url: '/get-code',
      method: 'post',
      data: {
        limit,
        offset
      }
    })
  },
  friendHelp({ code, encryptMobile }) {
    return axios.request({
      url: '/friend-Help',
      method: 'post',
      data: {
        encryptMobile,
        code
      }
    })
  }
}
