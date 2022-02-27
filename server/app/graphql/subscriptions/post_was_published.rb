# frozen_string_literal: true

module Subscriptions
  class PostWasPublished < Subscriptions::BaseSubscription
    field :post, Types::PostType, null: false

    def update
      { post: object }
    end
  end
end
