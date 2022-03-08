require 'rails_helper'

RSpec.describe 'User関連のMutation', type: :request do
  describe 'user_create Mutation' do
    let(:new_user) { build(:user) }

    it '属性が正しい場合、新たにuserを作成できること' do
      query = <<~QUERY
          mutation {
            userCreate(input: {
              name: "#{new_user.name}",
              email: "#{new_user.email}",
              password: "password"
            })
          {
            token,
            user {
              id
              name
              email
              password
            }
          }
        }
      QUERY

      expect do
        post graphql_path, params: { query: }
      end.to change { User.count }.by(1)
      token = response.parsed_body['data']['userCreate']['token']
      user = response.parsed_body['data']['userCreate']['user']
      expect(token).to eq JWT.encode user['id'].to_i, 'supersecret'
      expect(user['name']).to eq new_user.name
      expect(user['email']).to eq new_user.email
      expect(BCrypt::Password.new(user['password']) == 'password').to be true
    end
  end
end
