import { graphql } from 'msw'

export const handlers = [
  graphql.query('useAllPostsQuery', (_, res, ctx) => {
    return res(ctx.data({ posts: { id: 'hoge', title: 'hoge', author: 'hoge' } }))
  })
]