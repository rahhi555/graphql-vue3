# frozen_string_literal: true

module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false, description: 'ID'
    field :title, String, null: false, description: 'タイトル'
    field :author, String, null: false, description: '著者'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
    field :user_id, Integer, null: false, description: 'Userの外部キー'
  end
end
