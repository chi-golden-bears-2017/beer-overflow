get '/questions' do
  @questions = Question.all
  erb :'questions/index'
end

get '/questions/new' do
  p "yay"
  erb :'questions/new'
end

post '/questions/new' do
  p params
  "yay!!!!!~~"
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





