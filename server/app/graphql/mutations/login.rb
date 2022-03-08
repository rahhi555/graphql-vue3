module Mutations
  class Login < BaseMutation
    field :user, Types::UserType, null: false
    field :token, String, null: false

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(email:, password:)
      user = ::User.find_by(email:)
      raise GraphQL::ExecutionError, 'ユーザーが見つかりませんでした' unless user

      is_password_match = BCrypt::Password.new(user.password) == password
      raise GraphQL::ExecutionError, 'パスワードが一致しませんでした' unless is_password_match

      token = JWT.encode user.id, 'supersecret'
      { user:, token: }
    end
  end
end
