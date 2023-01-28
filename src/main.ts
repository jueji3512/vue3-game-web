import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next'

import App from './App.vue'
import router from './router'
// 引入样式库
import 'tdesign-vue-next/es/style/index.css'
import '@/styles/main.scss'

const app = createApp(App)

app.use(TDesign)
app.use(createPinia())
app.use(router)

app.mount('#app')
