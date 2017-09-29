get '/questions' do
  @questions = Question.all
  erb :'questions/index'
end

get '/questions/:id' do
  @question = Question.find(params[:id])
  erb :'questions/show'
end

post '/questions/:id/votes' do
  p params[:value]
  @question = Question.find(params[:id])
  @vote = Vote.new(
    value: params[:value],
    user_id: current_user.id,
    votable: @question)
  p @vote.save
  p @vote

  # erb :'questions/show'
end
