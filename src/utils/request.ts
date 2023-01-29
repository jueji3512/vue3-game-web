import axios, { type Method } from 'axios'

type Data<T> = {
  code: number
  message: string
  data: T
}
const instance = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 10000
})

const request = <T>(url: string, method: Method = 'GET', submitData?: any) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

instance.interceptors.response.use((res) => {
  // if (res.data?.code !== 10000) {
  //   console.log('请求业务出错')
  //   return Promise.reject(res.data)
  // }
  return res
})

export { instance, request }
