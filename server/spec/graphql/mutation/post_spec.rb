# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Post関連のMutation', type: :request do
  describe 'post_create Mutation' do
    let(:new_post) { build(:post) }

    it '属性が正しい場合、新たにpostを作成できること' do
      query = <<~QUERY
        mutation {
          postCreate(input: {
            title: "#{new_post.title}",
            author: "#{new_post.author}"
          }) {
            post {
              id
              title
              author
            }
          }
        }
      QUERY

      expect {
        post graphql_path, params: { query: }
      }.to change { Post.count }.by(1)

      post = JSON.parse(response.body)['data']['postCreate']['post']
      expect(post['id']).to eq Post.last.id.to_s
      expect(post['title']).to eq new_post.title
      expect(post['author']).to eq new_post.author
    end
  end
end
