# frozen_string_literal: true

module Mutations
  class PostUpdate < BaseMutation
    description '投稿を更新する'

    field :post, Types::PostType, null: false

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :author, String, required: true

    def resolve(id:, title:, author:)
      post = ::Post.find(id)
      raise GraphQL::ExecutionError.new 'Error updating post', extensions: post.errors.to_hash unless post.update(
        title:, author:
      )

      { post: }
    end
  end
end
