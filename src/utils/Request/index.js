/**
 * @name Export request object
 * @author SunSeekerX
 * @time 2019-12-06 10:15:04
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 13:50:04
 */

import createRequest from './Request'

// Export default axios
export default createRequest()

const axiosOther = createRequest({
  baseURL: ''
})

export { axiosOther }
