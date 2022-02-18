require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:post) { build(:post) }

  it '正常な値の場合、postが作成できること' do
    expect(post).to be_valid
    expect { post.save! }.to change(Post, :count).by(1)
  end

  describe 'バリデーションチェック' do
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to(validate_length_of(:title).is_at_most(20)) }
    it { is_expected.to validate_presence_of :author }
  end
end
