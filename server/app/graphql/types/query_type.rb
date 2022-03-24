module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :posts, [PostType], description: '投稿を全て取得する'
    def posts
      require_authorized
      Post.all
    end

    field :users, [UserType], description: 'ユーザーを全て取得する'
    def users
      require_authorized
      User.all
    end

    private

    def require_authorized
      raise GraphQL::ExecutionError, 'ログインしていません' unless context[:current_user].present?
    end
  end
end
