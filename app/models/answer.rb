class Answer < ActiveRecord::Base
  has_many :votes, as: :votable
  has_many :comments, as: :commentable
  belongs_to :user
  belongs_to :question
  has_one :best_answer

  def vote_count
    votes.sum(:value)
  end
end
