import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { createPahoMqttPlugin } from 'vue-paho-mqtt';

const app = createApp(App)
app.use(router)
app.use(
    createPahoMqttPlugin({
        PluginOptions: {
            autoConnect: true,
            showNotifications: false,
        },
    
        MqttOptions: {
            host: 'kw23.ddns.net',
            port: 9001,
            useSSL: false,
            username: "api",
            password: "matuzalem",
            clientId: `sektor-${Math.random() * 9999}`,
            mainTopic: 'kw23',
        },
    })
)
app.mount('#app')
