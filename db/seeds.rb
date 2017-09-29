# User.destroy_all
# Question.destroy_all
# Comment.destroy_all

# user = User.create!(username: "Beermaker", email: "beer@beer.com", password: "beerisgood")

# question1 = Question.create!(title: "How do you make beer?", user_id: user.id, body: "I would like to make some beer so that I can drink some beer.  How do you do that?")

# comment = Comment.create!(body: "Great question!  I also want to know how to make beer.", user_id: user.id)

# question1.comments << comment
require 'faker'

User.destroy_all
Comment.destroy_all
Question.destroy_all
Answer.destroy_all
# Vote.destroy_all





# temp_votes = {
#   user_id: Faker::Number.between(1, 20)
# }


20.times do

  temp_user = {
    username: Faker::Internet.user_name,
    email: Faker::Internet.safe_email,
    password: "123456"
  }


  temp_question = {
    title: "#{Faker::Beer.name} #{Faker::Beer.style} #{Faker::Beer.malts}",
    body: Faker::Hipster.paragraph,
    user_id: rand(1..20)
  }

  temp_answer = {
    body: "#{Faker::Hipster.paragraph} #{Faker::Coffee.notes}",
    user_id: rand(1..20),
    question_id: rand(1..20)
  }

  User.create!(temp_user)
  Question.create!(temp_question)
  Answer.create!(temp_answer)
end

50.times do
  temp_comment = {
    body: Faker::Hipster.paragraph,
    user_id: rand(1..20),
    commentable: Question.find(rand(1..20))
  }

  question_comment = Comment.new(temp_comment)
  question_comment.save

  answer_comment = Comment.new(temp_comment)
  answer_comment.save
end


