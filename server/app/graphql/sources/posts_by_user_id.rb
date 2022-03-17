module Sources
  class PostsByUserId < GraphQL::Dataloader::Source
    def initialize
      @model_class = ::Post
    end

    def fetch(ids)
      records = @model_class.where(user_id: ids)
                            .group_by { |record| record.user_id }
      ids.map { |id| records[id] || [] }
    end
  end
end
