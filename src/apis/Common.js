/**
 * @name
 * @author SunSeekerX
 * @time 2019-12-16 23:47:34
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 01:21:28
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
  }
}
