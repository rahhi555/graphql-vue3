# frozen_string_literal: true

module Mutations
  class UserCreate < BaseMutation
    description 'ユーザー新規作成'

    field :user, Types::UserType, null: false
    field :token, String, null: false

    argument :name, String, required: true
    argument :email, String
    argument :password, String, required: true

    def resolve(name:, email:, password:)
      hashed_password = BCrypt::Password.create(password, cost: 10)
      user = ::User.new(name:, email:, password: hashed_password)
      raise GraphQL::ExecutionError.new 'ユーザーの新規作成でエラーが発生しました。', extensions: user.errors.to_hash unless user.save

      token = JWT.encode user.id, 'supersecret'
      { user:, token: }
    end
  end
end
