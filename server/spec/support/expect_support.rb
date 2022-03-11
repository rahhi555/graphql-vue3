module ExpectSupport
  def expect_not_login_message
    expect(response.parsed_body['errors'][0]['message']).to eq 'ログインしていません'
  end
end
