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

      expect do
        post graphql_path, params: { query: }
      end.to change { Post.count }.by(1)

      post = JSON.parse(response.body)['data']['postCreate']['post']
      expect(post['id']).to eq Post.last.id.to_s
      expect(post['title']).to eq new_post.title
      expect(post['author']).to eq new_post.author
    end
  end

  describe 'post_update Mutation' do
    let!(:old_post) { create(:post) }

    it '属性が正しい場合、既存のpostを更新できること' do
      query = <<~QUERY
        mutation {
          postUpdate(input: {
            id: "#{old_post.id}",
            title: "new title",
            author: "new author"
          }) {
            post {
              id
              title
              author
            }
          }
        }
      QUERY

      post graphql_path, params: { query: }

      post = JSON.parse(response.body)['data']['postUpdate']['post']
      expect(post['id']).to eq old_post.id.to_s
      expect(post['title']).to eq 'new title'
      expect(post['author']).to eq 'new author'
    end
  end

  describe 'post delete mutation' do
    let!(:old_post) { create(:post) }

    it '属性値が正しい場合、投稿を削除できること' do
      query = <<~QUERY
        mutation {
          postDelete(input: { id: "#{old_post.id}" }) {
            post {
              id
            }
          }
        }
      QUERY

      expect do
        post graphql_path, params: { query: }
      end.to change { Post.count }.from(1).to(0)

      return_id = JSON.parse(response.body)['data']['postDelete']['post']['id']
      expect(return_id.to_i).to eq old_post.id
    end
  end
end
