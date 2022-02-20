import { describe, it, expect, vi, MockedObject } from "vitest";
import { mount } from "@vue/test-utils";
import Post from "../posts/Post.vue";
import * as generated from "../../generated/graphql";

vi.mock("../../generated/graphql");

const mockGenerated = generated as MockedObject<typeof generated>;

describe("Post", () => {
  it("renders properly", () => {
    mockGenerated.useAllPostsQuery.mockImplementation((): any => {
      return {
        result: {
          value: [
            {
              id: "1",
              title: "羅生門",
              author: "芥川龍之介",
            },
            {
              id: "2",
              title: "金閣寺",
              author: "三島由紀夫",
            },
          ],
        },
      };
    });

    const wrapper = mount(Post);

    expect(wrapper.text()).toContain("羅生門");
    expect(wrapper.text()).toContain("芥川龍之介");
  });
});
