# frozen_string_literal: true

module Mutations
  class PostCreate < BaseMutation
    description '投稿を新規作成'

    field :post, Types::PostType, null: false

    argument :title, String, required: true
    argument :author, String, required: true

    def resolve(title:, author:)
      post = ::Post.new(title:, author:)
      raise GraphQL::ExecutionError.new "Error creating post", extensions: post.errors.to_hash unless post.save

      ServerSchema.subscriptions.trigger('postWasPublished', {}, post.attributes.merge(mutation: 'CREATED'))
      { post: }
    end
  end
end
