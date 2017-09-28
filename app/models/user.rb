class User < ActiveRecord::Base
  include BCrypt

  has_many :comments, as: :commentable
  has_many :answers
  has_many :questions
  has_many :votes, as: :votable

  validates :username, :email, presence: true, uniqueness: true
  validate :validate_password

  def password
    @password ||= Password.new(encrypted_password)
  end

  def password=(plain_text_password)
    @raw_password = plain_text_password
    @password = Password.create(plain_text_password)
    self.encrypted_password = @password
  end

  def authenticate(plain_text_password)
    self.password == plain_text_password
  end

  def validate_password
    if @raw_password.nil?
      errors.add(:password, "is required")
    elsif @raw_password.length < 6
      errors.add(:password, "must be 6 characters or more")
    end
  end
end
