import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient  } from '@vue/apollo-composable'
import { apolloClient } from '@/graphql/default-apollo-client'

import App from './App.vue'
import router from './router'

// const app = createApp(App)
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
// app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
