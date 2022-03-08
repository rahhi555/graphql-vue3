require 'rails_helper'

RSpec.describe 'Post関連のQuery', type: :request do
  describe 'posts クエリ' do
    let!(:posts) { create_list(:post, 3) }

    it 'クエリが正常なら、全てのpostを返すこと' do
      query = <<~QUERY
        {
          posts {
            id
            title
            author
            createdAt
            updatedAt
          }
        }
      QUERY

      post graphql_path, params: { query: }

      json = JSON.parse(response.body)
      expect(json['errors']).to be_nil
      expect(json['data']['posts'].length).to eq posts.length
    end

    it 'クエリが誤っていれば、エラーが返ってくること' do
      query = <<~QUERY
        {
          posts {
            hoge
          }
        }
      QUERY

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      expect(json['errors'][0]['message']).to eq "Field 'hoge' doesn't exist on type 'Post'"
    end
  end
end
