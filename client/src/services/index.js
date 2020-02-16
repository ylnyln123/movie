// 所有API接口的请求都放在这里
import axios from 'axios'
// import { Loading } from 'element-ui'
// import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  headers: {
    showloading: true
  }
})
NProgress.configure({ showSpinner: false })

// 使用elementUI的加载组件以及nprogress的加载进度条组件
request.interceptors.request.use(config => {
  // let loadingInstance = Loading.service()
  // store.dispatch('setLoadingInstance', loadingInstance)
  if (config.headers.showloading) {
    NProgress.start()
    delete config.headers.showloading
  }
  return config
})
request.interceptors.response.use(response => {
  // let loadingInstance = store.state.loadingInstance
  // loadingInstance.close()
  NProgress.done()
  return response
},
function (error) {
  // let loadingInstance = store.state.loadingInstance
  // loadingInstance.close()
  NProgress.done()
  return Promise.reject(error)
})
export default request
