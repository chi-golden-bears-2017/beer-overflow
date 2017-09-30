post '/answers/:id/votes' do
  # p params[:value]
  @answer = Answer.find(params[:id])
  if voted?(@answer)
    p "HEY! NO VOTING TWICE!"
  else
    @vote = Vote.create(
      value: params[:value],
      user_id: current_user.id,
      votable: @answer)
    p @vote
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
  answer = Answer.new(body: params[:body], user_id: current_user.id, question_id: @question.id)


  if answer.save
    if request.xhr?
      from_params = { username: current_user.username,
                      body: answer.body }
    else
      erb :"questions/show"
    end
  else
    @errors = "Oopsies"
  end

end
