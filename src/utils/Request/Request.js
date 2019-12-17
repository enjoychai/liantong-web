/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 22:12:04
 */

import axios from 'axios' // Axios
// import qs from 'qs' // Qs

// import store from '@/store' // Vuex
// import router from '@/router' // Router
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
    request: async requestConfig => await service.request(requestConfig)
  }
}
