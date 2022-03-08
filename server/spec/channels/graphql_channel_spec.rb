require 'rails_helper'

RSpec.describe GraphqlChannel, type: :channel do
  include RSpec::Rails::RequestExampleGroup

  it 'successfully subscribes' do
    subscribe
    expect(subscription).to be_confirmed
  end
end
