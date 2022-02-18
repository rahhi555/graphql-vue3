# This file is used by Rack-based servers to start the application.

require_relative "config/environment"
require 'graphql_playground'

if Rails.env.development?
  map '/playground' do
    use GraphQLPlayground, endpoint: '/graphql'
  end
end

run Rails.application
Rails.application.load_server
