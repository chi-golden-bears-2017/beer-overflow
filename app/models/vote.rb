class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :votable, polymorphic: true
  validates :value, numericality: {greater_than: -2, less_than: 2}
end
