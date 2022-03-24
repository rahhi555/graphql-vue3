module Mutations
  class LoginRequireBaseMutation < BaseMutation
    # 使用しなくても1つの仮引数が必要(中にはクエリ実行時の実引数が格納される)
    def authorized?(_)
      raise GraphQL::ExecutionError, 'ログインしていません' unless context[:current_user].present?

      true
    end
  end
end
