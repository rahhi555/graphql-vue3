# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :name, presence: true
  validates :email, presence: true,
                    length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: true }
  validates :password, presence: true

  def create_jwt_token
    JWT.encode({ id: }, 'supersecret')
  end
end
