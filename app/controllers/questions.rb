get '/questions' do
  @questions = Question.all
  erb :'questions/show'
end
