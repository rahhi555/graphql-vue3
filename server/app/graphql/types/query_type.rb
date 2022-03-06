module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :posts, [PostType], description: '投稿を全て取得する'
    def posts = Post.all

    field :users, [UserType], description: 'ユーザーを全て取得する'
    def users = User.all
  end
end
