import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NLayout
} from 'naive-ui'
import router from './router'

const naive = create({
  components: [NConfigProvider, NLayout]
})
const app = createApp(App)
app.use(router)
app.use(naive)

router.isReady().then(() => {
  app.mount('#app')
})
