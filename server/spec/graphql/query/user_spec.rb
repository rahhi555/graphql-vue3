require 'rails_helper'

RSpec.describe 'User関連のQuery', type: :request do
  describe 'users クエリ' do
    let!(:users) { create_list(:user, 3) }

    it 'クエリが正常なら、全てのuserを返すこと' do
      query = <<~QUERY
        {
          users {
            id
            name
            email
            password
            createdAt
            updatedAt
          }
        }
      QUERY

      post graphql_path, params: { query: }
      json = response.parsed_body
      expect(json['errors']).to be_nil
      expect(json['data']['users'].length).to eq users.length
    end

    it 'クエリが誤っていれば、エラーが返ってくること' do
      query = <<~QUERY
        {
          users {
            hoge
          }
        }
      QUERY

      post graphql_path, params: { query: }
      json = response.parsed_body
      expect(json['errors'][0]['message']).to eq "Field 'hoge' doesn't exist on type 'User'"
    end
  end
end
