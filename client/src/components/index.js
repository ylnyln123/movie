// 全局组件加载注册
import Vue from 'vue'

const requireContext = require.context(
  './global', // 取到这个文件夹下所有内容
  true,
  /\.vue$/
)
Vue.component()
// 循环遍历取到的所有内容
requireContext.keys().forEach(fileName => {
  const componentConfig = requireContext(fileName)
  Vue.component(
    componentConfig.default.name || componentConfig.name,
    componentConfig.default || componentConfig
  )
})
