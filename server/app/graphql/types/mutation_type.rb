module Types
  class MutationType < Types::BaseObject
    field :post_update, mutation: Mutations::PostUpdate
    field :post_create, mutation: Mutations::PostCreate
  end
end
