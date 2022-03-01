# frozen_string_literal: true

module Subscriptions
  class PostWasPublished < Subscriptions::BaseSubscription
    field :post, Types::PostType, null: false
    field :mutation, Types::CrudType, null: false

    def update
      { post: object, mutation: object[:mutation] }
    end
  end
end
