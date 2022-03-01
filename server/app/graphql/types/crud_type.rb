# frozen_string_literal: true

module Types
  class CrudType < Types::BaseEnum
    description 'subscriptionにおいてデータの作成、更新及び削除を識別するために使用する。'

    value 'CREATED', 'データが作成されたときに指定する'
    value 'UPDATED', 'データが更新されたときに指定する'
    value 'DELETED', 'データが削除されたときに指定する'
  end
end
