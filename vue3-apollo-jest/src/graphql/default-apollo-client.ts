
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { createConsumer } from '@rails/actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

const cable = createConsumer('http://localhost:3000/cable')
const actionCableLink = new ActionCableLink({ cable })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  const bearer = token ? `Bearer ${token}` : ''
  return {
    headers: {
      ...headers,
      authorization: bearer
    }    
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},
actionCableLink,
authLink.concat(httpLink)
)

const cache = new InMemoryCache()
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache,
})