get '/questions' do
  @questions = Question.all
  erb :'questions/index'
end

get '/questions/new' do
  authenticate!
  erb :'questions/new'
end

post '/questions/new' do
  authenticate!
  @question = Question.create(
      title: params[:title],
      body: params[:body],
      user_id: current_user.id)
  redirect "/"
end

get '/questions/:id' do
  @question = Question.find(params[:id])
  erb :'questions/show'
end

post '/questions/:id/votes' do
  @question = Question.find(params[:id])

  if voted?(@question)
    if request.xhr?
    ep "repeat vote xhr"
      status 422
      body "HEY! NO VOTING TWICE!"
    else
    ep "repeat vote refresh"
      status 422
      redirect "questions/#{@question.id}"
    end
  else
    ep "new vote"
    @vote = Vote.create(
      value: params[:value].to_i,
      user_id: current_user.id,
      votable: @question)
    if request.xhr?
      ep "new vote xhr"
      @question.vote_count.to_s
    else
      ep "new vote refresh"
      redirect "questions/#{@question.id}"
    end
  end

end

post '/questions/:id' do
  p params
  @question = Question.find(params[:id])
  @answer = Answer.find(params[:answer_id])
  @question.best_answer = @answer
  @question.save
  # p @answer
  p @question.best_answer
  "beer"
end



