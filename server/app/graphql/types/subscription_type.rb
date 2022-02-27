# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :post_was_published, subscription: Subscriptions::PostWasPublished
  end
end
