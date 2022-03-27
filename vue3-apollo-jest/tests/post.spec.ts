import { mount, shallowMount } from "@vue/test-utils";
import Post from "@/components/posts/Post.vue";
import * as vueApollo from "@vue/apollo-composable"
import * as generated from "@/generated/graphql";
import { ref } from "vue";

jest.mock("@/generated/graphql")
jest.mock("@vue/apollo-composable")

const mockGenerated = generated as jest.Mocked<typeof generated>
const mockVueApollo = vueApollo as jest.Mocked<typeof vueApollo>

beforeEach(() => {
  const result = ref([{ id: '1', title: '羅生門', author: '芥川龍之介' }])
    
  mockGenerated.useAllPostsQuery.mockImplementation((): any => { 
    return { result }
  })

  mockGenerated.useCreatePostMutation.mockImplementation((): any => {
    return { mutate: () => {} }
  })

  mockGenerated.useUpdatePostMutation.mockImplementation((): any => {
    return { mutate: () => {} }
  })

  mockGenerated.useDeletePostMutation.mockImplementation((): any => {
    return { mutate: () => {} }
  })

  mockGenerated.usePostWasPublishedSubscription.mockImplementation((): any => {
    return { result: ref(null) }
  })

  mockVueApollo.useResult.mockImplementation((): any => { 
    return result
  })

  mockVueApollo.useApolloClient.mockImplementation((): any => {
    return { client: null }
  })
})

describe("Post", () => {
  it("投稿ページは全ての投稿が表示されること", () => {
    const wrapper = shallowMount(Post);

    expect(wrapper.text()).toContain("羅生門");
    expect(wrapper.text()).toContain("芥川龍之介");
  });

  it("新規追加をすると投稿が追加されること", async () => {
    const createPost = jest.fn().mockImplementation(() => {
      (wrapper.vm as any).posts.push({ id: '2', title: '金閣寺', author: '三島由紀夫' })
    })

    const wrapper = mount(Post, {
      global: {
        mocks: {
          createPost
        }
      }
    })

    await wrapper.find('#create-post-btn').trigger('click')
    await wrapper.find('[placeholder = "タイトル"]').setValue('金閣寺')
    await wrapper.find('[placeholder = "著者"]').setValue('三島由紀夫')
    await wrapper.find('#create-post-submit-btn').trigger('click')

    expect(wrapper.text()).toContain("羅生門");
    expect(wrapper.text()).toContain("芥川龍之介");
    expect(wrapper.text()).toContain("金閣寺");
    expect(wrapper.text()).toContain("三島由紀夫");
  })

  it("編集をすると投稿が編集後に変化すること", async () => {
    const updatePost = jest.fn().mockImplementation(() => {
      (wrapper.vm as any).posts.splice(0,1, {id: '1', title: '金閣寺', author: '三島由紀夫'})
    })

    const wrapper = mount(Post, {
      global: {
        mocks: {
          updatePost
        }
      }
    })

    await wrapper.find('#update-post-btn').trigger('click')
    await wrapper.find('[placeholder = "タイトル"]').setValue('金閣寺')
    await wrapper.find('[placeholder = "著者"]').setValue('三島由紀夫')
    await wrapper.find('#update-post-submit-btn').trigger('click')

    expect(wrapper.text()).not.toContain("羅生門");
    expect(wrapper.text()).not.toContain("芥川龍之介");
    expect(wrapper.text()).toContain("金閣寺");
    expect(wrapper.text()).toContain("三島由紀夫");
  })

  it('削除をすると投稿が一覧から取り除かれること', async () => {
    const deletePost = jest.fn().mockImplementation(() => {
      (wrapper.vm as any).posts.pop()
    })

    const wrapper = mount(Post, {
      global: {
        mocks: {
          deletePost
        }
      }
    })

    await wrapper.find('#delete-post-btn').trigger('click')
    expect(wrapper.text()).not.toContain("羅生門");
    expect(wrapper.text()).not.toContain("芥川龍之介");
  })
});
