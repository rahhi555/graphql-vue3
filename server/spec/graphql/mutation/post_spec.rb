# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Post関連のMutation', type: :request do
  let!(:user) { create(:user) }

  describe 'post_create Mutation' do
    let(:new_post) { build(:post) }
    let(:query) do
      <<~QUERY
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
    end

    it 'ヘッダーにトークンが存在する場合、新たにpostを作成できること' do
      token = user.create_jwt_token
      expect do
        post graphql_path, params: { query: }, headers: { Authorization: "Bearer #{token}" }
      end.to change { Post.count }.by(1)

      post = response.parsed_body['data']['postCreate']['post']
      expect(post['id']).to eq Post.last.id.to_s
      expect(post['title']).to eq new_post.title
      expect(post['author']).to eq new_post.author
    end

    it 'ヘッダーにトークンが存在しない場合、postを作成できないこと' do
      expect { post graphql_path, params: { query: } }.to_not change(Post, :count)

      expect_not_login_message
    end
  end

  describe 'post_update Mutation' do
    let!(:old_post) { create(:post, user:) }
    let(:query) do
      <<~QUERY
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
    end

    it 'トークンが存在する場合、既存のpostを更新できること' do
      token = user.create_jwt_token
      post graphql_path, params: { query: }, headers: { Authorization: "Bearer #{token}" }

      post = JSON.parse(response.body)['data']['postUpdate']['post']
      expect(post['id']).to eq old_post.id.to_s
      expect(post['title']).to eq 'new title'
      expect(post['author']).to eq 'new author'
    end

    it 'トークンが存在しない場合、postを更新できないこと' do
      expect do
        post graphql_path, params: { query: }
      end.not_to change(old_post, :title)

      expect_not_login_message
    end
  end

  describe 'post delete mutation' do
    let!(:old_post) { create(:post, user:) }
    let(:query) do
      <<~QUERY
        mutation {
          postDelete(input: { id: "#{old_post.id}" }) {
            post {
              id
            }
          }
        }
      QUERY
    end

    it 'トークンが存在する場合、投稿を削除できること' do
      token = user.create_jwt_token
      expect do
        post graphql_path, params: { query: }, headers: { Authorization: "Bearer #{token}" }
      end.to change { Post.count }.by(-1)

      return_id = response.parsed_body['data']['postDelete']['post']['id']
      expect(return_id.to_i).to eq old_post.id
    end

    it 'トークンが存在しない場合、投稿を削除できないこと' do
      expect do
        post graphql_path, params: { query: }
      end.to_not change(Post, :count)

      expect_not_login_message
    end
  end
end
