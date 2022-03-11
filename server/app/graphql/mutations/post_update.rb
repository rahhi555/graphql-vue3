# frozen_string_literal: true

module Mutations
  class PostUpdate < LoginRequireMutation
    description '投稿を更新する'

    field :post, Types::PostType, null: false

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :author, String, required: true

    def resolve(id:, title:, author:)
      post = context[:current_user].posts.find(id)
      raise GraphQL::ExecutionError.new 'Error updating post', extensions: post.errors.to_hash unless post.update(
        title:, author:
      )

      ServerSchema.subscriptions.trigger('postWasPublished', {}, post.attributes.merge(mutation: 'UPDATED'))
      { post: }
    end
  end
end
