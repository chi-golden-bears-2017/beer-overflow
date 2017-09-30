get '/comments/show' do
  @comments = Comment.all

  if request.xhr?
    erb :"partials/_add_comment"
  else
    redirect "/questions/show"
  end
end

post '/questions/:id/comments/new' do
  @question = Question.find(params[:id])
   comment = Comment.new(body: params[:body], user_id: current_user.id, commentable: @question)

  if comment.save
    if request.xhr?
      content_type :json
      {body: comment.body, username: current_user.username}.to_json
    else
      erb :"questions/show"
    end
  else
    @error = "Something went wrong"
  end
end

post '/answers/:id/comments/new' do
  @answer = Answer.find(params[:id])
   comment = Comment.new(body: params[:body], user_id: current_user.id, commentable: @answer)

  if comment.save
    if request.xhr?
      content_type :json
      {body: comment.body, username: current_user.username}.to_json
    else
      erb :"questions/show"
    end
  else
    @error = "Something went wrong"
  end
end

