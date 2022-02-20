import { createApp } from 'vue'
import { DefaultApolloClient,  } from '@vue/apollo-composable'
import { apolloClient } from './graphql/default-apollo-client'
import App from './App.vue'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')