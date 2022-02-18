require 'rails_helper'

RSpec.describe 'Graphql ServerSchema' do
  let(:current_definition) { ServerSchema.to_definition }
  let(:old_definition) { File.read(Rails.root.join('schema.graphql')) }
  let(:result) { GraphQL::SchemaComparator.compare old_definition, current_definition }

  it '以前のスキーマと現在のスキーマを比較した場合、下位互換性が担保されていること' do
    expect(result.breaking?).to eq false
  end

  it '以前のスキーマと現在のスキーマが同一であること' do
    expect(result.identical?).to eq true
  end
end
