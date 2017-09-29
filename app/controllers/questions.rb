get '/questions' do
  @questions = Question.all
  erb :'questions/index'
end

get '/questions/:id' do
  @question = Question.find(params[:id])
  erb :'questions/show'
end

post '/questions/:id/votes' do
  p params
  @question = Question.find(params[:id])
  if voted?(@question)
    p "HEY! NO VOTING TWICE!"
  else
    @vote = Vote.create(
      value: params[:value].to_i,
      user_id: current_user.id,
      votable: @question)
  end
  if request.xhr?
    p "xhr"
    # TODO JSONify
    @question.vote_count.to_s
  else
    p "page reloading"
    redirect "questions/#{@question.id}"
  end
end




