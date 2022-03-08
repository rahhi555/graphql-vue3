module Types
  class MutationType < Types::BaseObject
    field :login, mutation: Mutations::Login
    field :user_create, mutation: Mutations::UserCreate
    field :post_delete, mutation: Mutations::PostDelete
    field :post_update, mutation: Mutations::PostUpdate
    field :post_create, mutation: Mutations::PostCreate
  end
end
