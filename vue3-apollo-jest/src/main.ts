import { createApp } from 'vue'
import { DefaultApolloClient  } from '@vue/apollo-composable'
import { apolloClient } from './graphql/default-apollo-client'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.use(router)

app.use(createPinia())

app.mount('#app')