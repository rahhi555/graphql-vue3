# frozen_string_literal: true

module Types
  class PostType < BaseObject
    field :id, ID, null: false, description: 'ID'
    field :title, String, null: false, description: 'タイトル'
    field :author, String, null: false, description: '著者'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
    field :user, UserType, null: false, description: 'Userの外部キー'
    def user
      dataloader.with(::Sources::UserById).load(object.user_id)
    end
  end
end
