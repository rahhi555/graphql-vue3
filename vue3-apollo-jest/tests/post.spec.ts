import { mount } from "@vue/test-utils";
import Post from "@/components/posts/Post.vue";
import * as vueApollo from "@vue/apollo-composable"
import * as generated from "@/generated/graphql";

jest.mock("@/generated/graphql")
jest.mock("@vue/apollo-composable")

const mockGenerated = generated as jest.Mocked<typeof generated>
const mockVueApollo = vueApollo as jest.Mocked<typeof vueApollo>

describe("Post", () => {
  it("renders properly", async () => {
    const result = [{ id: '1', title: '羅生門', author: '芥川龍之介' }]
    
    mockGenerated.useAllPostsQuery.mockImplementation((): any => { 
      return { result }
    })

    mockVueApollo.useResult.mockImplementation((): any => { 
      return result
    })

    const wrapper = mount(Post);

    expect(wrapper.text()).toContain("羅生門");
    expect(wrapper.text()).toContain("芥川龍之介");
  });
});
