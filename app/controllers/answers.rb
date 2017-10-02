post '/answers/:id/votes' do
  @answer = Answer.find(params[:id])
  if voted?(@answer)
    p "HEY! NO VOTING TWICE!"
  else
    @vote = Vote.create(
      value: params[:value],
      user_id: current_user.id,
      votable: @answer)
      @vote_count = @answer.vote_count.to_s
  end
  if request.xhr?
    p "xhr"
    # TODO JSONify
    @answer.vote_count.to_s
  else
    p "page reloading"
    redirect "questions/#{@answer.question.id}"
  end
end

post '/questions/:id/answers/new' do
  ep params

  @question = Question.find(params[:id])
  @answer = Answer.new(body: params[:body], user_id: current_user.id, question_id: @question.id)

  ep @answer

  if @answer.save
    if request.xhr?
      ep "This is going through ajax"
      p "why?"
      erb :"partials/_new_answer", layout: false, locals: {answer: @answer}
    else
      ep "I'm refereshing"
      erb :"questions/show"
    end
  else
    @errors = "Oopsies"
  end

end

get '/answers/:id/edit' do
  @answer = Answer.find(params[:id])
  @user = @answer.user
  authenticate!
  authorize!(@user)
  erb :'answers/edit'
end

post '/answers/:id/edit' do
  @answer = Answer.find(params[:id])
  @user = @answer.user
  authenticate!
  authorize!(@user)
  p params
  @answer.update(body: params[:body])
  p @answer
  redirect "/questions/#{@answer.question.id}"
end