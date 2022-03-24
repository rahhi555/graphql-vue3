# frozen_string_literal: true

module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :password, String, null: false
    field :posts, [PostType]
    def posts
      dataloader.with(::Sources::PostsByUserId).load(object.id)
    end
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
