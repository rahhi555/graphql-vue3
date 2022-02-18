import { describe, it, expect, vi, MockedObject } from 'vitest'
import { mount } from '@vue/test-utils'
import Post from '../Post.vue'
import * as generated from '../../generated/graphql'
import { nextTick, ref } from 'vue'
import { setupServer } from 'msw/node'
import { handlers } from '../../mocks/handlers'

// vi.mock('generated', () => {
//   return {
//     useAllPostsQuery: vi.fn(() => {
//       return {
//         result: {
//           value: [
//             {
//               id: 'hoge',
//               title: 'hoge',
//               author: 'hoge'
//             }
//           ]
//         }
//       }
//     })  
//   }
// })

// const mockGenerated = generated as MockedObject<typeof generated>

const posts = [
  {
    id: '1',
    title: 'hoge',
    author: 'hoge'
  }
]

const server = setupServer(...handlers)

describe('Post', () => {
  it('renders properly', async () => {
    vi.spyOn(generated, 'useAllPostsQuery').mockResolvedValue({
      result: {
        value: {
          __typename: 'Query',
          posts: [
            {
              id: 'hoge',
              title: 'hoge',
              author: 'hoge',
              __typename: 'Post'
            }
          ]
        }
      },
    })
    // mockGenerated.useAllPostsQuery.mockResolvedValue({
    //   result: {
    //     value: {
    //       posts: [
    //         {
    //           id: 'hoge',
    //           author: 'hoge',
    //           title: 'hoge'
    //         }
    //       ]
    //     }
    //   },
    // })

    // server.listen()
    const wrapper = mount(Post)
    console.log(wrapper.html())
    console.log(wrapper.vm)
    const posts =
      [
        {
          id: 'hoge',
          title: 'hoge',
          author: 'hoge',
          __typename: 'Post'
        }
      ]
    
    wrapper.vm.result = ref({ posts })
    await nextTick()
    console.log(wrapper.html())
    console.log(wrapper.vm)
  
    expect(wrapper.text()).toContain('本棚')
    // server.close()
  })
})
