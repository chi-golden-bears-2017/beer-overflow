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
