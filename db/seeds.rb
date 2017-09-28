User.destroy_all
Question.destroy_all
Comment.destroy_all

user = User.create!(username: "Beermaker", email: "beer@beer.com", password: "beerisgood")

question1 = Question.create!(title: "How do you make beer?", user_id: user.id, body: "I would like to make some beer so that I can drink some beer.  How do you do that?")

comment = Comment.create!(body: "Great question!  I also want to know how to make beer.", user_id: user.id)

question1.comments << comment
