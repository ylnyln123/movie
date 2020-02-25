// 所有API接口的请求都放在这里
import axios from 'axios'
// import { Loading } from 'element-ui'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: '/api',
  headers: {
    showloading: true
    // Authorization: `Bearer ${store.state.token}`
  }
})
NProgress.configure({ showSpinner: false })

request.interceptors.request.use(config => {
  if (config.headers.showloading) {
    NProgress.start()
    delete config.headers.showloading
  }
  config.headers.Authorization = `Bearer ${store.state.token}`
  return config
})
request.interceptors.response.use(response => {
  NProgress.done()
  return response
},
function (error) {
  NProgress.done()
  return Promise.reject(error)
})
export default request
