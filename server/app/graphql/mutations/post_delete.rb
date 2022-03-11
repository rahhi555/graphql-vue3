# frozen_string_literal: true

module Mutations
  class PostDelete < LoginRequireMutation
    description '渡されたidの投稿を削除する'

    field :post, Types::PostType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      post = context[:current_user].posts.find(id)
      raise GraphQL::ExecutionError.new 'Error deleting post', extensions: post.errors.to_hash unless post.destroy

      ServerSchema.subscriptions.trigger('postWasPublished', {}, post.attributes.merge(mutation: 'DELETED'))
      { post: }
    end
  end
end
