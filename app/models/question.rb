class Question < ActiveRecord::Base
  has_many :votes, as: :votable
  has_many :comments, as: :commentable
  has_many :answers
  belongs_to :user
  has_one :best_answer, class_name: :Answer

end
