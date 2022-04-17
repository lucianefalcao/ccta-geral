import { createApp } from 'vue'
import App from './App.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import './index.css'

const updateSW = useRegisterSW({})
createApp(App).mount('#app')
