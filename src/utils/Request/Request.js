/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 00:03:43
 */

import axios from 'axios' // Axios
// import qs from 'qs' // Qs

import store from '@/store' // Vuex
import router from '@/router' // Router
import HandleError from '@/utils/HandleError' // Utils > HandleError

/**
 * @name Create request object
 * @param { Object } options options for axios.create
 * @returns { Object } request obj
 */
export default function createRequest(options) {
  // create an axios instance
  const service = axios.create(
    Object.assign(
      {
        baseURL: process.env.VUE_APP_BASE_API,
        withCredentials: false,
        timeout: 15000
      },
      options
    )
  )

  // Request interceptor
  service.interceptors.request.use(
    async config => config,
    // Handle application exception
    error => HandleError.handleApplicationException(error)
  )

  // Response interceptor
  service.interceptors.response.use(
    // Return response
    response => response.data,
    // Handle application exception
    error => HandleError.handleApiRequestException(error)
  )

  // Return service
  return {
    request: async requestConfig => {
      const res = await service.request(requestConfig)
      // Api code 401 and have token
      if (res && res.code && res.code === '401' && store.state.token) {
        // Get new token
        const getNewTokenRes = await service.request({
          url: `${process.env.VUE_APP_BASE_API_2}/user/getNewToken`,
          method: 'post',
          headers: {
            token: store.state.token
          },
          data: {
            refreshToken: store.state.refreshToken
          }
        })
        // Get new token success
        if (getNewTokenRes.success) {
          // Update vuex token
          store.commit('UPDATE_TOKEN', { token: getNewTokenRes.obj.token })
          // To Request
          const reRequestRes = await service.request(requestConfig)
          if (
            reRequestRes &&
            reRequestRes.code &&
            reRequestRes.code === '401' &&
            store.state.token
          ) {
            // Get new token fail redirect to login
            store.commit('USER_LOGIN_OUT')
            // To login
            if (router.currentRoute.fullPath !== '/user/user-login') {
              router.replace('/user/user-login')
            }
          } else {
            return reRequestRes
          }
        } else {
          // Get new token fail redirect to login
          store.commit('USER_LOGIN_OUT')
          // To login
          if (router.currentRoute.fullPath !== '/user/user-login') {
            router.replace('/user/user-login')
          }
        }
      } else {
        // return res
        return res ? res : Promise.reject('内部服务器错误')
      }
    }
  }
}
