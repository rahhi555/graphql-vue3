import { mount } from '@vue/test-utils'
import LoginView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../src/stores/user'
import * as generated from '@/generated/graphql'

jest.mock("@/generated/graphql")
const mockGenerated = generated as jest.Mocked<typeof generated>

beforeEach(() => {
  mockGenerated.useLoginMutation((): any => {
    useUserStore().login({
      __typename: "Mutation",
      login: {
        token: "hoge",
        user: {
          email: "test1@example.com",
          id: "1",
          name: "test user",
          __typename: "User"
        }
      }
    })

    return {
      mutate: "hoge",
      error: "hoge"
    }
  })
})

describe("Loginコンポーネント", () => {
  it("ログインボタンをクリックすると、ユーザー情報がPiniaに格納される", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    const store = useUserStore()

    await wrapper.get('#login-btn').trigger('click')

    expect(store.hasCurrentUser).toBeTruthy()
  })
})