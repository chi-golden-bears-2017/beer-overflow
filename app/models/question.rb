class Question < ActiveRecord::Base
  has_many :votes, as: :votable
  has_many :comments, as: :commentable
  belongs_to :user
  has_many :answers
  belongs_to :best_answer, class_name: :Answer

# vote_sum
  def vote_count
    votes.sum(:value)
  end
end
