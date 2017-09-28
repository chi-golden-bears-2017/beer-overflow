get '/sessions/new' do
  erb :"session/new"
end

post '/sessions' do
  p request
  @user = User.find_by(username: params[:username])

  if @user && @user.authenticate(params[:password])
    session[:user_id] = @user.id

    p !request.xhr?
    redirect '/' if !request.xhr?

  else
    @message = "Either you username or password was wrong"
    erb :"session/new"
  end

end

delete '/sessions' do
  session.delete(:user_id)
  redirect '/'
end

get '/not_authorized' do
  erb :not_authorized
end
