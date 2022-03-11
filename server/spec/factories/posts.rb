FactoryBot.define do
  factory :post do
    sequence(:title, 'title_1')
    sequence(:author, 'author_1')
    association :user
  end
end
