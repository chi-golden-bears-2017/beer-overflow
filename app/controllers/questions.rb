get '/questions' do
  @questions = Question.all
  erb :'questions/index'
end

get '/questions/:id' do
  @question = Question.find(params[:id])
  erb :'questions/show'
end

post '/questions/:id/votes' do
  # p params[:value]
  @question = Question.find(params[:id])
  if voted?(@question)
    p "HEY! NO VOTING TWICE!"
  else
    @vote = Vote.create(
      value: params[:value],
      user_id: current_user.id,
      votable: @question)
    p @vote
      @vote_count = @question.vote_count.to_s
  # erb :'questions/show'
  end
end




