
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { createConsumer } from '@rails/actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

const cable = createConsumer('http://localhost:3000/cable')
const actionCableLink = new ActionCableLink({ cable })

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    authorization: 'Bearer' + localStorage.getItem('token')
  }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},
actionCableLink,
httpLink
)

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache
})