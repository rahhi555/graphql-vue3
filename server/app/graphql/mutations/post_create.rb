# frozen_string_literal: true

module Mutations
  class PostCreate < BaseMutation
    description '投稿を新規作成'

    field :post, Types::PostType, null: false

    argument :title, String, required: true
    argument :author, String, required: true

    # 使用しなくても1つの仮引数が必要(中にはクエリ実行時の実引数が格納される)
    def authorized?(_)
      raise GraphQL::ExecutionError, 'ログインしていません' unless context[:current_user].present?

      true
    end

    def resolve(title:, author:)
      post = context[:current_user].posts.build(title:, author:)
      raise GraphQL::ExecutionError.new 'Error creating post', extensions: post.errors.to_hash unless post.save

      ServerSchema.subscriptions.trigger('postWasPublished', {}, post.attributes.merge(mutation: 'CREATED'))
      { post: }
    end
  end
end
